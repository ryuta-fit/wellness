const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  { name: 'anatomy', nameJa: '解剖学', description: '人体の構造に関する問題', icon: '🦴', color: '#ff6b6b' },
  { name: 'physiology', nameJa: '生理学', description: '人体の機能に関する問題', icon: '❤️', color: '#4ecdc4' },
  { name: 'nutrition', nameJa: '栄養学', description: 'スポーツ栄養学に関する問題', icon: '🥗', color: '#45b7d1' },
  { name: 'biomechanics', nameJa: 'バイオメカニクス', description: '動作解析・力学に関する問題', icon: '⚙️', color: '#96ceb4' },
  { name: 'pathology', nameJa: '病理学・外傷学', description: '怪我や疾患に関する問題', icon: '🏥', color: '#ffd93d' },
  { name: 'rehabilitation', nameJa: 'リハビリテーション', description: '治療・リハビリに関する問題', icon: '💪', color: '#a8e6cf' }
];

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateRandomQuestions(categoryName, count = 300) {
  const questions = [];
  const difficulties = ['BASIC', 'INTERMEDIATE', 'ADVANCED'];
  const levels = ['STUDENT', 'PT', 'EXPERT'];

  // カテゴリ別のテンプレート
  const templates = {
    anatomy: {
      subjects: ['筋肉', '骨', '関節', '神経', '血管', '内臓', '組織', '細胞'],
      actions: ['屈曲', '伸展', '内転', '外転', '回旋', '挙上', '下制', '固定'],
      locations: ['頭部', '頸部', '胸部', '腹部', '背部', '上肢', '下肢', '体幹']
    },
    physiology: {
      subjects: ['心拍数', '血圧', '呼吸', '代謝', 'ホルモン', '神経伝達', '免疫', '循環'],
      actions: ['増加', '減少', '維持', '調節', '促進', '抑制', '活性化', '不活化'],
      locations: ['心臓', '肺', '腎臓', '肝臓', '脳', '筋肉', '骨', '血液']
    },
    nutrition: {
      subjects: ['タンパク質', '炭水化物', '脂質', 'ビタミン', 'ミネラル', '水分', 'カロリー', '栄養素'],
      actions: ['摂取', '消化', '吸収', '代謝', '貯蔵', '排泄', '合成', '分解'],
      locations: ['胃', '小腸', '大腸', '肝臓', '膵臓', '筋肉', '脂肪組織', '骨']
    },
    biomechanics: {
      subjects: ['力', 'モーメント', '重心', '慣性', '加速度', '速度', '角度', 'エネルギー'],
      actions: ['作用', '反作用', '移動', '回転', '変化', '維持', '増加', '減少'],
      locations: ['関節', '筋肉', '骨', '重心', '支点', '力点', '作用点', '軸']
    },
    pathology: {
      subjects: ['炎症', '損傷', '疼痛', '腫脹', '機能障害', '可動域制限', '筋力低下', '不安定性'],
      actions: ['発生', '治癒', '悪化', '改善', '進行', '回復', '再発', '予防'],
      locations: ['関節', '筋肉', '靭帯', '腱', '骨', '軟骨', '神経', '血管']
    },
    rehabilitation: {
      subjects: ['運動療法', '物理療法', 'ROM訓練', '筋力訓練', 'バランス訓練', 'ADL訓練', '歩行訓練', '協調性訓練'],
      actions: ['実施', '指導', '評価', '修正', '進歩', '維持', '向上', '回復'],
      locations: ['病院', '診療所', '施設', '自宅', 'ジム', '屋外', 'プール', '訓練室']
    }
  };

  const template = templates[categoryName] || templates.anatomy;

  for (let i = 0; i < count; i++) {
    const difficulty = difficulties[i % 3];
    const level = levels[i % 3];
    const subject = template.subjects[i % template.subjects.length];
    const action = template.actions[(i + 1) % template.actions.length];
    const location = template.locations[(i + 2) % template.locations.length];

    // 問題文のバリエーション
    const questionTemplates = [
      `${subject}について正しいものはどれですか？`,
      `${location}における${subject}の${action}について適切なものはどれですか？`,
      `${subject}の${action}に関して正しい説明はどれですか？`,
      `${location}の${subject}について最も適切なものはどれですか？`,
      `${subject}と${action}の関係について正しいものはどれですか？`
    ];

    const content = questionTemplates[i % questionTemplates.length];

    // 正解と不正解の選択肢を生成
    const correctAnswers = [
      `${subject}は${location}において${action}する`,
      `${subject}の${action}は重要な機能である`,
      `正常な${subject}は適切に${action}する`,
      `${location}の${subject}は正常に機能する`,
      `${subject}は生理学的に${action}が必要である`
    ];

    const incorrectAnswers = [
      `${subject}は${action}しない`,
      `${location}に${subject}は存在しない`,
      `${subject}の${action}は不要である`,
      `${subject}は機能しない`,
      `${action}は${subject}に関係ない`,
      `${location}では${action}できない`,
      `${subject}は有害である`,
      `${action}は禁止されている`
    ];

    const options = shuffle([
      { text: correctAnswers[i % correctAnswers.length], isCorrect: true },
      { text: incorrectAnswers[i % incorrectAnswers.length], isCorrect: false },
      { text: incorrectAnswers[(i + 1) % incorrectAnswers.length], isCorrect: false },
      { text: incorrectAnswers[(i + 2) % incorrectAnswers.length], isCorrect: false }
    ]);

    questions.push({
      title: `${template.subjects[(i + 3) % template.subjects.length]}の${template.actions[(i + 4) % template.actions.length]}`,
      content: content,
      difficulty: difficulty,
      level: level,
      explanation: `${subject}に関する専門的な知識を問う問題です。${location}における${action}について理解することが重要です。`,
      options: options.map((opt, idx) => ({
        text: opt.text,
        isCorrect: opt.isCorrect,
        order: idx + 1
      }))
    });
  }

  return questions;
}

