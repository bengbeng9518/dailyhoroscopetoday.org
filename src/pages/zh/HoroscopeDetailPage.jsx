import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateDailyHoroscopes } from '../../services/horoscopeService';
import { ZODIAC_SIGNS } from '../../utils/constants';
import { useTheme } from '../../components/theme/ThemeProvider';
import HoroscopeCard from '../../components/horoscope/HoroscopeCard';
import ShareButton from '../../components/social/ShareButton';

// 中文星座名称映射
const ZODIAC_NAMES_ZH = {
  aries: '白羊座',
  taurus: '金牛座',
  gemini: '双子座',
  cancer: '巨蟹座',
  leo: '狮子座',
  virgo: '处女座',
  libra: '天秤座',
  scorpio: '天蝎座',
  sagittarius: '射手座',
  capricorn: '摩羯座',
  aquarius: '水瓶座',
  pisces: '双鱼座'
};

const ELEMENT_NAMES_ZH = {
  Fire: '火象',
  Earth: '土象',
  Air: '风象',
  Water: '水象'
};

const ZhHoroscopeDetailPage = () => {
  const { sign } = useParams();
  const { theme } = useTheme();
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHoroscope = async () => {
      try {
        const horoscopes = await generateDailyHoroscopes(new Date(), 'zh');
        setHoroscope(horoscopes[sign]);
      } catch (error) {
        console.error('Failed to load horoscope:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sign && ZODIAC_SIGNS[sign]) {
      loadHoroscope();
    } else {
      setLoading(false);
    }
  }, [sign]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className={`${theme.colors.textSecondary}`}>加载中...</p>
        </div>
      </div>
    );
  }

  if (!sign || !ZODIAC_SIGNS[sign]) {
    return (
      <div className={`min-h-screen ${theme.colors.background} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 ${theme.colors.textPrimary}`}>
            星座未找到
          </h1>
          <p className={`text-lg mb-8 ${theme.colors.textSecondary}`}>
            您查找的星座不存在。
          </p>
          <Link 
            to="/zh" 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const zodiacInfo = ZODIAC_SIGNS[sign];
  const chineseName = ZODIAC_NAMES_ZH[sign];
  const chineseElement = ELEMENT_NAMES_ZH[zodiacInfo.element];

  return (
    <div className={`min-h-screen ${theme.colors.background}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">{zodiacInfo.symbol}</div>
          <h1 className="text-4xl font-bold mb-2">{chineseName}</h1>
          <p className="text-xl opacity-90">{zodiacInfo.dates}</p>
          <p className="text-lg opacity-75">属性：{chineseElement}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <Link 
          to="/zh" 
          className={`inline-flex items-center ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} transition-colors`}
        >
          ← 返回首页
        </Link>
      </div>

      {/* Horoscope Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {horoscope ? (
          <>
            <HoroscopeCard 
              sign={sign}
              horoscope={horoscope}
              detailed={true}
              language="zh"
            />
            
            <div className="mt-8 text-center">
              <ShareButton 
                url={window.location.href}
                title={`${chineseName}今日运势`}
                description={horoscope.overall}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className={`text-lg ${theme.colors.textSecondary}`}>
              运势暂时不可用。
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZhHoroscopeDetailPage;