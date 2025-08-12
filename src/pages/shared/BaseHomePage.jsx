import React, { useState, useEffect } from 'react';
import { generateDailyHoroscopes } from '../../services/horoscopeService';
import ZodiacGrid from '../../components/horoscope/ZodiacGrid';
import HoroscopeCard from '../../components/horoscope/HoroscopeCard';
import { ZODIAC_SIGNS } from '../../utils/constants';
import UserProfile from '../../components/user/UserProfile';
import ShareButton from '../../components/social/ShareButton';
import HoroscopeChart from '../../components/charts/HoroscopeChart';
import ThemeSelector from '../../components/theme/ThemeSelector';
import { useTheme } from '../../components/theme/ThemeProvider';
import '../../styles/animations.css';

const BaseHomePage = ({ language, content }) => {
  const { theme } = useTheme();
  const [dailyHoroscopes, setDailyHoroscopes] = useState({});
  const [featuredSign, setFeaturedSign] = useState('leo');
  const [loading, setLoading] = useState(true);

  // 创建默认内容对象
  const defaultContent = {
    zodiacNames: {
      aries: language === 'zh' ? '白羊座' : 'Aries',
      taurus: language === 'zh' ? '金牛座' : 'Taurus',
      gemini: language === 'zh' ? '双子座' : 'Gemini',
      cancer: language === 'zh' ? '巨蟹座' : 'Cancer',
      leo: language === 'zh' ? '狮子座' : 'Leo',
      virgo: language === 'zh' ? '处女座' : 'Virgo',
      libra: language === 'zh' ? '天秤座' : 'Libra',
      scorpio: language === 'zh' ? '天蝎座' : 'Scorpio',
      sagittarius: language === 'zh' ? '射手座' : 'Sagittarius',
      capricorn: language === 'zh' ? '摩羯座' : 'Capricorn',
      aquarius: language === 'zh' ? '水瓶座' : 'Aquarius',
      pisces: language === 'zh' ? '双鱼座' : 'Pisces'
    },
    categories: {
      overall: language === 'zh' ? '综合' : 'Overall',
      love: language === 'zh' ? '爱情' : 'Love',
      career: language === 'zh' ? '事业' : 'Career',
      money: language === 'zh' ? '财运' : 'Money',
      health: language === 'zh' ? '健康' : 'Health'
    },
    radarChart: language === 'zh' ? '运势雷达图' : 'Fortune Radar Chart',
    profileCenter: language === 'zh' ? '个人中心' : 'Profile Center',
    name: language === 'zh' ? '姓名' : 'Name',
    birthday: language === 'zh' ? '生日' : 'Birthday',
    zodiacSign: language === 'zh' ? '星座' : 'Zodiac Sign',
    favoriteColor: language === 'zh' ? '喜欢的颜色' : 'Favorite Color',
    enterName: language === 'zh' ? '请输入您的姓名' : 'Enter your name'
  };

  // 合并默认内容和传入的内容
  const finalContent = { ...defaultContent, ...content };

  useEffect(() => {
    const loadDailyHoroscopes = async () => {
      try {
        const horoscopes = await generateDailyHoroscopes(new Date(), language);
        setDailyHoroscopes(horoscopes);
        
        const signs = Object.keys(ZODIAC_SIGNS);
        const randomSign = signs[Math.floor(Math.random() * signs.length)];
        setFeaturedSign(randomSign);
      } catch (error) {
        console.error('Failed to load horoscopes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDailyHoroscopes();
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className={`${theme.colors.textSecondary}`}>{content.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.colors.background} transition-colors duration-300`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        <div className="relative max-w-6xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            {content.subtitle}
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <ThemeSelector />
            <ShareButton 
              content={finalContent}
              url={window.location.href}
              title={content.title}
              description={content.subtitle}
            />
          </div>
        </div>
      </section>

      {/* Featured Horoscope */}
      {dailyHoroscopes[featuredSign] && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold text-center mb-12 ${theme.colors.textPrimary}`}>
              {content.todaysFortune}
            </h2>
            <HoroscopeCard 
              sign={featuredSign}
              horoscope={dailyHoroscopes[featuredSign]}
              content={finalContent}
              featured={true}
              language={language}
            />
          </div>
        </section>
      )}

      {/* Zodiac Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme.colors.textPrimary}`}>
            {content.allSigns}
          </h2>
          <ZodiacGrid 
            horoscopes={dailyHoroscopes}
            content={finalContent}
            language={language}
          />
        </div>
      </section>

      {/* Horoscope Chart */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme.colors.textPrimary}`}>
            {content.weeklyTrend}
          </h2>
          <HoroscopeChart 
            content={finalContent}
            language={language} 
          />
        </div>
      </section>

      {/* User Profile */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <UserProfile 
            content={finalContent}
            language={language} 
          />
        </div>
      </section>
    </div>
  );
};

export default BaseHomePage;