import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Users } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: 'student' | 'instructor' | 'admin') => void;
  onBack: () => void;
}

const RoleSelection = ({ onRoleSelect, onBack }: RoleSelectionProps) => {
  const roles = [
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Track your learning progress, access courses, and monitor skill development.',
      icon: GraduationCap,
      features: ['Personal Dashboard', 'Skill Tracking', 'Progress Analytics', 'Course Access'],
      gradient: 'from-primary to-primary/80'
    },
    {
      id: 'instructor' as const,
      title: 'Instructor',
      description: 'Create courses, manage students, and track teaching effectiveness.',
      icon: BookOpen,
      features: ['Course Creation', 'Student Management', 'Teaching Analytics', 'Content Library'],
      gradient: 'from-secondary to-secondary/80'
    },
    {
      id: 'admin' as const,
      title: 'Administrator',
      description: 'Manage the platform, oversee all users, and access comprehensive analytics.',
      icon: Users,
      features: ['User Management', 'Platform Analytics', 'System Configuration', 'Reports'],
      gradient: 'from-accent to-accent/80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ← Back to Home
          </Button>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Choose Your Role
          </h1>
          <p className="text-xl text-muted-foreground">
            Select the role that best describes your journey with SkillForge
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id} 
                className="relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => onRoleSelect(role.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${role.gradient} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full bg-gradient-to-r ${role.gradient} hover:opacity-90 text-white`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRoleSelect(role.id);
                    }}
                  >
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;