'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  order: number;
}

interface Question {
  id: string;
  title: string;
  content: string;
  type: string;
  difficulty: string;
  level: string;
  explanation: string;
  timeLimit: number;
  options: Option[];
  category: {
    nameJa: string;
    icon: string;
    color: string;
  };
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{questionId: string, selectedOptionId: string, isCorrect: boolean, timeSpent: number}[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);

  const fetchQuestions = (excludeIds: string[] = []) => {
    const excludeQuery = excludeIds.length > 0 ? `&excludeIds=${excludeIds.join(',')}` : '';
    fetch(`http://localhost:3001/api/questions/${category}?limit=10${excludeQuery}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
        // 新しく取得した問題IDを使用済みリストに追加
        const newQuestionIds = data.map((q: Question) => q.id);
        setUsedQuestionIds(prev => [...prev, ...newQuestionIds]);
      })
      .catch(err => {
        console.error('問題の取得に失敗しました:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, gameStarted, showResult]);

  const currentQuestion = questions[currentIndex];

  const handleStartGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
  };

  const handleAnswerSelect = (optionId: string) => {
    if (selectedAnswer || showResult) return;
    setSelectedAnswer(optionId);
    
    const selectedOption = currentQuestion.options.find(opt => opt.id === optionId);
    const isCorrect = selectedOption?.isCorrect || false;
    const timeSpent = 30 - timeLeft;
    
    if (isCorrect) {
      const timeBonus = Math.max(0, timeLeft * 10);
      setScore(score + 100 + timeBonus);
    }
    
    setAnswers([...answers, {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
      isCorrect,
      timeSpent
    }]);
    
    setTimeout(() => handleNextQuestion(), 2000);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  const calculateFinalScore = () => {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const accuracy = correctCount / answers.length;
    const averageTime = answers.reduce((sum, a) => sum + a.timeSpent, 0) / answers.length;
    const speedBonus = Math.max(0, (30 - averageTime) * 10);
    
    return {
      correctCount,
      totalQuestions: answers.length,
      accuracy: Math.round(accuracy * 100),
      finalScore: score,
      speedBonus: Math.round(speedBonus)
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">問題が見つかりません</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="text-4xl mb-4">{currentQuestion.category.icon}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            The Wellness Leaders
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            {currentQuestion.category.nameJa}
          </h2>
          <p className="text-gray-600 mb-6">
            {questions.length}問のクイズに挑戦しましょう
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">ルール</h3>
            <ul className="text-sm text-gray-600 text-left">
              <li>• 各問題30秒の制限時間</li>
              <li>• 正解で100ポイント + 時間ボーナス</li>
              <li>• 早く答えるほど高得点</li>
            </ul>
          </div>
          <button
            onClick={handleStartGame}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            クイズを開始
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const result = calculateFinalScore();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">クイズ完了！</h1>
          
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600">{result.finalScore}</div>
              <div className="text-sm text-gray-600">総スコア</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-xl font-bold text-green-600">
                  {result.correctCount}/{result.totalQuestions}
                </div>
                <div className="text-xs text-gray-600">正解数</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-xl font-bold text-purple-600">
                  {result.accuracy}%
                </div>
                <div className="text-xs text-gray-600">正解率</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              ホームに戻る
            </button>
            <button
              onClick={() => {
                // 状態をリセットして新しい問題セットを取得（使用済み問題を除外）
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setShowResult(false);
                setScore(0);
                setTimeLeft(30);
                setGameStarted(false);
                setAnswers([]);
                setLoading(true);
                fetchQuestions(usedQuestionIds);
              }}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              もう一度挑戦（新しい問題）
            </button>
            {usedQuestionIds.length >= 50 && (
              <button
                onClick={() => {
                  // 使用済み問題履歴をリセット
                  setUsedQuestionIds([]);
                  setCurrentIndex(0);
                  setSelectedAnswer(null);
                  setShowResult(false);
                  setScore(0);
                  setTimeLeft(30);
                  setGameStarted(false);
                  setAnswers([]);
                  setLoading(true);
                  fetchQuestions([]);
                }}
                className="w-full bg-orange-100 text-orange-700 py-2 px-4 rounded-lg text-sm hover:bg-orange-200 transition-colors"
              >
                問題履歴をリセット（{usedQuestionIds.length}問使用済み）
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl mr-2">{currentQuestion.category.icon}</span>
              <h1 className="text-xl font-bold text-gray-900">
                {currentQuestion.category.nameJa}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {currentIndex + 1} / {questions.length}
              </div>
              <div className="text-lg font-bold text-blue-600">
                {score}点
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {currentQuestion.difficulty}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {currentQuestion.level}
                </span>
              </div>
              <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-600'}`}>
                ⏰ {timeLeft}s
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-gray-700">
              {currentQuestion.content}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ";
              
              if (!selectedAnswer) {
                buttonClass += "border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-900";
              } else if (option.id === selectedAnswer) {
                buttonClass += option.isCorrect 
                  ? "border-green-500 bg-green-50 text-green-800"
                  : "border-red-500 bg-red-50 text-red-800";
              } else if (option.isCorrect && selectedAnswer) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-900";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={!!selectedAnswer}
                  className={buttonClass}
                >
                  <div className="flex items-center">
                    <span className={`font-semibold mr-3 ${!selectedAnswer || (!option.isCorrect && selectedAnswer !== option.id) ? 'text-gray-900' : ''}`}>
                      {String.fromCharCode(65 + option.order - 1)}
                    </span>
                    <span className={`${!selectedAnswer || (!option.isCorrect && selectedAnswer !== option.id) ? 'text-gray-900' : ''}`}>{option.text}</span>
                    {selectedAnswer && option.isCorrect && (
                      <span className="ml-auto text-green-600">✓</span>
                    )}
                    {selectedAnswer === option.id && !option.isCorrect && (
                      <span className="ml-auto text-red-600">✗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">解説</h4>
              <p className="text-blue-800 text-sm">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}