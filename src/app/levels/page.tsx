'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Level {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  icon: string;
  color: string;
  requirements: string[];
}

const levels: Level[] = [
  {
    id: 'student',
    name: 'STUDENT',
    nameJa: '学生レベル',
    description: '基礎的な解剖学・生理学の知識を問う問題',
    icon: '📚',
    color: '#10B981',
    requirements: [
      '解剖学の基本構造',
      '生理学の基礎知識',
      '基本的な医学用語'
    ]
  },
  {
    id: 'pt',
    name: 'PT',
    nameJa: '理学療法士レベル',
    description: '理学療法士国家試験レベルの専門知識',
    icon: '🏥',
    color: '#3B82F6',
    requirements: [
      '運動学・機能解剖学',
      'リハビリテーション医学',
      '理学療法評価・治療技術'
    ]
  },
  {
    id: 'at',
    name: 'AT',
    nameJa: 'アスレティックトレーナーレベル',
    description: 'スポーツ現場での実践的な知識と技術',
    icon: '⚡',
    color: '#F59E0B',
    requirements: [
      'スポーツ外傷・障害',
      'コンディショニング',
      'テーピング・応急処置'
    ]
  },
  {
    id: 'expert',
    name: 'EXPERT',
    nameJa: 'エキスパートレベル',
    description: '最新の研究知見を含む高度な専門知識',
    icon: '🎯',
    color: '#EF4444',
    requirements: [
      '最新研究・エビデンス',
      '高度な臨床判断',
      '専門分野の深い理解'
    ]
  }
];

export default function LevelsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('anatomy');

  const categories = [
    { id: 'anatomy', nameJa: '解剖学', icon: '🦴' },
    { id: 'physiology', nameJa: '生理学', icon: '❤️' },
    { id: 'nutrition', nameJa: '栄養学', icon: '🥗' },
    { id: 'biomechanics', nameJa: 'バイオメカニクス', icon: '⚙️' },
    { id: 'pathology', nameJa: '病理学・外傷学', icon: '🏥' },
    { id: 'rehabilitation', nameJa: 'リハビリテーション', icon: '💪' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🎯 The Wellness Leaders - レベル別チャレンジ
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                あなたのレベルに合わせた問題に挑戦しよう
              </p>
            </div>
            <Link
              href="/"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">カテゴリを選択</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.nameJa}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level) => (
            <div key={level.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div 
                className="h-2"
                style={{ backgroundColor: level.color }}
              ></div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{level.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {level.nameJa}
                    </h3>
                    <p className="text-sm text-gray-600">{level.name}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">
                  {level.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    出題範囲
                  </h4>
                  <ul className="space-y-1">
                    {level.requirements.map((req, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  href={`/quiz/${selectedCategory}?level=${level.name.toLowerCase()}`}
                  className="block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors text-white"
                  style={{ backgroundColor: level.color }}
                >
                  挑戦する
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📊 レベル診断ガイド
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">学生レベル</h4>
              <p className="text-gray-600 text-sm">
                医療系学生・基礎知識の習得段階
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏥</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">理学療法士</h4>
              <p className="text-gray-600 text-sm">
                PT資格保持者・臨床での実践知識
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">アスレティックトレーナー</h4>
              <p className="text-gray-600 text-sm">
                AT資格保持者・スポーツ現場の専門知識
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">エキスパート</h4>
              <p className="text-gray-600 text-sm">
                指導者・研究者レベルの高度な知識
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}