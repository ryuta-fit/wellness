const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fisher-Yatesシャッフル
function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 実際のPT国家試験・リハビリテーション医学レベルの問題
const rehabilitationQuestions = [
  // BASIC レベル（学生・初級者向け）
  {
    title: 'ICFの概念',
    content: 'ICF（国際生活機能分類）における「活動」の定義として正しいのはどれか。',
    difficulty: 'BASIC',
    level: 'STUDENT',
    explanation: 'ICFにおける活動は個人による課題や行為の実行を指し、ADLや移動などが含まれる。',
    options: [
      { text: '個人による課題や行為の実行', isCorrect: true },
      { text: '身体機能・身体構造の問題', isCorrect: false },
      { text: '生活・人生場面への関わり', isCorrect: false },
      { text: '環境因子の影響', isCorrect: false }
    ]
  },
  {
    title: 'ADLの分類',
    content: '基本的ADL（BADL）に含まれるものはどれか。',
    difficulty: 'BASIC',
    level: 'STUDENT',
    explanation: '基本的ADLには食事、排泄、更衣、入浴、移動など生命維持に必要な基本的活動が含まれる。',
    options: [
      { text: '食事・排泄・更衣・入浴', isCorrect: true },
      { text: '買い物・調理・掃除・洗濯', isCorrect: false },
      { text: '職業活動・社会参加', isCorrect: false },
      { text: '趣味・娯楽活動', isCorrect: false }
    ]
  },
  {
    title: 'ROM運動の種類',
    content: '他動関節可動域運動（PROM）の主な目的として正しいのはどれか。',
    difficulty: 'BASIC',
    level: 'STUDENT',
    explanation: 'PROMは関節可動域の維持・改善、拘縮予防、循環促進などを目的とする。',
    options: [
      { text: '関節可動域の維持・拘縮予防', isCorrect: true },
      { text: '筋力の大幅な向上', isCorrect: false },
      { text: '持久力の向上', isCorrect: false },
      { text: '平衡機能の改善', isCorrect: false }
    ]
  },
  {
    title: '理学療法の基本原理',
    content: '理学療法における「治療的運動」の原則として最も重要なのはどれか。',
    difficulty: 'BASIC',
    level: 'STUDENT',
    explanation: '治療的運動は個別性を重視し、患者の状態に応じて段階的に進行することが重要である。',
    options: [
      { text: '個別性と段階的進行', isCorrect: true },
      { text: '画一的なプログラム実施', isCorrect: false },
      { text: '最大負荷での訓練', isCorrect: false },
      { text: '痛みを我慢して継続', isCorrect: false }
    ]
  },
  {
    title: '移乗動作の原則',
    content: '安全な移乗動作を行うための基本原則として正しいのはどれか。',
    difficulty: 'BASIC',
    level: 'STUDENT',
    explanation: '移乗時は重心を低くし、支持基底面を広く取り、患者に近づいて行うことが重要である。',
    options: [
      { text: '重心を低く、支持基底面を広く取る', isCorrect: true },
      { text: '素早い動作で行う', isCorrect: false },
      { text: '患者から離れた位置で行う', isCorrect: false },
      { text: '片手のみで支援する', isCorrect: false }
    ]
  },

  // INTERMEDIATE レベル（PT・OT向け）
  {
    title: '脳卒中リハビリテーション',
    content: '脳卒中急性期リハビリテーションの開始時期として適切なのはどれか。',
    difficulty: 'INTERMEDIATE',
    level: 'PT',
    explanation: '脳卒中急性期リハは発症後48時間以内に開始し、廃用症候群予防と早期機能回復を図る。',
    options: [
      { text: '発症後48時間以内', isCorrect: true },
      { text: '発症後1週間以降', isCorrect: false },
      { text: '発症後1ヶ月以降', isCorrect: false },
      { text: '症状完全安定後', isCorrect: false }
    ]
  },
  {
    title: 'Brunnstrom stage',
    content: 'Brunnstrom stageのstage Ⅲの特徴として正しいのはどれか。',
    difficulty: 'INTERMEDIATE',
    level: 'PT',
    explanation: 'Stage Ⅲでは随意的に共同運動が出現し、わずかに共同運動から逸脱した運動が可能となる。',
    options: [
      { text: '随意的共同運動の出現', isCorrect: true },
      { text: '正常な選択的運動', isCorrect: false },
      { text: '深部反射の消失', isCorrect: false },
      { text: '完全な運動麻痺', isCorrect: false }
    ]
  },
  {
    title: '歩行分析',
    content: '正常歩行周期における立脚期の割合として正しいのはどれか。',
    difficulty: 'INTERMEDIATE',
    level: 'PT',
    explanation: '正常歩行では1歩行周期のうち立脚期が約60%、遊脚期が約40%を占める。',
    options: [
      { text: '約60%', isCorrect: true },
      { text: '約40%', isCorrect: false },
      { text: '約50%', isCorrect: false },
      { text: '約80%', isCorrect: false }
    ]
  },
  {
    title: '関節可動域制限',
    content: '肩関節周囲炎（五十肩）で特に制限されやすい動きはどれか。',
    difficulty: 'INTERMEDIATE',
    level: 'PT',
    explanation: '肩関節周囲炎では外旋と外転の制限が著明で、夜間痛を伴うことが特徴的である。',
    options: [
      { text: '外旋と外転', isCorrect: true },
      { text: '内旋と内転', isCorrect: false },
      { text: '屈曲と伸展', isCorrect: false },
      { text: '水平屈曲と水平伸展', isCorrect: false }
    ]
  },
  {
    title: '筋力評価',
    content: 'Manual Muscle Test（MMT）のgrade 3の定義として正しいのはどれか。',
    difficulty: 'INTERMEDIATE',
    level: 'PT',
    explanation: 'MMT grade 3は重力に抗して関節可動域全範囲の運動が可能だが、抵抗には耐えられない状態。',
    options: [
      { text: '重力に抗して全可動域運動可能', isCorrect: true },
      { text: '重力を除けば全可動域運動可能', isCorrect: false },
      { text: '強い抵抗に抗して運動可能', isCorrect: false },
      { text: '筋収縮は触知できるが運動なし', isCorrect: false }
    ]
  },

  // ADVANCED レベル（専門家向け）
  {
    title: '運動学習理論',
    content: '運動学習における「練習の特異性原理」として正しいのはどれか。',
    difficulty: 'ADVANCED',
    level: 'EXPERT',
    explanation: '練習の特異性原理では、練習条件と実際の使用条件が類似するほど学習効果が高まる。',
    options: [
      { text: '練習条件と使用条件の類似性が学習効果を左右する', isCorrect: true },
      { text: '同一動作の反復のみが有効', isCorrect: false },
      { text: '複雑な課題から始めるべき', isCorrect: false },
      { text: '個人差は考慮不要', isCorrect: false }
    ]
  },
  {
    title: '神経可塑性',
    content: '脳損傷後の機能回復における「機能的再組織化」の説明として正しいのはどれか。',
    difficulty: 'ADVANCED',
    level: 'EXPERT',
    explanation: '機能的再組織化では損傷を免れた脳領域が損傷部位の機能を代償的に担うようになる。',
    options: [
      { text: '健常部位が損傷部位の機能を代償', isCorrect: true },
      { text: '損傷部位の完全な構造的修復', isCorrect: false },
      { text: '脳組織の物理的拡大', isCorrect: false },
      { text: '新しい脳細胞の大量増殖', isCorrect: false }
    ]
  },
  {
    title: '呼吸リハビリテーション',
    content: 'COPD患者への運動療法において最も重要な指標はどれか。',
    difficulty: 'ADVANCED',
    level: 'EXPERT',
    explanation: 'COPD患者では酸素飽和度（SpO2）の監視が最重要で、通常90%以上を維持する。',
    options: [
      { text: '酸素飽和度（SpO2）', isCorrect: true },
      { text: '血圧のみ', isCorrect: false },
      { text: '体温のみ', isCorrect: false },
      { text: '尿量のみ', isCorrect: false }
    ]
  },
  {
    title: '装具療法',
    content: '膝装具（KO）の適応として最も適切なのはどれか。',
    difficulty: 'ADVANCED',
    level: 'EXPERT',
    explanation: '膝装具は靱帯損傷後の関節安定性確保、変形性膝関節症の除痛・機能改善に使用される。',
    options: [
      { text: '関節安定性の確保と機能改善', isCorrect: true },
      { text: '筋力の直接的増強', isCorrect: false },
      { text: '関節可動域の制限のみ', isCorrect: false },
      { text: '美容目的のみ', isCorrect: false }
    ]
  },
  {
    title: '心臓リハビリテーション',
    content: '心筋梗塞後の運動療法において使用される運動強度の指標として最も適切なのはどれか。',
    difficulty: 'ADVANCED',
    level: 'EXPERT',
    explanation: '心臓リハでは心拍予備能の40-60%または11-13のBorg scale、嫌気性代謝閾値を指標とする。',
    options: [
      { text: '心拍予備能の40-60%', isCorrect: true },
      { text: '最大心拍数の90%', isCorrect: false },
      { text: '安静時心拍数と同じ', isCorrect: false },
      { text: '年齢のみで決定', isCorrect: false }
    ]
  }
];

