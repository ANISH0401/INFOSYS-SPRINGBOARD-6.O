-- Create enum types
CREATE TYPE public.user_role AS ENUM ('STUDENT', 'INSTRUCTOR', 'ADMIN');
CREATE TYPE public.difficulty_level AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  name VARCHAR(100),
  email VARCHAR(100),
  role user_role DEFAULT 'STUDENT',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  instructor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  difficulty_level difficulty_level DEFAULT 'BEGINNER',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quizzes table
CREATE TABLE public.quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  generated_by_ai BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questions table
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB,
  correct_answer VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_attempts table
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  score DECIMAL(5,2),
  attempt_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS user_role
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for courses
CREATE POLICY "Anyone can view courses" ON public.courses
  FOR SELECT USING (true);

CREATE POLICY "Instructors can create courses" ON public.courses
  FOR INSERT WITH CHECK (get_user_role(auth.uid()) IN ('INSTRUCTOR', 'ADMIN'));

CREATE POLICY "Instructors can update their own courses" ON public.courses
  FOR UPDATE USING (instructor_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- RLS Policies for quizzes
CREATE POLICY "Anyone can view quizzes" ON public.quizzes
  FOR SELECT USING (true);

CREATE POLICY "Course instructors can create quizzes" ON public.quizzes
  FOR INSERT WITH CHECK (course_id IN (SELECT id FROM public.courses WHERE instructor_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())));

-- RLS Policies for questions
CREATE POLICY "Anyone can view questions" ON public.questions
  FOR SELECT USING (true);

CREATE POLICY "Quiz owners can create questions" ON public.questions
  FOR INSERT WITH CHECK (quiz_id IN (SELECT q.id FROM public.quizzes q JOIN public.courses c ON q.course_id = c.id WHERE c.instructor_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())));

-- RLS Policies for quiz_attempts
CREATE POLICY "Students can view their own attempts" ON public.quiz_attempts
  FOR SELECT USING (student_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Students can create their own attempts" ON public.quiz_attempts
  FOR INSERT WITH CHECK (student_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Instructors can view attempts for their courses" ON public.quiz_attempts
  FOR SELECT USING (quiz_id IN (SELECT q.id FROM public.quizzes q JOIN public.courses c ON q.course_id = c.id WHERE c.instructor_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())));

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_quizzes_updated_at
  BEFORE UPDATE ON public.quizzes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_quiz_attempts_updated_at
  BEFORE UPDATE ON public.quiz_attempts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();