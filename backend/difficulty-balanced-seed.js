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

// 各難易度・レベル別の専門問題テンプレート
const questionTemplates = {
  anatomy: {
    basic_student: [
      {
        title: '上腕二頭筋の起始部位',
        content: '上腕二頭筋の起始部位として正しいものはどれですか？',
        explanation: '上腕二頭筋は肩甲骨の関節上結節（長頭）と烏口突起（短頭）から起始します。',
        options: [
          { text: '肩甲骨の関節上結節と烏口突起', isCorrect: true },
          { text: '上腕骨の大結節と小結節', isCorrect: false },
          { text: '鎖骨の外側端と肩峰', isCorrect: false },
          { text: '肩甲骨の棘上窩と棘下窩', isCorrect: false }
        ]
      },
      {
        title: '大胸筋の作用',
        content: '大胸筋の主な作用として正しいものはどれですか？',
        explanation: '大胸筋は上腕の内転、前方挙上、内旋を行います。',
        options: [
          { text: '上腕の内転、前方挙上、内旋', isCorrect: true },
          { text: '上腕の外転、後方挙上、外旋', isCorrect: false },
          { text: '前腕の屈曲、回内', isCorrect: false },
          { text: '肩甲骨の挙上、内転', isCorrect: false }
        ]
      },
      {
        title: '股関節の構造',
        content: '股関節の関節面として正しいものはどれですか？',
        explanation: '股関節は大腿骨頭と寛骨臼で構成される球関節です。',
        options: [
          { text: '大腿骨頭と寛骨臼', isCorrect: true },
          { text: '大腿骨顆と脛骨高原', isCorrect: false },
          { text: '上腕骨頭と関節窩', isCorrect: false },
          { text: '大腿骨頸部と腸骨', isCorrect: false }
        ]
      }
    ],
    intermediate_pt: [
      {
        title: '大胸筋の神経支配',
        content: '大胸筋を支配する神経はどれですか？',
        explanation: '大胸筋は内側胸筋神経と外側胸筋神経によって支配されます。',
        options: [
          { text: '内側胸筋神経と外側胸筋神経', isCorrect: true },
          { text: '腋窩神経', isCorrect: false },
          { text: '肩甲上神経', isCorrect: false },
          { text: '長胸神経', isCorrect: false }
        ]
      },
      {
        title: '膝関節の靭帯',
        content: '前十字靭帯の主な機能はどれですか？',
        explanation: '前十字靭帯は大腿骨に対する脛骨の前方移動を制限し、膝関節の安定性を保ちます。',
        options: [
          { text: '脛骨の前方移動を制限', isCorrect: true },
          { text: '脛骨の後方移動を制限', isCorrect: false },
          { text: '膝関節の外反を制限', isCorrect: false },
          { text: '膝関節の内反を制限', isCorrect: false }
        ]
      }
    ],
    advanced_expert: [
      {
        title: '腰神経叢の構成',
        content: '腰神経叢を構成する神経根として正しいものはどれですか？',
        explanation: '腰神経叢はL1-L4神経根から構成され、大腿神経や閉鎖神経などを分枝します。',
        options: [
          { text: 'L1-L4神経根', isCorrect: true },
          { text: 'L4-S3神経根', isCorrect: false },
          { text: 'T12-L2神経根', isCorrect: false },
          { text: 'L2-L5神経根', isCorrect: false }
        ]
      }
    ]
  },
  physiology: {
    basic_student: [
      {
        title: '心拍出量の計算',
        content: '心拍出量を求める計算式として正しいものはどれですか？',
        explanation: '心拍出量 = 心拍数 × 1回拍出量で計算されます。',
        options: [
          { text: '心拍数 × 1回拍出量', isCorrect: true },
          { text: '心拍数 ÷ 1回拍出量', isCorrect: false },
          { text: '血圧 × 心拍数', isCorrect: false },
          { text: '肺活量 × 呼吸数', isCorrect: false }
        ]
      }
    ],
    intermediate_pt: [
      {
        title: '最大酸素摂取量',
        content: 'VO2maxについて正しい説明はどれですか？',
        explanation: 'VO2maxは単位時間あたりに体内に取り込まれる酸素の最大量で、有酸素能力の指標です。',
        options: [
          { text: '単位時間あたりの最大酸素摂取量', isCorrect: true },
          { text: '安静時の酸素消費量', isCorrect: false },
          { text: '運動後の過剰酸素消費量', isCorrect: false },
          { text: '血液中の酸素飽和度', isCorrect: false }
        ]
      }
    ],
    advanced_expert: [
      {
        title: '筋収縮のメカニズム',
        content: '筋収縮におけるカルシウムイオンの役割は何ですか？',
        explanation: 'カルシウムイオンはトロポニンに結合し、アクチンとミオシンの相互作用を可能にします。',
        options: [
          { text: 'トロポニンに結合してアクチン・ミオシン結合を可能にする', isCorrect: true },
          { text: 'ATPを直接分解する', isCorrect: false },
          { text: '神経伝達物質として働く', isCorrect: false },
          { text: '筋肉の弛緩を促進する', isCorrect: false }
        ]
      }
    ]
  },
  nutrition: {
    basic_student: [
      {
        title: 'タンパク質の1日推奨摂取量',
        content: '一般成人のタンパク質1日推奨摂取量（体重1kgあたり）はどれですか？',
        explanation: '一般成人は体重1kgあたり0.8-1.0g、アスリートは1.2-2.0gが推奨されます。',
        options: [
          { text: '0.8-1.0g', isCorrect: true },
          { text: '0.3-0.5g', isCorrect: false },
          { text: '2.0-3.0g', isCorrect: false },
          { text: '5.0-6.0g', isCorrect: false }
        ]
      }
    ],
    intermediate_pt: [
      {
        title: 'クレアチンの効果',
        content: 'クレアチンサプリメントの主な効果はどれですか？',
        explanation: 'クレアチンは短時間高強度運動でのATP再合成を促進し、パフォーマンス向上に寄与します。',
        options: [
          { text: '短時間高強度運動のパフォーマンス向上', isCorrect: true },
          { text: '持久力の大幅な向上', isCorrect: false },
          { text: '脂肪燃焼の促進', isCorrect: false },
          { text: '筋肉痛の軽減', isCorrect: false }
        ]
      }
    ],
    advanced_expert: [
      {
        title: 'BCAA（分岐鎖アミノ酸）',
        content: 'BCAAに含まれるアミノ酸として正しい組み合わせはどれですか？',
        explanation: 'BCAAはバリン、ロイシン、イソロイシンの3つの分岐鎖アミノ酸です。',
        options: [
          { text: 'バリン、ロイシン、イソロイシン', isCorrect: true },
          { text: 'グルタミン、アルギニン、リジン', isCorrect: false },
          { text: 'フェニルアラニン、チロシン、トリプトファン', isCorrect: false },
          { text: 'メチオニン、システイン、セリン', isCorrect: false }
        ]
      }
    ]
  },
  biomechanics: {
    basic_student: [
      {
        title: 'モーメントの定義',
        content: '力学におけるモーメントの定義として正しいものはどれですか？',
        explanation: 'モーメント = 力 × 距離（モーメントアーム）で計算されます。',
        options: [
          { text: '力 × 距離', isCorrect: true },
          { text: '力 ÷ 距離', isCorrect: false },
          { text: '質量 × 加速度', isCorrect: false },
          { text: '速度 × 時間', isCorrect: false }
        ]
      }
    ],
    intermediate_pt: [
      {
        title: '地面反力の3成分',
        content: '歩行時の地面反力の3つの成分として正しいものはどれですか？',
        explanation: '地面反力は垂直力、前後力、左右力の3成分に分解されます。',
        options: [
          { text: '垂直力、前後力、左右力', isCorrect: true },
          { text: '上向き力、下向き力、横向き力', isCorrect: false },
          { text: '推進力、制動力、回転力', isCorrect: false },
          { text: '圧縮力、引張力、せん断力', isCorrect: false }
        ]
      }
    ],
    advanced_expert: [
      {
        title: '慣性モーメント',
        content: '慣性モーメントを小さくするための方法として正しいものはどれですか？',
        explanation: '質量を回転軸に近づけることで慣性モーメントを小さくできます。',
        options: [
          { text: '質量を回転軸に近づける', isCorrect: true },
          { text: '質量を回転軸から遠ざける', isCorrect: false },
          { text: '質量を増やす', isCorrect: false },
          { text: '回転速度を上げる', isCorrect: false }
        ]
      }
    ]
  },
  pathology: {
    basic_student: [
      {
        title: 'RICE処置',
        content: '急性外傷に対するRICE処置の構成要素として正しいものはどれですか？',
        explanation: 'RICEはRest（安静）、Ice（冷却）、Compression（圧迫）、Elevation（挙上）です。',
        options: [
          { text: 'Rest, Ice, Compression, Elevation', isCorrect: true },
          { text: 'Rehab, Ice, Care, Exercise', isCorrect: false },
          { text: 'Rest, Immobilization, Cold, Education', isCorrect: false },
          { text: 'Recovery, Ice, Compression, Evaluation', isCorrect: false }
        ]
      }
    ],
    intermediate_pt: [
      {
        title: '炎症の5徴候',
        content: '炎症の5徴候に含まれないものはどれですか？',
        explanation: '炎症の5徴候は発赤、腫脹、熱感、疼痛、機能障害です。',
        options: [
          { text: '筋力低下', isCorrect: true },
          { text: '発赤', isCorrect: false },
          { text: '腫脹', isCorrect: false },
          { text: '疼痛', isCorrect: false }
        ]
      }
    ],
    advanced_expert: [
      {
        title: '骨折の治癒過程',
        content: '骨折治癒の正しい順序はどれですか？',
        explanation: '骨折治癒は炎症期→軟性仮骨形成期→硬性仮骨形成期→リモデリング期の順で進行します。',
        options: [
          { text: '炎症期→軟性仮骨→硬性仮骨→リモデリング', isCorrect: true },
          { text: '軟性仮骨→炎症期→硬性仮骨→リモデリング', isCorrect: false },
          { text: 'リモデリング→炎症期→仮骨形成', isCorrect: false },
          { text: '硬性仮骨→軟性仮骨→炎症期', isCorrect: false }
        ]
      }
    ]
  },
  rehabilitation: {
    basic_student: [
      {
        title: 'ROM訓練の種類',
        content: '関節可動域訓練の分類で、患者が自力で行うものはどれですか？',
        explanation: 'Active ROM（自動運動）は患者が自分の筋力で関節を動かす訓練です。',
        options: [
          { text: 'Active ROM（自動運動）', isCorrect: true },
          { text: 'Passive ROM（他動運動）', isCorrect: false },
          { text: 'Resistive ROM（抵抗運動）', isCorrect: false },
          { text: 'Static ROM（静的運動）', isCorrect: false }
        ]
      }
    ],
    intermediate_pt: [
      {
        title: 'PNFストレッチング',
        content: 'PNF（固有受容性神経筋促通法）の基本原理はどれですか？',
        explanation: 'PNFは筋の収縮-弛緩を利用して可動域を改善する技術です。',
        options: [
          { text: '筋の収縮-弛緩を利用した可動域改善', isCorrect: true },
          { text: '持続的な静的ストレッチング', isCorrect: false },
          { text: '関節の他動的な動かし方', isCorrect: false },
          { text: '温熱療法との組み合わせ', isCorrect: false }
        ]
      }
    ],
    advanced_expert: [
      {
        title: 'バランス訓練の段階',
        content: 'バランス訓練の段階的プログレッションとして正しい順序はどれですか？',
        explanation: '静的バランス→動的バランス→機能的バランス→スポーツ特異的バランスの順で進行します。',
        options: [
          { text: '静的→動的→機能的→スポーツ特異的', isCorrect: true },
          { text: '動的→静的→機能的→スポーツ特異的', isCorrect: false },
          { text: 'スポーツ特異的→静的→動的→機能的', isCorrect: false },
          { text: '機能的→動的→静的→スポーツ特異的', isCorrect: false }
        ]
      }
    ]
  }
};