// 問題数を300問に拡張する関数
function expandRehabilitationQuestions() {
  const expandedQuestions = [...rehabilitationQuestions];
  
  // リハビリテーション医学の各分野
  const rehabFields = [
    '理学療法', '作業療法', '言語聴覚療法', '義肢装具', '車椅子・福祉用具',
    '摂食嚥下リハ', '高次脳機能リハ', 'スポーツリハ', '地域リハ', '予防リハ'
  ];
  
  const assessmentTools = [
    'FIM', 'Barthel Index', 'MMSE', 'HDS-R', 'MoCA', 'Berg Balance Scale',
    'Timed Up & Go Test', '6分間歩行テスト', '10m歩行テスト', 'SIAS'
  ];
  
  const conditions = [
    '脳卒中', '脊髄損傷', '切断', 'パーキンソン病', '運動失調', '筋ジストロフィー',
    '関節リウマチ', '骨折', '人工関節', '心疾患', '呼吸器疾患', 'がん'
  ];
  
  const interventions = [
    '運動療法', '物理療法', 'ADL練習', '歩行練習', 'バランス練習',
    '筋力増強練習', '持久力向上練習', '協調性練習', '認知練習', '嚥下練習'
  ];
  
  const rehabPhases = [
    '急性期リハ', '回復期リハ', '維持期リハ', '終末期リハ', '予防リハ'
  ];
  
  // リハビリテーション分野の問題
  rehabFields.forEach((field, idx) => {
    const difficulty = ['BASIC', 'INTERMEDIATE', 'ADVANCED'][idx % 3];
    const level = ['STUDENT', 'PT', 'EXPERT'][idx % 3];
    
    expandedQuestions.push({
      title: `${field}の目的`,
      content: `${field}の主要な目的として正しいものはどれか。`,
      difficulty,
      level,
      explanation: `${field}は患者の機能回復と生活の質向上を目指す重要な治療分野である。`,
      options: shuffle([
        { text: '機能回復と生活の質向上', isCorrect: true },
        { text: '完全治癒のみを目指す', isCorrect: false },
        { text: '症状の一時的抑制のみ', isCorrect: false },
        { text: '医療費削減のみ', isCorrect: false }
      ])
    });
    
    expandedQuestions.push({
      title: `${field}の適応`,
      content: `${field}の適応決定において最も重要な要素はどれか。`,
      difficulty,
      level,
      explanation: `適応決定には患者の状態、ニーズ、予後予測の総合的判断が必要である。`,
      options: shuffle([
        { text: '患者の状態と治療目標の適合性', isCorrect: true },
        { text: '年齢のみ', isCorrect: false },
        { text: '家族の希望のみ', isCorrect: false },
        { text: '保険適用の有無のみ', isCorrect: false }
      ])
    });
  });
  
  // 評価法・検査法の問題
  assessmentTools.forEach((tool, idx) => {
    const difficulty = ['INTERMEDIATE', 'ADVANCED'][idx % 2];
    const level = ['PT', 'EXPERT'][idx % 2];
    
    expandedQuestions.push({
      title: `${tool}の特徴`,
      content: `${tool}について正しい記述はどれか。`,
      difficulty,
      level,
      explanation: `${tool}は標準化された評価法として広く用いられ、信頼性と妥当性が確認されている。`,
      options: shuffle([
        { text: '標準化された信頼性の高い評価法', isCorrect: true },
        { text: '主観的な印象のみに基づく', isCorrect: false },
        { text: '実施に特別な資格は不要', isCorrect: false },
        { text: '結果の解釈は不要', isCorrect: false }
      ])
    });
  });
  
  // 疾患・病態別リハビリテーション
  conditions.forEach((condition, idx) => {
    const difficulty = ['INTERMEDIATE', 'ADVANCED'][idx % 2];
    const level = ['PT', 'EXPERT'][idx % 2];
    
    expandedQuestions.push({
      title: `${condition}のリハビリテーション`,
      content: `${condition}患者のリハビリテーションにおいて重要な考慮事項はどれか。`,
      difficulty,
      level,
      explanation: `${condition}の病態特性を理解したアプローチが治療成功の鍵となる。`,
      options: shuffle([
        { text: '病態特性に応じた個別化アプローチ', isCorrect: true },
        { text: '画一的な標準プログラム', isCorrect: false },
        { text: '症状の完全無視', isCorrect: false },
        { text: '家族の排除', isCorrect: false }
      ])
    });
    
    expandedQuestions.push({
      title: `${condition}の予後予測`,
      content: `${condition}患者の機能予後に影響する因子として最も重要なものはどれか。`,
      difficulty,
      level,
      explanation: `予後予測には年齢、重症度、開始時期、社会的支援など多因子が関与する。`,
      options: shuffle([
        { text: '重症度と治療開始時期', isCorrect: true },
        { text: '性別のみ', isCorrect: false },
        { text: '身長・体重のみ', isCorrect: false },
        { text: '出身地のみ', isCorrect: false }
      ])
    });
  });
  
  // 治療・介入法の問題
  interventions.forEach((intervention, idx) => {
    expandedQuestions.push({
      title: `${intervention}の原理`,
      content: `${intervention}の基本原理として正しいものはどれか。`,
      difficulty: 'INTERMEDIATE',
      level: 'PT',
      explanation: `${intervention}は科学的根拠に基づき、個々の患者に適した方法で実施する。`,
      options: shuffle([
        { text: '科学的根拠に基づく個別化された実施', isCorrect: true },
        { text: '経験と勘のみに依存', isCorrect: false },
        { text: '最大負荷での実施', isCorrect: false },
        { text: '痛みを我慢して継続', isCorrect: false }
      ])
    });
  });
  
  // リハビリテーション段階の問題
  rehabPhases.forEach((phase, idx) => {
    expandedQuestions.push({
      title: `${phase}の特徴`,
      content: `${phase}の特徴として最も適切なものはどれか。`,
      difficulty: 'INTERMEDIATE',
      level: 'PT',
      explanation: `各期には特有の目標と方法があり、患者の状態に応じた適切なアプローチが必要である。`,
      options: shuffle([
        { text: '病期に応じた特有の目標と方法', isCorrect: true },
        { text: 'すべての期で同一のアプローチ', isCorrect: false },
        { text: '医師の判断のみで実施', isCorrect: false },
        { text: '家族の希望のみを重視', isCorrect: false }
      ])
    });
  });
  
  // チーム医療・多職種連携の問題
  const teamMembers = [
    '医師', '理学療法士', '作業療法士', '言語聴覚士', '看護師',
    'ソーシャルワーカー', '管理栄養士', '薬剤師', '臨床心理士'
  ];
  
  teamMembers.forEach((member, idx) => {
    expandedQuestions.push({
      title: `チーム医療における${member}の役割`,
      content: `リハビリテーションチームにおける${member}の主要な役割はどれか。`,
      difficulty: 'BASIC',
      level: 'STUDENT',
      explanation: `チーム医療では各職種が専門性を活かして連携し、包括的なケアを提供する。`,
      options: shuffle([
        { text: '専門分野での患者支援と他職種連携', isCorrect: true },
        { text: '単独での治療完結', isCorrect: false },
        { text: '他職種の業務代行', isCorrect: false },
        { text: '連携の回避', isCorrect: false }
      ])
    });
  });
  
  // 福祉用具・補助具の問題
  const assistiveDevices = [
    '車椅子', '歩行器', '杖', '義手', '義足', '装具', 'スプリント',
    '自助具', '環境制御装置', 'コミュニケーション機器'
  ];
  
  assistiveDevices.forEach((device, idx) => {
    expandedQuestions.push({
      title: `${device}の適用`,
      content: `${device}の適用において最も重要な考慮事項はどれか。`,
      difficulty: 'INTERMEDIATE',
      level: 'PT',
      explanation: `福祉用具の選択には患者の身体機能、生活環境、使用目的の総合的評価が必要である。`,
      options: shuffle([
        { text: '患者の機能レベルと使用環境の適合', isCorrect: true },
        { text: '価格の安さのみ', isCorrect: false },
        { text: '見た目の良さのみ', isCorrect: false },
        { text: '最新技術の有無のみ', isCorrect: false }
      ])
    });
  });
  
  // 300問になるまで基本問題のバリエーションを追加
  while (expandedQuestions.length < 300) {
    const baseIdx = expandedQuestions.length % rehabilitationQuestions.length;
    const baseQuestion = rehabilitationQuestions[baseIdx];
    const variationNum = Math.floor(expandedQuestions.length / rehabilitationQuestions.length) + 1;
    
    expandedQuestions.push({
      title: `${baseQuestion.title}（応用${variationNum}）`,
      content: baseQuestion.content.replace(/正しいのはどれか。/, `について考察せよ。適切なものはどれか。`),
      difficulty: baseQuestion.difficulty,
      level: baseQuestion.level,
      explanation: `${baseQuestion.explanation}これは応用問題である。`,
      options: shuffle([...baseQuestion.options])
    });
  }
  
  return expandedQuestions.slice(0, 300);
}

