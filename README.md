# The Wellness Leaders

理学療法士・アスレティックトレーナー向けの学習クイズアプリケーション

## 機能概要

### 📚 カテゴリ別学習
- **解剖学**: 人体の構造に関する問題
- **生理学**: 人体の機能に関する問題  
- **栄養学**: スポーツ栄養学に関する問題
- **バイオメカニクス**: 動作解析・力学に関する問題
- **病理学・外傷学**: 怪我や疾患に関する問題
- **リハビリテーション**: 治療・リハビリに関する問題

### 🎯 レベル別問題
- **学生レベル**: 基礎的な解剖学・生理学の知識
- **理学療法士レベル**: PT国家試験レベルの専門知識
- **アスレティックトレーナーレベル**: スポーツ現場での実践的な知識
- **エキスパートレベル**: 最新研究を含む高度な専門知識

### ⏰ ゲーム要素
- 時間制限（30秒/問）
- スコアシステム（正解 + 時間ボーナス）
- 即座のフィードバックと解説
- 進捗追跡とランキング

## 技術スタック

### フロントエンド
- **Next.js 14**: React フレームワーク
- **TypeScript**: 型安全性
- **Tailwind CSS**: スタイリング

### バックエンド
- **Node.js**: ランタイム
- **Express**: Webフレームワーク
- **Prisma**: ORM
- **PostgreSQL**: データベース

## セットアップ

### 1. 依存関係のインストール

```bash
# フロントエンド
cd medical-trainer-quiz
npm install

# バックエンド
cd backend
npm install
```

### 2. データベースのセットアップ

```bash
# PostgreSQLデータベースを作成
createdb medical_trainer_quiz

# .envファイルを編集してデータベースURLを設定
# DATABASE_URL="postgresql://username:password@localhost:5432/medical_trainer_quiz"

# Prismaでデータベースを初期化
cd backend
npm run db:generate
npm run db:push

# サンプルデータを挿入
npm run db:seed
```

### 3. アプリケーションの起動

```bash
# バックエンドサーバーを起動
cd backend
npm start

# フロントエンドを起動
cd ../
npm run dev
```

アプリケーションは以下のURLでアクセス可能です：
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:5000

## API エンドポイント

### カテゴリ
- `GET /api/categories` - 全カテゴリ取得

### 問題
- `GET /api/questions/:categoryId` - カテゴリ別問題取得
  - クエリパラメータ: `level`, `difficulty`, `limit`

### スコア
- `POST /api/score` - スコア記録

### ランキング
- `GET /api/leaderboard` - リーダーボード取得

## データベーススキーマ

主要なテーブル：
- `users` - ユーザー情報
- `categories` - 問題カテゴリ
- `questions` - 問題
- `options` - 選択肢
- `scores` - スコア記録
- `user_progress` - ユーザー進捗

## 開発・デバッグ

### ログの確認
```bash
# バックエンドログ
cd backend
npm run dev

# データベースの状態確認
npx prisma studio
```

### テストデータの追加
seed.jsファイルを編集して新しい問題を追加し、以下を実行：
```bash
npm run db:seed
```

## 今後の拡張予定

- [ ] ユーザー認証システム
- [ ] より詳細な進捗追跡
- [ ] 画像問題の対応
- [ ] モバイルアプリ版
- [ ] ソーシャル機能（友達とのスコア比較）
- [ ] 学習計画機能
- [ ] 問題の投稿機能

## ライセンス

MIT License