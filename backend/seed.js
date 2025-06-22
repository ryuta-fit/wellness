const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = [
  {
    name: 'anatomy',
    nameJa: '解剖学',
    description: '人体の構造に関する問題',
    icon: '🦴',
    color: '#ff6b6b'
  },
  {
    name: 'physiology',
    nameJa: '生理学',
    description: '人体の機能に関する問題',
    icon: '❤️',
    color: '#4ecdc4'
  },
  {
    name: 'nutrition',
    nameJa: '栄養学',
    description: 'スポーツ栄養学に関する問題',
    icon: '🥗',
    color: '#45b7d1'
  },
  {
    name: 'biomechanics',
    nameJa: 'バイオメカニクス',
    description: '動作解析・力学に関する問題',
    icon: '⚙️',
    color: '#96ceb4'
  },
  {
    name: 'pathology',
    nameJa: '病理学・外傷学',
    description: '怪我や疾患に関する問題',
    icon: '🏥',
    color: '#ffd93d'
  },
  {
    name: 'rehabilitation',
    nameJa: 'リハビリテーション',
    description: '治療・リハビリに関する問題',
    icon: '💪',
    color: '#a8e6cf'
  }
];

const sampleQuestions = [
  {
    title: '上腕二頭筋の起始部位',
    content: '上腕二頭筋の起始部位として正しいものはどれですか？',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'BASIC',
    level: 'STUDENT',
    categoryName: 'anatomy',
    explanation: '上腕二頭筋は肩甲骨の関節上結節と烏口突起から起始します。',
    options: [
      { text: '肩甲骨の関節上結節と烏口突起', isCorrect: true, order: 1 },
      { text: '上腕骨の大結節と小結節', isCorrect: false, order: 2 },
      { text: '鎖骨の外側端と肩峰', isCorrect: false, order: 3 },
      { text: '肩甲骨の棘上窩と棘下窩', isCorrect: false, order: 4 }
    ]
  },
  {
    title: '最大酸素摂取量の定義',
    content: '最大酸素摂取量（VO2max）について正しい説明はどれですか？',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'INTERMEDIATE',
    level: 'PT',
    categoryName: 'physiology',
    explanation: 'VO2maxは単位時間あたりに体内に取り込まれる酸素の最大量で、有酸素能力の指標です。',
    options: [
      { text: '単位時間あたりに体内に取り込まれる酸素の最大量', isCorrect: true, order: 1 },
      { text: '安静時の酸素消費量', isCorrect: false, order: 2 },
      { text: '運動後の過剰酸素消費量', isCorrect: false, order: 3 },
      { text: '血液中の酸素飽和度', isCorrect: false, order: 4 }
    ]
  },
  {
    title: 'クレアチンの効果',
    content: 'クレアチンサプリメントの主な効果として正しいものはどれですか？',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'INTERMEDIATE',
    level: 'AT',
    categoryName: 'nutrition',
    explanation: 'クレアチンは短時間高強度運動でのATP再生を促進し、パフォーマンス向上に寄与します。',
    options: [
      { text: '短時間高強度運動でのパフォーマンス向上', isCorrect: true, order: 1 },
      { text: '持久力の大幅な向上', isCorrect: false, order: 2 },
      { text: '脂肪燃焼の促進', isCorrect: false, order: 3 },
      { text: '筋肉痛の軽減', isCorrect: false, order: 4 }
    ]
  },
  {
    title: '地面反力の成分',
    content: '歩行時の地面反力の3つの成分として正しいものはどれですか？',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'ADVANCED',
    level: 'AT',
    categoryName: 'biomechanics',
    explanation: '地面反力は垂直力、前後力、左右力の3成分に分解されます。',
    options: [
      { text: '垂直力、前後力、左右力', isCorrect: true, order: 1 },
      { text: '上向き力、下向き力、横向き力', isCorrect: false, order: 2 },
      { text: '推進力、制動力、回転力', isCorrect: false, order: 3 },
      { text: '圧縮力、引張力、せん断力', isCorrect: false, order: 4 }
    ]
  },
  {
    title: 'RICE処置の構成要素',
    content: '急性外傷に対するRICE処置の4つの要素として正しいものはどれですか？',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'BASIC',
    level: 'STUDENT',
    categoryName: 'pathology',
    explanation: 'RICEはRest（安静）、Ice（冷却）、Compression（圧迫）、Elevation（挙上）の頭文字です。',
    options: [
      { text: 'Rest, Ice, Compression, Elevation', isCorrect: true, order: 1 },
      { text: 'Rehab, Ice, Care, Exercise', isCorrect: false, order: 2 },
      { text: 'Rest, Immobilization, Cold, Education', isCorrect: false, order: 3 },
      { text: 'Recovery, Ice, Compression, Evaluation', isCorrect: false, order: 4 }
    ]
  },
  {
    title: 'PNFストレッチングの原理',
    content: 'PNF（固有受容性神経筋促通法）ストレッチングの基本原理はどれですか？',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'ADVANCED',
    level: 'PT',
    categoryName: 'rehabilitation',
    explanation: 'PNFは筋の収縮-弛緩を利用して可動域を改善する技術です。',
    options: [
      { text: '筋の収縮-弛緩を利用した可動域改善', isCorrect: true, order: 1 },
      { text: '持続的な静的ストレッチング', isCorrect: false, order: 2 },
      { text: '関節の他動的な動かし方', isCorrect: false, order: 3 },
      { text: '温熱療法との組み合わせ', isCorrect: false, order: 4 }
    ]
  }
];

async function main() {
  console.log('データベースのシード開始...');

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: category,
      create: category
    });
  }

  for (const questionData of sampleQuestions) {
    const category = await prisma.category.findUnique({
      where: { name: questionData.categoryName }
    });

    if (!category) {
      console.error(`カテゴリ ${questionData.categoryName} が見つかりません`);
      continue;
    }

    const { options, categoryName, ...questionWithoutOptions } = questionData;

    const existingQuestion = await prisma.question.findFirst({
      where: { title: questionData.title }
    });

    if (!existingQuestion) {
      const question = await prisma.question.create({
        data: {
          ...questionWithoutOptions,
          categoryId: category.id
        }
      });

      for (const option of options) {
        await prisma.option.create({
          data: {
            ...option,
            questionId: question.id
          }
        });
      }
    }
  }

  console.log('シード完了！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });