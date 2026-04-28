import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './styles.css';

// Icons as simple SVG components
const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
  </svg>
);

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Types
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  section: string;
  level: number;
}

// Login Component
const LoginPage: React.FC<{ onLogin: (email: string, password: string) => void; error: string; loading: boolean }> = ({ onLogin, error, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo Section */}
        <div className="login-logo">
          <div className="login-logo-icon">
            <BookIcon />
          </div>
          <h1 className="login-title">STEP AI</h1>
          <p className="login-subtitle">Admin Dashboard</p>
        </div>

        {/* Welcome Badge */}
        <div className="login-welcome">
          <div className="login-welcome-icon">
            <SparklesIcon />
          </div>
          <div className="login-welcome-text">
            <h2>Welcome Back</h2>
            <p>Sign in to manage your questions</p>
          </div>
        </div>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              <AlertIcon />
              <span>{error}</span>
            </div>
          )}

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <UserIcon />
              </div>
              <input
                type="email"
                className="form-input with-icon"
                placeholder="admin@stepai.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <LockIcon />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input with-icon"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="button-arrow">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="login-demo">
          <div className="login-demo-header">
            <InfoIcon />
            <span>Demo Credentials</span>
          </div>
          <div className="login-demo-content">
            <div className="demo-row">
              <span className="demo-label">Email:</span>
              <span className="demo-value">admin@stepai.com</span>
            </div>
            <div className="demo-row">
              <span className="demo-label">Password:</span>
              <span className="demo-value">admin123</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="login-footer">
          <p>Developed with ❤️ by <span>Abdullah</span></p>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [grammarCount, setGrammarCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [listeningCount, setListeningCount] = useState(0);

  useEffect(() => {
    fetchQuestionCount();
  }, []);

  const fetchQuestionCount = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questions = querySnapshot.docs.map(doc => doc.data());
      setQuestionCount(questions.length);
      setGrammarCount(questions.filter(q => q.section === 'grammar').length);
      setReadingCount(questions.filter(q => q.section === 'reading').length);
      setListeningCount(questions.filter(q => q.section === 'listening').length);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const validateQuestions = (data: unknown): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!Array.isArray(data)) {
      return { valid: false, errors: ['JSON must be an array of questions'] };
    }

    if (data.length === 0) {
      return { valid: false, errors: ['Array cannot be empty'] };
    }

    data.forEach((item, index) => {
      if (typeof item.question !== 'string' || item.question.trim() === '') {
        errors.push(`Question ${index + 1}: Missing or invalid "question" field`);
      }

      if (!Array.isArray(item.options) || item.options.length < 2) {
        errors.push(`Question ${index + 1}: "options" must be an array with at least 2 choices`);
      }

      if (typeof item.correctAnswer !== 'number' || item.correctAnswer < 0 || item.correctAnswer >= (item.options?.length || 0)) {
        errors.push(`Question ${index + 1}: "correctAnswer" must be a valid index`);
      }

      if (typeof item.section !== 'string' || !['grammar', 'reading', 'listening'].includes(item.section)) {
        errors.push(`Question ${index + 1}: "section" must be "grammar", "reading", or "listening"`);
      }

      if (typeof item.level !== 'number' || item.level < 1) {
        errors.push(`Question ${index + 1}: "level" must be a positive number`);
      }
    });

    return { valid: errors.length === 0, errors };
  };

  const handleUpload = async () => {
    setMessage(null);
    setLoading(true);

    try {
      // Parse JSON
      let parsedData: unknown;
      try {
        parsedData = JSON.parse(jsonInput);
      } catch {
        setMessage({ type: 'error', text: 'Invalid JSON format. Please check your syntax.' });
        setLoading(false);
        return;
      }

      // Validate questions
      const validation = validateQuestions(parsedData);
      if (!validation.valid) {
        setMessage({ type: 'error', text: validation.errors[0] });
        setLoading(false);
        return;
      }

      // Upload to Firestore
      const questions = parsedData as QuizQuestion[];
      const uploadPromises = questions.map(question => 
        addDoc(collection(db, 'questions'), {
          ...question,
          createdAt: new Date()
        })
      );

      await Promise.all(uploadPromises);

      setMessage({ type: 'success', text: `${questions.length} questions uploaded successfully ✅` });
      setJsonInput('');
      await fetchQuestionCount();

    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload questions. Please try again.' });
    }

    setLoading(false);
  };

  const handleClearDatabase = async () => {
    if (!window.confirm('Are you sure you want to delete ALL questions? This action cannot be undone.')) {
      return;
    }

    setClearing(true);
    setMessage(null);

    try {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      setMessage({ type: 'success', text: 'Database cleared successfully ✅' });
      await fetchQuestionCount();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to clear database. Please try again.' });
    }

    setClearing(false);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="header-logo">
            <BookIcon />
          </div>
          <h1 className="header-title">STEP AI</h1>
          <span className="header-badge">Admin</span>
        </div>

        <div className="header-right">
          <div className="header-stats">
            <span className="header-stats-number">{questionCount}</span>
            <span className="header-stats-label">Questions</span>
          </div>
          <button className="logout-button" onClick={onLogout}>
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <h2 className="page-title">Question Manager</h2>
        <p className="page-subtitle">Upload quiz questions in JSON format to Firebase Firestore</p>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon purple">
                <DatabaseIcon />
              </div>
            </div>
            <div className="stat-card-value">{questionCount}</div>
            <div className="stat-card-label">Total Questions</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon blue">
                <FileIcon />
              </div>
            </div>
            <div className="stat-card-value">{grammarCount}</div>
            <div className="stat-card-label">Grammar Questions</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon green">
                <LayersIcon />
              </div>
            </div>
            <div className="stat-card-value">{readingCount}</div>
            <div className="stat-card-label">Reading Questions</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <div className="stat-card-icon orange">
                <UploadIcon />
              </div>
            </div>
            <div className="stat-card-value">{listeningCount}</div>
            <div className="stat-card-label">Listening Questions</div>
          </div>
        </div>

        {/* Upload Card */}
        <div className="upload-card">
          <div className="upload-card-header">
            <h3 className="upload-card-title">
              <UploadIcon />
              Upload Questions
            </h3>
            <button 
              className="clear-button" 
              onClick={handleClearDatabase}
              disabled={clearing || questionCount === 0}
            >
              {clearing ? (
                <>
                  <div className="spinner" />
                  <span>Clearing...</span>
                </>
              ) : (
                <>
                  <TrashIcon />
                  <span>Clear Database</span>
                </>
              )}
            </button>
          </div>

          <textarea
            className="json-textarea"
            placeholder='Paste your JSON questions here...

Example:
[
  {
    "question": "She ___ to school yesterday.",
    "options": ["go", "went", "gone", "going"],
    "correctAnswer": 1,
    "section": "grammar",
    "level": 1
  }
]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />

          <button 
            className="upload-button" 
            onClick={handleUpload}
            disabled={loading || !jsonInput.trim()}
          >
            {loading ? (
              <>
                <div className="spinner" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <UploadIcon />
                <span>Upload Questions</span>
              </>
            )}
          </button>

          {message && (
            <div className={`message message-${message.type}`}>
              {message.type === 'success' ? <CheckIcon /> : <AlertIcon />}
              <span className="message-text">{message.text}</span>
            </div>
          )}

          {/* Format Hint */}
          <div className="format-hint">
            <div className="format-hint-title">
              <InfoIcon />
              <span>JSON Format Reference</span>
            </div>
            <pre className="format-hint-code">
{`[
  {
    "question": "Your question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "section": "grammar",
    "level": 1
  }
]`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};

// Main Admin Component
const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoginError('');
    setLoginLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoginError('Invalid email or password. Please try again.');
    }

    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="login-container">
        <div className="loading-screen">
          <div className="spinner large" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        error={loginError} 
        loading={loginLoading} 
      />
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};

export default Admin;