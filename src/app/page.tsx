'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  icon: string;
  color: string;
  _count: {
    questions: number;
  };
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('カテゴリの取得に失敗しました:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            🏥 The Wellness Leaders
          </h1>
          <p className="text-lg text-gray-600 text-center mt-2">
            理学療法士・アスレティックトレーナー向け学習クイズ
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            カテゴリを選択してクイズを開始
          </h2>
          <p className="text-gray-600">
            解剖学、生理学、栄養学など、様々な分野の問題にチャレンジしよう
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/quiz/${category.name}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4 group-hover:scale-105"
                   style={{ borderLeftColor: category.color }}>
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {category.nameJa}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {category.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {category._count.questions}問
                  </span>
                  <span className="text-blue-600 group-hover:text-blue-800 font-medium">
                    開始 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/levels"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🎯 レベル別チャレンジ
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              📚 学習の進め方
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📚</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">カテゴリ選択</h4>
                <p className="text-gray-600 text-sm">興味のある分野を選んでスタート</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⏰</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">時間制限</h4>
                <p className="text-gray-600 text-sm">各問題30秒以内に回答</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏆</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">スコア獲得</h4>
                <p className="text-gray-600 text-sm">正解率とスピードでスコアアップ</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}