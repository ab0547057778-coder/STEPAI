import { LeaderboardEntry } from '../types';

export const generateLeaderboard = (): LeaderboardEntry[] => {
  const names = [
    'Abdullah',
    'Emma Wilson',
    'James Chen',
    'Sofia Garcia',
    'Liam Johnson',
    'Olivia Brown',
    'Noah Martinez',
    'Ava Davis',
    'William Taylor',
    'Isabella Anderson'
  ];

  return names.map((name, index) => ({
    uid: 'user_' + index,
    name,
    xp: Math.floor(10000 - (index * 800) + Math.random() * 500),
    level: Math.floor(15 - (index * 1.2) + Math.random() * 3),
    streak: Math.floor(30 - (index * 2) + Math.random() * 5),
    rank: index + 1,
  })).sort((a, b) => b.xp - a.xp);
};