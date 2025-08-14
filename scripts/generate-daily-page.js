const fs = require('fs');
const path = require('path');

// 星座数据
const zodiacSigns = [
  { id: 'aries', name: { en: 'Aries', zh: '白羊座' }, emoji: '♈' },
  { id: 'taurus', name: { en: 'Taurus', zh: '金牛座' }, emoji: '♉' },
  { id: 'gemini', name: { en: 'Gemini', zh: '双子座' }, emoji: '♊' },
  { id: 'cancer', name: { en: 'Cancer', zh: '巨蟹座' }, emoji: '♋' },
  { id: 'leo', name: { en: 'Leo', zh: '狮子座' }, emoji: '♌' },
  { id: 'virgo', name: { en: 'Virgo', zh: '处女座' }, emoji: '♍' },
  { id: 'libra', name: { en: 'Libra', zh: '天秤座' }, emoji: '♎' },
  { id: 'scorpio', name: { en: 'Scorpio', zh: '天蝎座' }, emoji: '♏' },
  { id: 'sagittarius', name: { en: 'Sagittarius', zh: '射手座' }, emoji: '♐' },
  { id: 'capricorn', name: { en: 'Capricorn', zh: '摩羯座' }, emoji: '♑' },
  { id: 'aquarius', name: { en: 'Aquarius', zh: '水瓶座' }, emoji: '♒' },
  { id: 'pisces', name: { en: 'Pisces', zh: '双鱼座' }, emoji: '♓' }
];

// 运势描述模板
const fortuneTemplates = {
  en: {
    excellent: [
      "Today brings exceptional opportunities and positive energy.",
      "A day filled with success and wonderful surprises awaits.",
      "Your stars are perfectly aligned for achievement and joy."
    ],
    good: [
      "A favorable day with good prospects ahead.",
      "Positive developments are on the horizon.",
      "Today offers steady progress and satisfaction."
    ],
    average: [
      "A balanced day with mixed opportunities.",
      "Steady energy with moderate progress expected.",
      "A day for patience and careful planning."
    ],
    challenging: [
      "Some obstacles may arise, but perseverance will pay off.",
      "A day to stay focused and avoid hasty decisions.",
      "Challenges present opportunities for growth."
    ]
  },
  zh: {
    excellent: [
      "今天将带来非凡的机遇和正能量。",
      "充满成功和美好惊喜的一天等待着你。",
      "你的星象完美对齐，预示着成就和喜悦。"
    ],
    good: [
      "有利的一天，前景良好。",
      "积极的发展即将到来。",
      "今天提供稳定的进步和满足感。"
    ],
    average: [
      "平衡的一天，机遇参半。",
      "稳定的能量，预期适度进步。",
      "需要耐心和仔细规划的一天。"
    ],
    challenging: [
      "可能会遇到一些障碍，但坚持会有回报。",
      "需要保持专注，避免匆忙决定的一天。",
      "挑战带来成长的机会。"
    ]
  }
};

// 生成随机运势等级
function generateFortuneLevel() {
  const levels = ['excellent', 'good', 'average', 'challenging'];
  const weights = [0.2, 0.4, 0.3, 0.1]; // 权重分布
  const random = Math.random();
  let cumulative = 0;
  
  for (let i = 0; i < levels.length; i++) {
    cumulative += weights[i];
    if (random <= cumulative) {
      return levels[i];
    }
  }
  return 'average';
}

// 生成运势描述
function generateDescription(sign, language, level) {
  const templates = fortuneTemplates[language][level];
  return templates[Math.floor(Math.random() * templates.length)];
}

// 生成排行榜数据
function generateRankings() {
  const rankings = zodiacSigns.map(sign => {
    const level = generateFortuneLevel();
    const score = {
      excellent: Math.floor(Math.random() * 10) + 90,
      good: Math.floor(Math.random() * 15) + 75,
      average: Math.floor(Math.random() * 20) + 50,
      challenging: Math.floor(Math.random() * 20) + 30
    }[level];
    
    return {
      ...sign,
      level,
      score,
      rank: 0 // 将在排序后设置
    };
  });
  
  // 按分数排序并设置排名
  rankings.sort((a, b) => b.score - a.score);
  rankings.forEach((item, index) => {
    item.rank = index + 1;
  });
  
  return rankings;
}

// 格式化日期
function formatDate(date, language) {
  if (language === 'zh') {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// 生成每日数据
function generateDailyData(date) {
  const rankings = generateRankings();
  const dateStr = date.toISOString().split('T')[0];
  
  return {
    date: dateStr,
    timestamp: date.getTime(),
    en: {
      title: `${formatDate(date, 'en')} Daily Horoscope Today - Zodiac Rankings`,
      description: `Today's horoscope rankings for ${formatDate(date, 'en')}. Discover which zodiac signs will have the best luck today!`,
      keywords: `${dateStr} Daily Horoscope Today, zodiac rankings, astrology forecast, horoscope ${date.getFullYear()}`,
      rankings: rankings.map(item => ({
        ...item,
        description: generateDescription(item, 'en', item.level)
      }))
    },
    zh: {
      title: `${formatDate(date, 'zh')}每日星座运势 - 今日运势排行榜`,
      description: `${formatDate(date, 'zh')}今日星座运势排行榜，看看哪个星座今天运气最好！`,
      keywords: `${dateStr}每日星座运势，星座排行榜，占星预测，${date.getFullYear()}年运势`,
      rankings: rankings.map(item => ({
        ...item,
        description: generateDescription(item, 'zh', item.level)
      }))
    }
  };
}

// 主函数
function main() {
  const today = new Date();
  const dailyData = generateDailyData(today);
  
  // 确保目录存在
  const dataDir = path.join(__dirname, '..', 'public', 'data', 'daily');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // 保存数据
  const fileName = `${dailyData.date}.json`;
  const filePath = path.join(dataDir, fileName);
  
  fs.writeFileSync(filePath, JSON.stringify(dailyData, null, 2));
  
  console.log(`Generated daily horoscope data for ${dailyData.date}`);
  console.log(`File saved to: ${filePath}`);
  
  // 更新最新数据索引
  const indexPath = path.join(dataDir, 'latest.json');
  fs.writeFileSync(indexPath, JSON.stringify({ 
    date: dailyData.date, 
    timestamp: dailyData.timestamp 
  }, null, 2));
  
  return dailyData;
}

if (require.main === module) {
  main();
}

module.exports = { generateDailyData, main };