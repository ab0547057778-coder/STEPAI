import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  increment,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { UserDoc, Question, QuizState, LeaderboardUser } from '../types';

interface AppContextType {
  user: FirebaseUser | null;
  userDoc: UserDoc | null;
  loading: boolean;
  questions: Question[];
  currentSection: 'home' | 'quiz' | 'leaderboard' | 'profile';
  currentQuiz: QuizState | null;
  leaderboard: LeaderboardUser[];
  login: () => Promise<void>;
  logout: () => Promise<void>;
  startQuiz: (section: 'grammar' | 'reading' | 'listening') => Promise<void>;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  goToSection: (section: 'home' | 'quiz' | 'leaderboard' | 'profile') => void;
  refreshLeaderboard: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentSection, setCurrentSection] = useState<'home' | 'quiz' | 'leaderboard' | 'profile'>('home');
  const [currentQuiz, setCurrentQuiz] = useState<QuizState | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchOrCreateUserDoc(firebaseUser);
        await fetchQuestions();
        await refreshLeaderboard();
      } else {
        setUserDoc(null);
        setQuestions([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchOrCreateUserDoc = async (firebaseUser: FirebaseUser) => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserDoc(userSnap.data() as UserDoc);
      } else {
        const newUser: UserDoc = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'Learner',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL || '',
          xp: 0,
          level: 1,
          streak: 1,
          lastActive: new Date().toISOString(),
          createdAt: new Date().toISOString()
        };
        await setDoc(userRef, newUser);
        setUserDoc(newUser);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const q = query(collection(db, 'questions'));
      const snapshot = await getDocs(q);
      const questionsData: Question[] = [];
      snapshot.forEach((docSnap) => {
        questionsData.push({ id: docSnap.id, ...docSnap.data() } as Question);
      });
      setQuestions(questionsData);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    }
  };

  const refreshLeaderboard = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('xp', 'desc'),
        limit(50)
      );
      const snapshot = await getDocs(q);
      const data: LeaderboardUser[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        data.push({
          uid: docSnap.id,
          name: d.name || 'Anonymous',
          photoURL: d.photoURL || '',
          xp: d.xp || 0,
          level: d.level || 1,
          streak: d.streak || 0
        });
      });
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLeaderboard([]);
    }
  };

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserDoc(null);
      setCurrentSection('home');
      setCurrentQuiz(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const startQuiz = async (section: 'grammar' | 'reading' | 'listening') => {
    const filteredQuestions = questions.filter(q => q.section === section);
    
    if (filteredQuestions.length === 0) {
      alert('No questions available. Please add questions to Firestore "questions" collection.');
      return;
    }

    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5).slice(0, 5);

    const newQuiz: QuizState = {
      questions: shuffled,
      currentIndex: 0,
      score: 0,
      answered: false,
      selectedAnswer: null,
      correct: null,
      section
    };

    setCurrentQuiz(newQuiz);
    setCurrentSection('quiz');
  };

  const answerQuestion = (answerIndex: number) => {
    if (!currentQuiz || currentQuiz.answered) return;

    const currentQuestion = currentQuiz.questions[currentQuiz.currentIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    setCurrentQuiz(prev => {
      if (!prev) return null;
      return {
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        answered: true,
        selectedAnswer: answerIndex,
        correct: isCorrect
      };
    });

    if (isCorrect && user && userDoc) {
      const userRef = doc(db, 'users', user.uid);
      const newXP = userDoc.xp + 25;
      setDoc(userRef, { 
        xp: newXP,
        level: Math.floor(newXP / 100) + 1
      }, { merge: true });
      
      setUserDoc(prev => prev ? {
        ...prev,
        xp: newXP,
        level: Math.floor(newXP / 100) + 1
      } : null);
    }
  };

  const nextQuestion = () => {
    if (!currentQuiz) return;

    const nextIndex = currentQuiz.currentIndex + 1;

    if (nextIndex >= currentQuiz.questions.length) {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        setDoc(userRef, {
          streak: increment(1),
          lastActive: new Date().toISOString()
        }, { merge: true });
        
        setUserDoc(prev => prev ? {
          ...prev,
          streak: prev.streak + 1
        } : null);
      }
      setCurrentSection('home');
      setCurrentQuiz(null);
      refreshLeaderboard();
    } else {
      setCurrentQuiz(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentIndex: nextIndex,
          answered: false,
          selectedAnswer: null,
          correct: null
        };
      });
    }
  };

  const goToSection = (section: 'home' | 'quiz' | 'leaderboard' | 'profile') => {
    setCurrentSection(section);
    if (section !== 'quiz') {
      setCurrentQuiz(null);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      userDoc,
      loading,
      questions,
      currentSection,
      currentQuiz,
      leaderboard,
      login,
      logout,
      startQuiz,
      answerQuestion,
      nextQuestion,
      goToSection,
      refreshLeaderboard
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};