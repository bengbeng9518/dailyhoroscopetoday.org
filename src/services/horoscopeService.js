import { ZODIAC_SIGNS } from '../utils/constants';

// 运势模板数据
const horoscopeTemplates = {
  positive: {
    en: [
      "Today brings excellent opportunities for growth and success.",
      "The stars align favorably for your endeavors today.",
      "Positive energy surrounds you, making this a great day for new beginnings.",
      "Your natural charisma shines bright today, attracting good fortune.",
      "Today is perfect for pursuing your dreams and ambitions."
    ],
    zh: [
      "今天为成长和成功带来绝佳机会。",
      "星象今日对你的事业非常有利。",
      "正能量环绕着你，今天是新开始的好日子。",
      "你的天然魅力今日闪闪发光，吸引好运。",
      "今天是追求梦想和抱负的完美时机。"
    ]
  },
  neutral: {
    en: [
      "Today calls for balance and careful consideration in your decisions.",
      "A steady approach will serve you well in today's activities.",
      "Focus on maintaining harmony in your relationships today.",
      "Today is a good day for reflection and planning ahead.",
      "Keep an open mind to new possibilities that may arise."
    ],
    zh: [
      "今天需要在决策中保持平衡和谨慎考虑。",
      "稳健的方法将在今天的活动中为你服务。",
      "今天专注于维持人际关系的和谐。",
      "今天是反思和提前规划的好日子。",
      "对可能出现的新机会保持开放的心态。"
    ]
  },
  challenging: {
    en: [
      "Today may present some challenges, but they will lead to growth.",
      "Patience and perseverance will be your allies today.",
      "Use today's obstacles as stepping stones to success.",
      "Stay positive despite any temporary setbacks you may face.",
      "Today tests your resilience, but you have the strength to overcome."
    ],
    zh: [
      "今天可能会遇到一些挑战，但它们将带来成长。",
      "耐心和毅力将是你今天的盟友。",
      "将今天的障碍作为成功的垫脚石。",
      "尽管可能面临暂时的挫折，也要保持积极。",
      "今天考验你的韧性，但你有克服的力量。"
    ]
  }
};

const adviceTemplates = {
  en: [
    "Trust your intuition when making important decisions.",
    "Take time for self-care and relaxation today.",
    "Communicate openly with those close to you.",
    "Focus on your long-term goals and take small steps forward.",
    "Embrace change as an opportunity for growth.",
    "Practice gratitude for the positive things in your life.",
    "Stay organized and prioritize your tasks effectively.",
    "Be open to learning something new today."
  ],
  zh: [
    "在做重要决定时相信你的直觉。",
    "今天花时间进行自我护理和放松。",
    "与亲近的人开诚布公地交流。",
    "专注于长期目标，迈出小步前进。",
    "将变化视为成长的机会。",
    "对生活中的积极事物心怀感激。",
    "保持有序，有效地安排任务优先级。",
    "今天要乐于学习新事物。"
  ]
};

const luckyColors = {
  en: ['Blue', 'Purple', 'Gold', 'Silver', 'Green', 'Red', 'Orange', 'Pink'],
  zh: ['蓝色', '紫色', '金色', '银色', '绿色', '红色', '橙色', '粉色']
};

// 生成单个星座运势
export const generateHoroscope = async (zodiacSign, date = new Date(), language = 'en') => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const seed = `${zodiacSign}-${date.toDateString()}`;
  const random = (max, min = 0) => {
    const hash = seed.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash) % (max - min + 1) + min;
  };

  const overall = random(5, 1);
  const love = random(5, 1);
  const career = random(5, 1);
  const money = random(5, 1);
  const health = random(5, 1);
  
  const moodType = overall >= 4 ? 'positive' : overall >= 3 ? 'neutral' : 'challenging';
  const templates = horoscopeTemplates[moodType][language] || horoscopeTemplates[moodType]['en'];
  const advices = adviceTemplates[language] || adviceTemplates['en'];
  const colors = luckyColors[language] || luckyColors['en'];
  
  return {
    zodiacSign,
    date: date.toISOString().split('T')[0],
    overall,
    love,
    career,
    money,
    health,
    description: templates[random(templates.length - 1)],
    advice: advices[random(advices.length - 1)],
    luckyNumber: random(99, 1),
    luckyColor: colors[random(colors.length - 1)],
    luckyDirection: ['North', 'South', 'East', 'West', 'Northeast', 'Northwest', 'Southeast', 'Southwest'][random(7)]
  };
};

// 生成所有星座的每日运势
export const generateDailyHoroscopes = async (date = new Date(), language = 'en') => {
  const horoscopes = {};
  
  for (const sign of Object.keys(ZODIAC_SIGNS)) {
    horoscopes[sign] = await generateHoroscope(sign, date, language);
  }
  
  return horoscopes;
};