// 各難易度100問ずつ生成する関数
function generateBalancedQuestions(categoryName, templates) {
  const questions = [];
  
  // 各難易度で100問ずつ作成（合計300問）
  const difficulties = [
    { key: 'basic_student', difficulty: 'BASIC', level: 'STUDENT', target: 100 },
    { key: 'intermediate_pt', difficulty: 'INTERMEDIATE', level: 'PT', target: 100 },
    { key: 'advanced_expert', difficulty: 'ADVANCED', level: 'EXPERT', target: 100 }
  ];
  
  difficulties.forEach(diffConfig => {
    const baseQuestions = templates[diffConfig.key] || [];
    if (baseQuestions.length === 0) return;
    
    for (let i = 0; i < diffConfig.target; i++) {
      const baseQuestion = baseQuestions[i % baseQuestions.length];
      const variation = Math.floor(i / baseQuestions.length) + 1;
      
      questions.push({
        title: variation === 1 ? baseQuestion.title : `${baseQuestion.title} (問題${variation})`,
        content: baseQuestion.content,
        difficulty: diffConfig.difficulty,
        level: diffConfig.level,
        explanation: baseQuestion.explanation,
        options: baseQuestion.options.map((opt, idx) => ({
          text: opt.text,
          isCorrect: opt.isCorrect,
          order: idx + 1
        }))
      });
    }
  });
  
  return questions;
}

