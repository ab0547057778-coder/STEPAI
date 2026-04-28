import { UserDoc } from '../types';

export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

export const generateLeaderboard = (): UserDoc[] => {
  const names = ['Ahmed', 'Sara', 'Mohammed', 'Fatima', 'Omar', 'Layla', 'Khalid', 'Noura', 'Hassan', 'Aisha'];
  
  return names.map((name, index) => ({
    id: `user-${index + 1}`,
    name,
    email: `${name.toLowerCase()}@example.com`,
    xp: Math.floor(Math.random() * 1000) + 100,
    level: Math.floor(Math.random() * 10) + 1,
    streak: Math.floor(Math.random() * 30),
    createdAt: new Date()
  })).sort((a, b) => b.xp - a.xp);
};