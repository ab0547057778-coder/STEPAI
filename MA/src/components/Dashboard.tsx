import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  BookOpen, 
  Volume2, 
  FileText, 
  ChevronRight, 
  Zap, 
  Flame, 
  Target,
  TrendingUp
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userDoc, startQuiz, leaderboard } = useApp();

  if (!userDoc) return null;

  const userRank = leaderboard.findIndex(u => u.uid === userDoc.uid) + 1 || '-';

  const sections = [
    {
      id: 'grammar' as const,
      title: 'Grammar',
      description: 'Master English grammar rules',
      icon: BookOpen,
      gradient: 'from-violet-500 to-purple-600',
      shadow: 'shadow-violet-500/25'
    },
    {
      id: 'reading' as const,
      title: 'Reading',
      description: 'Improve comprehension skills',
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-500/25'
    },
    {
      id: 'listening' as const,
      title: 'Listening',
      description: 'Train your listening skills',
      icon: Volume2,
      gradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/25'
    }
  ];

  const stats = [
    { label: 'Total XP', value: userDoc.xp, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Level', value: userDoc.level, icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-400/10' },
    { label: 'Streak', value: `${userDoc.streak} days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Rank', value: `#${userRank}`, icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-400/10' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-400">{userDoc.name}</span>! 👋
        </h1>
        <p className="text-slate-400 text-lg">Continue your journey to English mastery.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Practice Sections */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">Practice Sections</h2>
        <p className="text-slate-400 text-sm">Choose a skill to practice</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card 
              key={section.id} 
              className="bg-slate-900 border-slate-800 hover:border-slate-700 hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden"
              onClick={() => startQuiz(section.id)}
            >
              <CardHeader className="pb-3">
                <div className={`w-14 h-14 bg-gradient-to-br ${section.gradient} rounded-2xl flex items-center justify-center shadow-lg ${section.shadow} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl text-white group-hover:text-violet-400 transition-colors">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">5 questions</span>
                  <Button 
                    size="sm"
                    className="bg-slate-800 hover:bg-violet-500 text-white group-hover:bg-violet-500 transition-colors"
                  >
                    Start
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;