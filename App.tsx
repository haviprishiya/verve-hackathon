import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Assessment from './components/Assessment';
import MockInterview from './components/MockInterview';
import StudyResources from './components/StudyResources';
import ProgressTracker from './components/ProgressTracker';
import AIBot from './components/AIBot';

type CurrentView = 'home' | 'assessment' | 'dashboard' | 'mock-interview' | 'resources' | 'progress' | 'ai-bot';

interface UserProfile {
  name: string;
  targetRole: string;
  experience: string;
  skills: Record<string, number>;
  completedAssessment: boolean;
  learningPath: any[];
  interviewsCompleted: number;
  weakAreas: string[];
  progress: number;
}

function App() {
  const [currentView, setCurrentView] = useState<CurrentView>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleAssessmentComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView('dashboard');
  };

  const handleNavigation = (view: CurrentView) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'assessment':
        return <Assessment onComplete={handleAssessmentComplete} />;
      case 'dashboard':
        return userProfile ? (
          <Dashboard 
            userProfile={userProfile} 
            onNavigate={handleNavigation}
          />
        ) : null;
      case 'mock-interview':
        return userProfile ? (
          <MockInterview 
            userProfile={userProfile}
            onNavigate={handleNavigation}
          />
        ) : null;
      case 'resources':
        return userProfile ? (
          <StudyResources 
            userProfile={userProfile}
            onNavigate={handleNavigation}
          />
        ) : null;
      case 'progress':
        return userProfile ? (
          <ProgressTracker 
            userProfile={userProfile}
            onNavigate={handleNavigation}
          />
        ) : null;
      case 'ai-bot':
        return userProfile ? (
          <AIBot 
            userProfile={userProfile}
            onNavigate={handleNavigation}
          />
        ) : null;
      default:
        return <Hero onStartAssessment={handleStartAssessment} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigation}
        hasUserProfile={!!userProfile}
      />
      <main className="pt-16">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;