async function main() {
  console.log('難易度バランス型問題データベース作成開始...');
  console.log('各難易度100問ずつ、各カテゴリ300問を作成します');

  // カテゴリを作成
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: category,
      create: category
    });
  }

  console.log('カテゴリ作成完了');

  // 既存の問題を削除
  await prisma.option.deleteMany({});
  await prisma.question.deleteMany({});
  
  console.log('既存問題削除完了');

  // 各カテゴリの問題を作成
  for (const [categoryName, templates] of Object.entries(questionTemplates)) {
    console.log(`${categoryName}の難易度バランス問題作成中...`);
    
    const category = await prisma.category.findUnique({
      where: { name: categoryName }
    });

    if (!category) {
      console.error(`カテゴリ ${categoryName} が見つかりません`);
      continue;
    }

    const questions = generateBalancedQuestions(categoryName, templates);

    for (const questionData of questions) {
      const { options, ...questionWithoutOptions } = questionData;

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
    
    console.log(`${categoryName}: ${questions.length}問作成完了`);
  }

  // 難易度別統計を表示
  const stats = await prisma.category.findMany({
    include: {
      _count: {
        select: { questions: true }
      }
    }
  });

  console.log('\n=== カテゴリ別問題数統計 ===');
  stats.forEach(category => {
    console.log(`${category.nameJa}: ${category._count.questions}問`);
  });

  // 難易度別統計
  console.log('\n=== 難易度別問題数統計 ===');
  const difficulties = ['BASIC', 'INTERMEDIATE', 'ADVANCED'];
  for (const difficulty of difficulties) {
    const count = await prisma.question.count({
      where: { difficulty }
    });
    console.log(`${difficulty}: ${count}問`);
  }

  const totalQuestions = await prisma.question.count();
  console.log(`\n総問題数: ${totalQuestions}問`);
  console.log('難易度バランス型問題データベース作成完了！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });