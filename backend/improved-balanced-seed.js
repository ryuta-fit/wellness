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

// 真のランダム化関数
function fisherYatesShuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 詳細な問題テンプレート
const comprehensiveQuestions = {
  anatomy: {
    basic: [
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
          { text: '上腕の外転、後方挙上、外旋', isCorrect: false },
          { text: '上腕の内転、前方挙上、内旋', isCorrect: true },
          { text: '前腕の屈曲、回内', isCorrect: false },
          { text: '肩甲骨の挙上、内転', isCorrect: false }
        ]
      },
      {
        title: '股関節の構造',
        content: '股関節の関節面として正しいものはどれですか？',
        explanation: '股関節は大腿骨頭と寛骨臼で構成される球関節です。',
        options: [
          { text: '大腿骨顆と脛骨高原', isCorrect: false },
          { text: '上腕骨頭と関節窩', isCorrect: false },
          { text: '大腿骨頭と寛骨臼', isCorrect: true },
          { text: '大腿骨頸部と腸骨', isCorrect: false }
        ]
      },
      {
        title: '僧帽筋の分類',
        content: '僧帽筋上部線維の主な作用はどれですか？',
        explanation: '僧帽筋上部線維は肩甲骨の挙上と上方回旋を行います。',
        options: [
          { text: '肩甲骨の下制と下方回旋', isCorrect: false },
          { text: '肩甲骨の内転', isCorrect: false },
          { text: '肩甲骨の外転', isCorrect: false },
          { text: '肩甲骨の挙上と上方回旋', isCorrect: true }
        ]
      },
      {
        title: '脊柱の弯曲',
        content: '正常な脊柱の生理的弯曲として正しいものはどれですか？',
        explanation: '脊柱は頸椎前弯、胸椎後弯、腰椎前弯、仙椎後弯の4つの生理的弯曲を持ちます。',
        options: [
          { text: '頸椎後弯、胸椎前弯、腰椎後弯', isCorrect: false },
          { text: '頸椎前弯、胸椎後弯、腰椎前弯', isCorrect: true },
          { text: '全て前弯', isCorrect: false },
          { text: '全て後弯', isCorrect: false }
        ]
      }
    ],
    intermediate: [
      {
        title: '大胸筋の神経支配',
        content: '大胸筋を支配する神経はどれですか？',
        explanation: '大胸筋は内側胸筋神経と外側胸筋神経によって支配されます。',
        options: [
          { text: '腋窩神経', isCorrect: false },
          { text: '内側胸筋神経と外側胸筋神経', isCorrect: true },
          { text: '肩甲上神経', isCorrect: false },
          { text: '長胸神経', isCorrect: false }
        ]
      },
      {
        title: '膝関節の靭帯',
        content: '前十字靭帯の主な機能はどれですか？',
        explanation: '前十字靭帯は大腿骨に対する脛骨の前方移動を制限し、膝関節の安定性を保ちます。',
        options: [
          { text: '脛骨の後方移動を制限', isCorrect: false },
          { text: '膝関節の外反を制限', isCorrect: false },
          { text: '脛骨の前方移動を制限', isCorrect: true },
          { text: '膝関節の内反を制限', isCorrect: false }
        ]
      },
      {
        title: '肩関節の安定性',
        content: '肩関節の動的安定化に最も関与する筋群はどれですか？',
        explanation: 'ローテーターカフ（回旋筋腱板）は肩関節の動的安定化に重要な役割を果たします。',
        options: [
          { text: '三角筋群', isCorrect: false },
          { text: 'ローテーターカフ', isCorrect: true },
          { text: '大胸筋群', isCorrect: false },
          { text: '広背筋群', isCorrect: false }
        ]
      }
    ],
    advanced: [
      {
        title: '腰神経叢の構成',
        content: '腰神経叢を構成する神経根として正しいものはどれですか？',
        explanation: '腰神経叢はL1-L4神経根から構成され、大腿神経や閉鎖神経などを分枝します。',
        options: [
          { text: 'L4-S3神経根', isCorrect: false },
          { text: 'T12-L2神経根', isCorrect: false },
          { text: 'L1-L4神経根', isCorrect: true },
          { text: 'L2-L5神経根', isCorrect: false }
        ]
      },
      {
        title: '筋紡錘の機能',
        content: '筋紡錘の主な機能として正しいものはどれですか？',
        explanation: '筋紡錘は筋の伸張を感知し、伸張反射を引き起こす固有受容器です。',
        options: [
          { text: '筋の張力を感知', isCorrect: false },
          { text: '筋の伸張を感知', isCorrect: true },
          { text: '関節の位置を感知', isCorrect: false },
          { text: '血流量を調節', isCorrect: false }
        ]
      }
    ]
  },
  physiology: {
    basic: [
      {
        title: '心拍出量の計算',
        content: '心拍出量を求める計算式として正しいものはどれですか？',
        explanation: '心拍出量 = 心拍数 × 1回拍出量で計算されます。',
        options: [
          { text: '心拍数 ÷ 1回拍出量', isCorrect: false },
          { text: '血圧 × 心拍数', isCorrect: false },
          { text: '心拍数 × 1回拍出量', isCorrect: true },
          { text: '肺活量 × 呼吸数', isCorrect: false }
        ]
      },
      {
        title: '呼吸の調節',
        content: '安静時の呼吸を主に調節している部位はどこですか？',
        explanation: '延髄の呼吸中枢が安静時の呼吸リズムを調節しています。',
        options: [
          { text: '小脳', isCorrect: false },
          { text: '延髄', isCorrect: true },
          { text: '大脳皮質', isCorrect: false },
          { text: '視床下部', isCorrect: false }
        ]
      }
    ],
    intermediate: [
      {
        title: '最大酸素摂取量',
        content: 'VO2maxについて正しい説明はどれですか？',
        explanation: 'VO2maxは単位時間あたりに体内に取り込まれる酸素の最大量で、有酸素能力の指標です。',
        options: [
          { text: '安静時の酸素消費量', isCorrect: false },
          { text: '単位時間あたりの最大酸素摂取量', isCorrect: true },
          { text: '運動後の過剰酸素消費量', isCorrect: false },
          { text: '血液中の酸素飽和度', isCorrect: false }
        ]
      },
      {
        title: '無酸素性閾値',
        content: '無酸素性閾値（AT）について正しい説明はどれですか？',
        explanation: 'ATは有酸素運動から無酸素運動に移行する境界点で、血中乳酸が急激に増加し始める点です。',
        options: [
          { text: '有酸素運動から無酸素運動への移行点', isCorrect: true },
          { text: '最大心拍数の50%の強度', isCorrect: false },
          { text: '運動開始直後の心拍数', isCorrect: false },
          { text: '最大酸素摂取量の20%', isCorrect: false }
        ]
      }
    ],
    advanced: [
      {
        title: '筋収縮のメカニズム',
        content: '筋収縮におけるカルシウムイオンの役割は何ですか？',
        explanation: 'カルシウムイオンはトロポニンに結合し、アクチンとミオシンの相互作用を可能にします。',
        options: [
          { text: 'ATPを直接分解する', isCorrect: false },
          { text: 'トロポニンに結合してアクチン・ミオシン結合を可能にする', isCorrect: true },
          { text: '神経伝達物質として働く', isCorrect: false },
          { text: '筋肉の弛緩を促進する', isCorrect: false }
        ]
      },
      {
        title: 'ホルモンの作用機序',
        content: 'インスリンの主な作用として正しいものはどれですか？',
        explanation: 'インスリンは血糖値を下げるホルモンで、グルコースの細胞取り込みを促進します。',
        options: [
          { text: '血糖値を上昇させる', isCorrect: false },
          { text: '脂肪分解を促進する', isCorrect: false },
          { text: 'グルコースの細胞取り込みを促進', isCorrect: true },
          { text: 'タンパク質分解を促進する', isCorrect: false }
        ]
      }
    ]
  },
  nutrition: {
    basic: [
      {
        title: 'タンパク質の推奨摂取量',
        content: '一般成人のタンパク質1日推奨摂取量（体重1kgあたり）はどれですか？',
        explanation: '一般成人は体重1kgあたり0.8-1.0g、アスリートは1.2-2.0gが推奨されます。',
        options: [
          { text: '0.3-0.5g', isCorrect: false },
          { text: '0.8-1.0g', isCorrect: true },
          { text: '2.0-3.0g', isCorrect: false },
          { text: '5.0-6.0g', isCorrect: false }
        ]
      },
      {
        title: '水分補給の基本',
        content: '運動中の適切な水分補給間隔として推奨されるのはどれですか？',
        explanation: '運動中は15-20分ごとに150-250mlの水分補給が推奨されます。',
        options: [
          { text: '60分ごとに500ml', isCorrect: false },
          { text: '15-20分ごとに150-250ml', isCorrect: true },
          { text: '喉が渇いた時のみ', isCorrect: false },
          { text: '運動後のみ', isCorrect: false }
        ]
      }
    ],
    intermediate: [
      {
        title: 'クレアチンの効果',
        content: 'クレアチンサプリメントの主な効果はどれですか？',
        explanation: 'クレアチンは短時間高強度運動でのATP再合成を促進し、パフォーマンス向上に寄与します。',
        options: [
          { text: '持久力の大幅な向上', isCorrect: false },
          { text: '短時間高強度運動のパフォーマンス向上', isCorrect: true },
          { text: '脂肪燃焼の促進', isCorrect: false },
          { text: '筋肉痛の軽減', isCorrect: false }
        ]
      },
      {
        title: 'グリコーゲンローディング',
        content: 'グリコーゲンローディングが最も効果的な競技はどれですか？',
        explanation: 'グリコーゲンローディングは90分以上の持久系競技で効果的です。',
        options: [
          { text: '100m走などの短距離走', isCorrect: false },
          { text: 'マラソンなど90分以上の持久系競技', isCorrect: true },
          { text: '重量挙げ', isCorrect: false },
          { text: '体操競技', isCorrect: false }
        ]
      }
    ],
    advanced: [
      {
        title: 'BCAA（分岐鎖アミノ酸）',
        content: 'BCAAに含まれるアミノ酸として正しい組み合わせはどれですか？',
        explanation: 'BCAAはバリン、ロイシン、イソロイシンの3つの分岐鎖アミノ酸です。',
        options: [
          { text: 'グルタミン、アルギニン、リジン', isCorrect: false },
          { text: 'バリン、ロイシン、イソロイシン', isCorrect: true },
          { text: 'フェニルアラニン、チロシン、トリプトファン', isCorrect: false },
          { text: 'メチオニン、システイン、セリン', isCorrect: false }
        ]
      },
      {
        title: 'ビタミンの機能',
        content: 'ビタミンB1（チアミン）の主な機能はどれですか？',
        explanation: 'ビタミンB1は糖質代謝に関与し、神経機能の維持に重要です。',
        options: [
          { text: '糖質代謝と神経機能の維持', isCorrect: true },
          { text: '骨の形成促進', isCorrect: false },
          { text: '血液凝固の促進', isCorrect: false },
          { text: '抗酸化作用', isCorrect: false }
        ]
      }
    ]
  },
  biomechanics: {
    basic: [
      {
        title: 'モーメントの定義',
        content: '力学におけるモーメントの定義として正しいものはどれですか？',
        explanation: 'モーメント = 力 × 距離（モーメントアーム）で計算されます。',
        options: [
          { text: '力 ÷ 距離', isCorrect: false },
          { text: '力 × 距離', isCorrect: true },
          { text: '質量 × 加速度', isCorrect: false },
          { text: '速度 × 時間', isCorrect: false }
        ]
      },
      {
        title: '重心の概念',
        content: '立位での人体重心の位置として最も適切なものはどれですか？',
        explanation: '立位での重心は約第2仙椎前方、身長の約55-57%の高さにあります。',
        options: [
          { text: '第12胸椎、身長の約70%', isCorrect: false },
          { text: '第2仙椎前方、身長の約55-57%', isCorrect: true },
          { text: '第5腰椎、身長の約40%', isCorrect: false },
          { text: '恥骨結合、身長の約30%', isCorrect: false }
        ]
      }
    ],
    intermediate: [
      {
        title: '地面反力の成分',
        content: '歩行時の地面反力の3つの成分として正しいものはどれですか？',
        explanation: '地面反力は垂直力、前後力、左右力の3成分に分解されます。',
        options: [
          { text: '上向き力、下向き力、横向き力', isCorrect: false },
          { text: '垂直力、前後力、左右力', isCorrect: true },
          { text: '推進力、制動力、回転力', isCorrect: false },
          { text: '圧縮力、引張力、せん断力', isCorrect: false }
        ]
      },
      {
        title: 'てこの原理',
        content: 'レバーアームが長くなると筋力への影響はどうなりますか？',
        explanation: 'レバーアームが長くなると、同じトルクを発生するのに必要な筋力は小さくなります。',
        options: [
          { text: '必要な筋力が大きくなる', isCorrect: false },
          { text: '必要な筋力が小さくなる', isCorrect: true },
          { text: '必要な筋力は変わらない', isCorrect: false },
          { text: '筋力は関係ない', isCorrect: false }
        ]
      }
    ],
    advanced: [
      {
        title: '慣性モーメント',
        content: '慣性モーメントを小さくするための方法として正しいものはどれですか？',
        explanation: '質量を回転軸に近づけることで慣性モーメントを小さくできます。',
        options: [
          { text: '質量を回転軸から遠ざける', isCorrect: false },
          { text: '質量を増やす', isCorrect: false },
          { text: '質量を回転軸に近づける', isCorrect: true },
          { text: '回転速度を上げる', isCorrect: false }
        ]
      },
      {
        title: '運動学的連鎖',
        content: 'クローズドキネティックチェーンの特徴として正しいものはどれですか？',
        explanation: 'クローズドキネティックチェーンでは末端が固定され、より機能的な動作パターンを含みます。',
        options: [
          { text: '末端が自由に動く', isCorrect: false },
          { text: '末端が固定され機能的動作を含む', isCorrect: true },
          { text: '単一関節のみの運動', isCorrect: false },
          { text: '等速性運動のみ', isCorrect: false }
        ]
      }
    ]
  },
  pathology: {
    basic: [
      {
        title: 'RICE処置',
        content: '急性外傷に対するRICE処置の構成要素として正しいものはどれですか？',
        explanation: 'RICEはRest（安静）、Ice（冷却）、Compression（圧迫）、Elevation（挙上）です。',
        options: [
          { text: 'Rehab, Ice, Care, Exercise', isCorrect: false },
          { text: 'Rest, Ice, Compression, Elevation', isCorrect: true },
          { text: 'Rest, Immobilization, Cold, Education', isCorrect: false },
          { text: 'Recovery, Ice, Compression, Evaluation', isCorrect: false }
        ]
      },
      {
        title: '炎症の5徴候',
        content: '炎症の5徴候に含まれないものはどれですか？',
        explanation: '炎症の5徴候は発赤、腫脹、熱感、疼痛、機能障害です。',
        options: [
          { text: '発赤', isCorrect: false },
          { text: '筋力低下', isCorrect: true },
          { text: '腫脹', isCorrect: false },
          { text: '疼痛', isCorrect: false }
        ]
      }
    ],
    intermediate: [
      {
        title: '前十字靭帯損傷のテスト',
        content: '前十字靭帯損傷を評価するテストとして最も適切なものはどれですか？',
        explanation: 'ラックマンテストは前十字靭帯損傷の評価に最も感度の高いテストです。',
        options: [
          { text: 'マクマレーテスト', isCorrect: false },
          { text: 'ラックマンテスト', isCorrect: true },
          { text: 'アプリーテスト', isCorrect: false },
          { text: 'トンプソンテスト', isCorrect: false }
        ]
      },
      {
        title: '肉離れの分類',
        content: '筋肉の肉離れ（筋挫傷）の重症度分類で最も重篤なものはどれですか？',
        explanation: 'Grade 3は筋線維の完全断裂で最も重篤な肉離れです。',
        options: [
          { text: 'Grade 1（軽度の線維損傷）', isCorrect: false },
          { text: 'Grade 2（部分断裂）', isCorrect: false },
          { text: 'Grade 3（完全断裂）', isCorrect: true },
          { text: 'Grade 0（損傷なし）', isCorrect: false }
        ]
      }
    ],
    advanced: [
      {
        title: '骨折の治癒過程',
        content: '骨折治癒の正しい順序はどれですか？',
        explanation: '骨折治癒は炎症期→軟性仮骨形成期→硬性仮骨形成期→リモデリング期の順で進行します。',
        options: [
          { text: '軟性仮骨→炎症期→硬性仮骨→リモデリング', isCorrect: false },
          { text: '炎症期→軟性仮骨→硬性仮骨→リモデリング', isCorrect: true },
          { text: 'リモデリング→炎症期→仮骨形成', isCorrect: false },
          { text: '硬性仮骨→軟性仮骨→炎症期', isCorrect: false }
        ]
      },
      {
        title: '疼痛の分類',
        content: '神経障害性疼痛の特徴として正しいものはどれですか？',
        explanation: '神経障害性疼痛は神経系の損傷や機能異常により生じる慢性疼痛です。',
        options: [
          { text: '組織損傷に直接関連する疼痛', isCorrect: false },
          { text: '神経系の損傷や機能異常による疼痛', isCorrect: true },
          { text: '炎症反応による急性疼痛', isCorrect: false },
          { text: '筋肉の過度な収縮による疼痛', isCorrect: false }
        ]
      }
    ]
  },
  rehabilitation: {
    basic: [
      {
        title: 'ROM訓練の種類',
        content: '関節可動域訓練の分類で、患者が自力で行うものはどれですか？',
        explanation: 'Active ROM（自動運動）は患者が自分の筋力で関節を動かす訓練です。',
        options: [
          { text: 'Passive ROM（他動運動）', isCorrect: false },
          { text: 'Active ROM（自動運動）', isCorrect: true },
          { text: 'Resistive ROM（抵抗運動）', isCorrect: false },
          { text: 'Static ROM（静的運動）', isCorrect: false }
        ]
      },
      {
        title: '温熱療法の効果',
        content: '温熱療法の生理学的効果として正しいものはどれですか？',
        explanation: '温熱療法は血管拡張による血流増加、筋弛緩、疼痛軽減をもたらします。',
        options: [
          { text: '血管収縮と血流減少', isCorrect: false },
          { text: '血管拡張と血流増加', isCorrect: true },
          { text: '筋緊張の増加', isCorrect: false },
          { text: '炎症の促進', isCorrect: false }
        ]
      }
    ],
    intermediate: [
      {
        title: 'PNFストレッチング',
        content: 'PNF（固有受容性神経筋促通法）の基本原理はどれですか？',
        explanation: 'PNFは筋の収縮-弛緩を利用して可動域を改善する技術です。',
        options: [
          { text: '持続的な静的ストレッチング', isCorrect: false },
          { text: '筋の収縮-弛緩を利用した可動域改善', isCorrect: true },
          { text: '関節の他動的な動かし方', isCorrect: false },
          { text: '温熱療法との組み合わせ', isCorrect: false }
        ]
      },
      {
        title: '筋力訓練の原理',
        content: '筋力向上を目的とした訓練で適切な負荷強度はどれですか？',
        explanation: '筋力向上には1RMの80-90%程度の高負荷で低回数の訓練が効果的です。',
        options: [
          { text: '1RMの40-50%で高回数', isCorrect: false },
          { text: '1RMの80-90%で低回数', isCorrect: true },
          { text: '1RMの100%で1回のみ', isCorrect: false },
          { text: '1RMの20-30%で高回数', isCorrect: false }
        ]
      }
    ],
    advanced: [
      {
        title: 'バランス訓練の段階',
        content: 'バランス訓練の段階的プログレッションとして正しい順序はどれですか？',
        explanation: '静的バランス→動的バランス→機能的バランス→スポーツ特異的バランスの順で進行します。',
        options: [
          { text: '動的→静的→機能的→スポーツ特異的', isCorrect: false },
          { text: 'スポーツ特異的→静的→動的→機能的', isCorrect: false },
          { text: '静的→動的→機能的→スポーツ特異的', isCorrect: true },
          { text: '機能的→動的→静的→スポーツ特異的', isCorrect: false }
        ]
      },
      {
        title: '運動学習の段階',
        content: '運動学習の3段階における最終段階はどれですか？',
        explanation: '運動学習は認知段階→連合段階→自動化段階の3段階で進行します。',
        options: [
          { text: '認知段階', isCorrect: false },
          { text: '連合段階', isCorrect: false },
          { text: '自動化段階', isCorrect: true },
          { text: '習慣化段階', isCorrect: false }
        ]
      }
    ]
  }
};

