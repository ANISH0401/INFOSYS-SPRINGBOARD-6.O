import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, TrendingUp, Clock, Award, Calendar } from "lucide-react";

interface StudentDashboardProps {
  onLogout: () => void;
}

const StudentDashboard = ({ onLogout }: StudentDashboardProps) => {
  const skills = [
    { name: 'JavaScript', progress: 75, level: 'Intermediate' },
    { name: 'React', progress: 60, level: 'Beginner' },
    { name: 'Python', progress: 85, level: 'Advanced' },
    { name: 'Data Analysis', progress: 40, level: 'Beginner' }
  ];

  const recentActivities = [
    { course: 'Advanced React Patterns', time: '2 hours ago', type: 'completed' },
    { course: 'JavaScript ES6+', time: '1 day ago', type: 'started' },
    { course: 'Python for Data Science', time: '3 days ago', type: 'completed' }
  ];

  const achievements = [
    { title: 'JavaScript Master', description: 'Completed 10 JS courses', icon: Award },
    { title: 'Quick Learner', description: 'Finished course in 3 days', icon: Clock },
    { title: 'Consistent', description: '7-day learning streak', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border bg-card">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Student Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, John!</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>Logout</Button>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skills Mastered</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">Overall completion</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Progress</CardTitle>
                <CardDescription>Your current skill levels and progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="secondary">{skill.level}</Badge>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">{skill.progress}% complete</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium">{activity.course}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant={activity.type === 'completed' ? 'default' : 'secondary'}>
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Celebrate your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;