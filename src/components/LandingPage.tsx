import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, TrendingUp, Users } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div
  className="min-h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('/bg2.jpeg')" }}
>

      {/* Header */}
      <header className="px-6 py-4 bg-[#233662] text-white shadow-md">

        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SF</span>
            </div>
            <span className="text-xl font-bold text-white">
  SkillForge
</span>

          </div>
          <Button onClick={onGetStarted}>Get Started</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Master Skills, Track Progress
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            SkillForge helps you develop, track, and showcase your skills with comprehensive analytics and personalized learning paths.
          </p>
          <Button size="lg" onClick={onGetStarted} className="mr-4">
            Start Your Journey
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SkillForge?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 bg-[#edf1ff] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle color="blue">Skill Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor your progress across multiple skills with detailed analytics and visual insights.
                </CardDescription>
              </CardContent>
            </Card>

           <Card className="text-center p-6 bg-[#edf1ff] hover:shadow-lg transition-shadow">

              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Learning Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Personalized learning journeys tailored to your goals and current skill level.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-[#edf1ff] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Progress Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive dashboards showing your skill development over time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-[#edf1ff] hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with peers, share achievements, and learn from the community.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Skill Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of learners who are already mastering new skills with SkillForge.
          </p>
          <Button size="lg" onClick={onGetStarted} className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-[#233662] text-white">

        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 SkillForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;