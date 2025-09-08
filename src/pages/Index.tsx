import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import RoleSelection from "@/components/RoleSelection";
import AuthForm from "@/components/AuthForm";
import StudentDashboard from "@/components/dashboards/StudentDashboard";

type AppState = 'landing' | 'role-selection' | 'auth' | 'dashboard';
type UserRole = 'student' | 'instructor' | 'admin';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleGetStarted = () => {
    setCurrentState('role-selection');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentState('auth');
  };

  const handleAuthSuccess = (role: UserRole) => {
    setUserRole(role);
    setCurrentState('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setSelectedRole(null);
    setCurrentState('landing');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
  };

  const handleBackToRoleSelection = () => {
    setCurrentState('role-selection');
  };

  if (currentState === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentState === 'role-selection') {
    return (
      <RoleSelection 
        onRoleSelect={handleRoleSelect} 
        onBack={handleBackToLanding}
      />
    );
  }

  if (currentState === 'auth' && selectedRole) {
    return (
      <AuthForm 
        role={selectedRole}
        onBack={handleBackToRoleSelection}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  if (currentState === 'dashboard' && userRole) {
    // For now, only show student dashboard
    if (userRole === 'student') {
      return <StudentDashboard onLogout={handleLogout} />;
    }
    
    // Placeholder for other roles
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard</h1>
          <p className="text-muted-foreground mb-4">Dashboard coming soon...</p>
          <button onClick={handleLogout} className="text-primary hover:underline">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;