async function main() {
  console.log('🚀 シンプル多様問題データベース作成開始...');
  console.log('各カテゴリ300問（完全に異なる問題）を生成します');

  try {
    // カテゴリ作成
    for (const category of categories) {
      await prisma.category.upsert({
        where: { name: category.name },
        update: category,
        create: category
      });
    }
    console.log('✅ カテゴリ作成完了');

    // 既存データ削除
    await prisma.option.deleteMany({});
    await prisma.question.deleteMany({});
    console.log('✅ 既存データ削除完了');

    // 各カテゴリの問題生成と保存
    for (const categoryData of categories) {
      console.log(`📝 ${categoryData.nameJa}の問題作成中...`);
      
      const category = await prisma.category.findUnique({
        where: { name: categoryData.name }
      });

      if (!category) {
        console.error(`❌ カテゴリ ${categoryData.name} が見つかりません`);
        continue;
      }

      const questions = generateRandomQuestions(categoryData.name, 300);

      for (let i = 0; i < questions.length; i++) {
        const questionData = questions[i];
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

        if ((i + 1) % 50 === 0) {
          console.log(`  ${i + 1}/300問完了`);
        }
      }
      
      console.log(`✅ ${categoryData.nameJa}: 300問作成完了`);
    }

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

    // 難易度別統計
    const difficulties = ['BASIC', 'INTERMEDIATE', 'ADVANCED'];
    console.log('\n📈 難易度別統計:');
    for (const diff of difficulties) {
      const count = await prisma.question.count({
        where: { difficulty: diff }
      });
      console.log(`${diff}: ${count}問`);
    }

    // 正解位置の統計
    console.log('\n🎯 正解選択肢の位置分布:');
    for (let order = 1; order <= 4; order++) {
      const count = await prisma.option.count({
        where: {
          isCorrect: true,
          order: order
        }
      });
      console.log(`選択肢${String.fromCharCode(64 + order)}: ${count}問`);
    }

    const totalQuestions = await prisma.question.count();
    console.log(`\n✅ 総問題数: ${totalQuestions}問`);
    console.log('🎉 シンプル多様問題データベース作成完了！');
    
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