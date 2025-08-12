// 支持的语言配置（简化为中英文）
export const SUPPORTED_LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    rtl: false
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    rtl: false
  }
};

export const DEFAULT_LANGUAGE = 'en';

// 星座配置
export const ZODIAC_SIGNS = {
  aries: { symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire' },
  taurus: { symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth' },
  gemini: { symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air' },
  cancer: { symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water' },
  leo: { symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire' },
  virgo: { symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth' },
  libra: { symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air' },
  scorpio: { symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water' },
  sagittarius: { symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire' },
  capricorn: { symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth' },
  aquarius: { symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air' },
  pisces: { symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water' }
};