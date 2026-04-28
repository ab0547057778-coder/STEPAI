import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Trophy, Crown, Flame } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { leaderboard, userDoc } = useApp();

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return { 
          bg: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20', 
          border: 'border-amber-500/50',
          text: 'text-amber-400'
        };
      case 2:
        return { 
          bg: 'bg-gradient-to-r from-slate-400/20 to-gray-400/20', 
          border: 'border-slate-400/50',
          text: 'text-slate-300'
        };
      case 3:
        return { 
          bg: 'bg-gradient-to-r from-orange-600/20 to-amber-700/20', 
          border: 'border-orange-600/50',
          text: 'text-orange-400'
        };
      default:
        return { 
          bg: 'bg-slate-800/50', 
          border: 'border-slate-700',
          text: 'text-slate-400'
        };
    }
  };

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3, 20);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-slate-400">Top performers this week</p>
      </div>

      {/* Top 3 Podium */}
      {topThree.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Second Place */}
          {topThree[1] && (
            <div className="pt-8">
              <Card className={`${getRankStyle(2).bg} ${getRankStyle(2).border} border text-center`}>
                <CardContent className="pt-6 pb-4">
                  <div className="relative inline-block mb-3">
                    <Avatar className="w-16 h-16 border-4 border-slate-400/50">
                      <AvatarImage src={topThree[1].photoURL} />
                      <AvatarFallback className="bg-slate-700 text-white text-lg">
                        {topThree[1].name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-400 rounded-full flex items-center justify-center text-xs font-bold text-slate-900">
                      2
                    </div>
                  </div>
                  <p className="text-white font-medium truncate">{topThree[1].name}</p>
                  <p className="text-slate-400 text-sm">{topThree[1]. xp} XP</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* First Place */}
          {topThree[0] && (
            <div>
              <Card className={`${getRankStyle(1).bg} ${getRankStyle(1).border} border text-center`}>
                <CardContent className="pt-6 pb-4">
                  <Crown className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <div className="relative inline-block mb-3">
                    <Avatar className="w-20 h-20 border-4 border-amber-400/50">
                      <AvatarImage src={topThree[0].photoURL} />
                      <AvatarFallback className="bg-amber-500/20 text-amber-400 text-xl">
                        {topThree[0].name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center text-sm font-bold text-slate-900">
                      1
                    </div>
                  </div>
                  <p className="text-white font-semibold truncate">{topThree[0].name}</p>
                  <p className="text-amber-400 font-medium">{topThree[0]. xp} XP</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Third Place */}
          {topThree[2] && (
            <div className="pt-12">
              <Card className={`${getRankStyle(3).bg} ${getRankStyle(3).border} border text-center`}>
                <CardContent className="pt-6 pb-4">
                  <div className="relative inline-block mb-3">
                    <Avatar className="w-14 h-14 border-4 border-orange-600/50">
                      <AvatarImage src={topThree[2].photoURL} />
                      <AvatarFallback className="bg-orange-500/20 text-orange-400">
                        {topThree[2].name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      3
                    </div>
                  </div>
                  <p className="text-white font-medium truncate">{topThree[2].name}</p>
                  <p className="text-slate-400 text-sm">{topThree[2]. xp} XP</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Rest of Leaderboard */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          {rest.length === 0 && topThree.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No users on the leaderboard yet.</p>
              <p className="text-sm mt-2">Be the first to practice and earn XP!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {rest.map((user, index) => {
                const rank = index + 4;
                const isCurrentUser = userDoc?.uid === user.uid;
                
                return (
                  <div 
                    key={user.uid}
                    className={`flex items-center gap-4 p-4 ${isCurrentUser ? 'bg-violet-500/10' : ''}`}
                  >
                    <span className="w-8 text-center text-slate-500 font-medium">{rank}</span>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback className="bg-slate-700 text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {user.name}
                        {isCurrentUser && <span className="ml-2 text-xs text-violet-400">(You)</span>}
                      </p>
                      <p className="text-slate-400 text-sm">Level {user.level}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Trophy className="w-4 h-4" />
                        <span className="font-medium">{user.xp}</span>
                      </div>
                      <div className="flex items-center gap-1 text-orange-500">
                        <Flame className="w-4 h-4" />
                        <span className="font-medium">{user.streak}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;