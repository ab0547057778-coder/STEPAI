import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Zap, Flame, TrendingUp, Calendar, Mail, Award, Edit2 } from 'lucide-react';

const Profile: React.FC = () => {
  const { userDoc, leaderboard } = useApp();

  if (!userDoc) return null;

  const userRank = leaderboard.findIndex(u => u.uid === userDoc.uid) + 1 || '-';

  const stats = [
    { label: 'Total XP', value: userDoc.xp, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Current Level', value: userDoc.level, icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-400/10' },
    { label: 'Day Streak', value: `${userDoc.streak} days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Global Rank', value: `#${userRank}`, icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-400/10' }
  ];

  const achievements = [
    { id: 1, name: 'First Steps', desc: 'Complete your first lesson', unlocked: userDoc.xp >= 25, icon: '🎯' },
    { id: 2, name: 'Grammar Guru', desc: 'Score 100% in Grammar', unlocked: false, icon: '📚' },
    { id: 3, name: 'On Fire', desc: '7 day streak', unlocked: userDoc.streak >= 7, icon: '🔥' },
    { id: 4, name: 'Rising Star', desc: 'Reach Level 5', unlocked: userDoc.level >= 5, icon: '⭐' },
    { id: 5, name: 'Top 10', desc: 'Enter top 10 leaderboard', unlocked: userRank <= 10 && userRank > 0, icon: '🏆' },
    { id: 6, name: 'Century', desc: 'Earn 1000 XP', unlocked: userDoc.xp >= 1000, icon: '💎' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card className="bg-slate-900 border-slate-800 mb-8 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-violet-600 to-purple-600" />
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
            <Avatar className="w-24 h-24 border-4 border-slate-900">
              <AvatarImage src={userDoc.photoURL} />
              <AvatarFallback className="bg-violet-500 text-white text-3xl font-bold">
                {userDoc.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-white">{userDoc.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400 mt-1">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{userDoc.email}</span>
              </div>
            </div>
            <Button variant="outline" className="border-slate-700 text-slate-300">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievements */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-violet-400" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  achievement.unlocked 
                    ? 'bg-violet-500/10 border-violet-500/30' 
                    : 'bg-slate-800/50 border-slate-700 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h3 className="text-white font-medium">{achievement.name}</h3>
                <p className="text-slate-400 text-sm">{achievement.desc}</p>
                {achievement.unlocked && (
                  <span className="inline-block mt-2 text-xs text-violet-400 bg-violet-500/20 px-2 py-1 rounded">
                    Unlocked
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Member Since */}
      <div className="mt-6 text-center">
        <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          Member since {new Date(userDoc.createdAt).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
};

export default Profile;