// 各難易度別に100問を作成する関数
function generateDiverseQuestions(categoryName, questionsByDifficulty) {
  const questions = [];
  const difficulties = ['basic', 'intermediate', 'advanced'];
  const difficultyMap = {
    'basic': { difficulty: 'BASIC', level: 'STUDENT' },
    'intermediate': { difficulty: 'INTERMEDIATE', level: 'PT' },
    'advanced': { difficulty: 'ADVANCED', level: 'EXPERT' }
  };

  difficulties.forEach(diffKey => {
    const baseQuestions = questionsByDifficulty[diffKey] || [];
    const diffConfig = difficultyMap[diffKey];
    
    if (baseQuestions.length === 0) return;

    // 各難易度で100問作成
    for (let i = 0; i < 100; i++) {
      const baseIndex = i % baseQuestions.length;
      const baseQuestion = baseQuestions[baseIndex];
      const variationNum = Math.floor(i / baseQuestions.length) + 1;
      
      // 選択肢をランダムにシャッフル
      const shuffledOptions = fisherYatesShuffle(baseQuestion.options);
      
      // バリエーションのある問題文を作成
      const variations = [
        baseQuestion.content,
        baseQuestion.content.replace('正しいものはどれですか？', '適切なものを選んでください。'),
        baseQuestion.content.replace('どれですか？', 'どれでしょうか？'),
        baseQuestion.content.replace('として', 'について'),
        `${baseQuestion.content.replace('どれですか？', '')}どれが正しいでしょうか？`
      ];
      
      const titleVariations = [
        baseQuestion.title,
        `${baseQuestion.title}について`,
        `${baseQuestion.title}の特徴`,
        `${baseQuestion.title}に関して`,
        `${baseQuestion.title}の理解`
      ];
      
      const selectedTitle = variationNum === 1 ? baseQuestion.title : 
        `${titleVariations[variationNum % titleVariations.length]} (第${variationNum}問)`;
      const selectedContent = variations[variationNum % variations.length];
      
      questions.push({
        title: selectedTitle,
        content: selectedContent,
        difficulty: diffConfig.difficulty,
        level: diffConfig.level,
        explanation: baseQuestion.explanation,
        options: shuffledOptions.map((opt, idx) => ({
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
  console.log('改良版問題データベース作成開始...');
  console.log('各難易度100問ずつ、真のランダム化で作成します');

  try {
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
    for (const [categoryName, questionsByDifficulty] of Object.entries(comprehensiveQuestions)) {
      console.log(`${categoryName}の多様な問題作成中...`);
      
      const category = await prisma.category.findUnique({
        where: { name: categoryName }
      });

      if (!category) {
        console.error(`カテゴリ ${categoryName} が見つかりません`);
        continue;
      }

      const questions = generateDiverseQuestions(categoryName, questionsByDifficulty);

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

    // 統計を表示
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

    // 正解選択肢の分散チェック
    console.log('\n=== 正解選択肢の分散チェック ===');
    for (let position = 1; position <= 4; position++) {
      const correctCount = await prisma.option.count({
        where: {
          isCorrect: true,
          order: position
        }
      });
      console.log(`選択肢${String.fromCharCode(64 + position)}が正解: ${correctCount}問`);
    }

    const totalQuestions = await prisma.question.count();
    console.log(`\n総問題数: ${totalQuestions}問`);
    console.log('改良版問題データベース作成完了！');
    
  } catch (error) {
    console.error('エラーが発生しました:', error);
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