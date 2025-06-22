const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'The Wellness Leaders API is running' });
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { questions: true }
        }
      }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/questions/:categoryIdentifier', async (req, res) => {
  try {
    const { categoryIdentifier } = req.params;
    const { level, difficulty, limit = 10, excludeIds } = req.query;
    
    // カテゴリIDまたは名前からカテゴリを取得
    const category = await prisma.category.findFirst({
      where: {
        OR: [
          { id: categoryIdentifier },
          { name: categoryIdentifier }
        ]
      }
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    const where = { categoryId: category.id };
    if (level) where.level = level.toUpperCase();
    if (difficulty) where.difficulty = difficulty.toUpperCase();
    
    // 除外する問題IDがある場合は除外
    if (excludeIds) {
      const excludeList = excludeIds.split(',').filter(id => id.trim());
      if (excludeList.length > 0) {
        where.id = {
          notIn: excludeList
        };
      }
    }
    
    // まず条件に合う問題の総数を取得
    const totalCount = await prisma.question.count({ where });
    
    if (totalCount === 0) {
      return res.json([]);
    }
    
    // ランダムに問題を選択するために、全問題IDを取得
    const allQuestions = await prisma.question.findMany({
      where,
      select: { id: true }
    });
    
    // Fisher-Yates シャッフルでより真のランダム選択
    function fisherYatesShuffle(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    const shuffled = fisherYatesShuffle(allQuestions);
    const selectedIds = shuffled.slice(0, Math.min(parseInt(limit), totalCount));
    
    // 選択された問題の詳細を取得
    const questions = await prisma.question.findMany({
      where: {
        id: {
          in: selectedIds.map(q => q.id)
        }
      },
      include: {
        options: {
          orderBy: { order: 'asc' }
        },
        category: true
      }
    });
    
    // 問題の順序も Fisher-Yates でランダム化
    const randomizedQuestions = fisherYatesShuffle(questions);
    
    res.json(randomizedQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/score', async (req, res) => {
  try {
    const { userId, questionId, score, maxScore, timeSpent, isCorrect } = req.body;
    
    const newScore = await prisma.score.create({
      data: {
        userId,
        questionId,
        score,
        maxScore,
        timeSpent,
        isCorrect
      }
    });
    
    await prisma.userProgress.upsert({
      where: { userId },
      update: {
        totalQuestions: { increment: 1 },
        correctAnswers: { increment: isCorrect ? 1 : 0 },
        totalScore: { increment: score },
        lastStudyDate: new Date(),
        streak: isCorrect ? { increment: 1 } : 0
      },
      create: {
        userId,
        totalQuestions: 1,
        correctAnswers: isCorrect ? 1 : 0,
        totalScore: score,
        lastStudyDate: new Date(),
        streak: isCorrect ? 1 : 0
      }
    });
    
    res.json(newScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const { category, level } = req.query;
    
    const leaderboard = await prisma.userProgress.findMany({
      include: {
        user: {
          select: { name: true, role: true }
        }
      },
      orderBy: [
        { totalScore: 'desc' },
        { correctAnswers: 'desc' }
      ],
      take: 50
    });
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});