export interface UserDoc {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  xp: number;
  level: number;
  streak: number;
  lastActive: string;
  createdAt: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  section: 'grammar' | 'reading' | 'listening';
  level: number;
  explanation?: string;
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  score: number;
  answered: boolean;
  selectedAnswer: number | null;
  correct: boolean | null;
  section: 'grammar' | 'reading' | 'listening';
}

export interface LeaderboardUser {
  uid: string;
  name: string;
  photoURL?: string;
  xp: number;
  level: number;
  streak: number;
}