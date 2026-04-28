import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Home, Trophy, User, LogOut, Zap, Flame } from 'lucide-react';

const Header: React.FC = () => {
  const { userDoc, currentSection, goToSection, logout } = useApp();

  if (!userDoc) return null;

  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'leaderboard' as const, icon: Trophy, label: 'Leaderboard' },
    { id: 'profile' as const, icon: User, label: 'Profile' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">STEP AI</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => goToSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-violet-500/20 text-violet-400' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="flex items-center gap-4">
            {/* Stats */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-white">{userDoc.xp} XP</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-white">{userDoc.streak}</span>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 border-2 border-violet-500/50">
                <AvatarImage src={userDoc.photoURL} />
                <AvatarFallback className="bg-violet-500/20 text-violet-400 text-sm font-medium">
                  {userDoc.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={logout}
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-1 ${
                  isActive ? 'text-violet-400' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;