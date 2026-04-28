import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Sparkles, BookOpen, Volume2, PenTool } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Learning</span>
            </div>
            <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
              STEP AI
            </h1>
            <p className="text-xl text-white/80 max-w-md">
              Master English with intelligent practice. Grammar, Reading, and Listening — all in one place.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            {[
              { icon: BookOpen, text: 'Grammar mastery with instant feedback' },
              { icon: PenTool, text: 'Reading comprehension exercises' },
              { icon: Volume2, text: 'Listening practice with audio' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-white/80">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-400 mb-2">
              STEP AI
            </h1>
            <p className="text-slate-400">Premium English Test Preparation</p>
          </div>

          <Card className="bg-slate-900 border-slate-800 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-violet-500/25">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
              <CardDescription className="text-slate-400">
                Sign in to continue your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Button
                onClick={login}
                className="w-full h-12 bg-white hover:bg-slate-100 text-slate-900 font-medium text-base gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Button>

              <div className="mt-6 text-center">
                <p className="text-slate-500 text-sm">
                  By signing in, you agree to our Terms of Service
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-slate-600 text-sm">
            © 2024 STEP AI. Developed by{' '}
            <span className="text-violet-400 font-medium">Abdullah</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;