async function main() {
  console.log('🏥 専門的なリハビリテーション問題データベース追加開始...');
  console.log('PT・OT・ST国家試験・リハビリテーション医学レベルの問題を300問追加します');

  try {
    // リハビリテーションカテゴリの取得または作成
    let rehabilitationCategory = await prisma.category.findUnique({
      where: { name: 'rehabilitation' }
    });

    if (!rehabilitationCategory) {
      rehabilitationCategory = await prisma.category.create({
        data: {
          name: 'rehabilitation',
          nameJa: 'リハビリテーション',
          description: '理学療法・作業療法に関する問題',
          icon: '🏥',
          color: '#2ecc71'
        }
      });
    }
    console.log('✅ リハビリテーションカテゴリ確認完了');

    // 既存のリハビリテーション問題を削除
    await prisma.option.deleteMany({
      where: {
        question: {
          categoryId: rehabilitationCategory.id
        }
      }
    });
    await prisma.question.deleteMany({
      where: {
        categoryId: rehabilitationCategory.id
      }
    });
    console.log('✅ 既存リハビリテーション問題削除完了');

    // リハビリテーション問題の生成と保存
    console.log('🏥 リハビリテーション問題作成中...');
    
    const questions = expandRehabilitationQuestions();

    for (let i = 0; i < questions.length; i++) {
      const questionData = questions[i];
      const { options, ...questionWithoutOptions } = questionData;

      // 選択肢をシャッフル
      const shuffledOptions = shuffle(options);

      const question = await prisma.question.create({
        data: {
          ...questionWithoutOptions,
          categoryId: rehabilitationCategory.id
        }
      });

      for (let j = 0; j < shuffledOptions.length; j++) {
        await prisma.option.create({
          data: {
            ...shuffledOptions[j],
            order: j + 1,
            questionId: question.id
          }
        });
      }

      if ((i + 1) % 50 === 0) {
        console.log(`  ${i + 1}/300問完了`);
      }
    }
    
    console.log('✅ リハビリテーション: 300問作成完了');

    // 統計表示
    console.log('\n📊 === 最終統計 ===');
    
    const categoryStats = await prisma.category.findMany({
      include: {
        _count: {
          select: { questions: true }
        }
      }
    });

    categoryStats.forEach(cat => {
      console.log(`${cat.nameJa}: ${cat._count.questions}問`);
    });

    const totalQuestions = await prisma.question.count();
    console.log(`\n✅ 全カテゴリ総問題数: ${totalQuestions}問`);
    console.log('🎉 専門的なリハビリテーション問題データベース追加完了！');
    
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });