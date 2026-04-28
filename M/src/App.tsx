import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';

const AppContent: React.FC = () => {
  const { user, loading, currentSection } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-slate-400">Loading STEP AI...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        {currentSection === 'home' && <Dashboard />}
        {currentSection === 'quiz' && <Quiz />}
        {currentSection === 'leaderboard' && <Leaderboard />}
        {currentSection === 'profile' && <Profile />}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © 2024 STEP AI. Developed by{' '}
            <span className="text-violet-400 font-medium">Abdullah</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;