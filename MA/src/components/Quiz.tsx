import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, BookOpen, Volume2, FileText } from 'lucide-react';

const Quiz: React.FC = () => {
  const { currentQuiz, answerQuestion, nextQuestion, goToSection } = useApp();

  if (!currentQuiz) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="py-12">
            <p className="text-slate-400 mb-4">No quiz in progress</p>
            <Button onClick={() => goToSection('home')}>Go to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuiz.currentIndex];
  const progress = ((currentQuiz.currentIndex + 1) / currentQuiz.questions.length) * 100;
  const isLastQuestion = currentQuiz.currentIndex + 1 >= currentQuiz.questions.length;

  const sectionIcons = {
    grammar: BookOpen,
    reading: FileText,
    listening: Volume2
  };

  const SectionIcon = sectionIcons[currentQuiz.section];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
            <SectionIcon className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold capitalize">{currentQuiz.section} Practice</h2>
            <p className="text-slate-400 text-sm">Question {currentQuiz.currentIndex + 1} of {currentQuiz.questions.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-white font-medium">{currentQuiz.score * 25} XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="bg-slate-900 border-slate-800 mb-6 overflow-hidden">
        <CardHeader className="bg-slate-800/50 border-b border-slate-800">
          <CardTitle className="text-xl text-white whitespace-pre-line leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              let buttonClass = 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white';
              let icon = null;

              if (currentQuiz.answered) {
                if (index === currentQuestion.correctAnswer) {
                  buttonClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
                  icon = <CheckCircle2 className="w-5 h-5" />;
                } else if (index === currentQuiz.selectedAnswer && !currentQuiz.correct) {
                  buttonClass = 'bg-red-500/20 border-red-500 text-red-400';
                  icon = <XCircle className="w-5 h-5" />;
                } else {
                  buttonClass = 'bg-slate-800/50 border-slate-700 text-slate-500';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => answerQuestion(index)}
                  disabled={currentQuiz.answered}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${buttonClass} ${!currentQuiz.answered ? 'hover:scale-[1.01] hover:border-violet-500' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-medium">{option}</span>
                    </div>
                    {icon}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      {currentQuiz.answered && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Card className={`mb-6 ${currentQuiz.correct ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                {currentQuiz.correct ? (
                  <>
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-emerald-400 font-semibold">Correct! +25 XP</p>
                      <p className="text-emerald-400/70 text-sm">Great job! Keep it up!</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-red-400 font-semibold">Incorrect</p>
                      <p className="text-red-400/70 text-sm">The correct answer was highlighted.</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={nextQuestion}
            className="w-full h-12 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-medium"
          >
            {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Quiz;