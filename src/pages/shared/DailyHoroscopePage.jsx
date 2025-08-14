import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import SEOHead from '../../components/common/SEOHead';
import ShareButton from '../../components/social/ShareButton';
import { ZODIAC_SIGNS } from '../../utils/constants';

const DailyHoroscopePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 从URL路径动态检测语言
  const language = location.pathname.startsWith('/zh') ? 'zh' : 'en';
  
  // 从URL中提取日期参数
  const pathParts = location.pathname.split('/');
  const yearIndex = pathParts.findIndex(part => part === 'daily-horoscope') + 1;
  const year = pathParts[yearIndex];
  const month = pathParts[yearIndex + 1];
  const day = pathParts[yearIndex + 2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const response = await fetch(`/data/daily/${dateStr}.json`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching daily horoscope data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (year && month && day) {
      fetchData();
    }
  }, [year, month, day]);

  const formatDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    return language === 'zh' 
      ? date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getZodiacName = (sign) => {
    const zodiac = ZODIAC_SIGNS.find(z => z.symbol === sign);
    return zodiac ? (language === 'zh' ? zodiac.name_zh : zodiac.name_en) : sign;
  };

  const getRankColor = (rank) => {
    switch(rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-amber-600 to-amber-800';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '⭐';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-xl font-medium">
              {language === 'zh' ? '加载中...' : 'Loading...'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-4">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-white text-2xl font-bold mb-4">
              {language === 'zh' ? '数据加载失败' : 'Failed to Load Data'}
            </h2>
            <p className="text-white/80 mb-6">
              {language === 'zh' ? '无法获取今日运势数据，请稍后重试。' : 'Unable to fetch today\'s horoscope data. Please try again later.'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              {language === 'zh' ? '重新加载' : 'Reload'}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <SEOHead 
        title={language === 'zh' ? `每日运势排行榜 - ${formatDate(year, month, day)}` : `Daily Horoscope Rankings - ${formatDate(year, month, day)}`}
        description={language === 'zh' ? '查看今日十二星座运势排行榜，了解各星座的运势指数和详细分析。' : 'Check today\'s zodiac horoscope rankings and detailed analysis for all 12 signs.'}
        language={language}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            {language === 'zh' ? '每日运势排行榜' : 'Daily Horoscope Rankings'}
          </h1>
          <div className="text-2xl md:text-3xl text-white/90 font-semibold mb-2">
            {formatDate(year, month, day)}
          </div>
          <div className="text-lg text-white/70">
            {language === 'zh' ? '十二星座运势指数排行' : 'Zodiac Fortune Index Rankings'}
          </div>
        </div>

        {/* 运势排行榜 */}
        {data && data[language] && data[language].rankings && (
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:gap-8">
              {data[language].rankings.map((item, index) => {
                const rank = index + 1;
                const isTopThree = rank <= 3;
                
                return (
                  <div 
                    key={item.id || item.sign}
                    className={`relative group transform transition-all duration-500 hover:scale-[1.02] ${
                      isTopThree ? 'hover:scale-[1.03]' : ''
                    }`}
                  >
                    {/* 背景卡片 */}
                    <div className={`relative bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl ${
                      isTopThree ? 'bg-gradient-to-r from-white/15 to-white/10' : ''
                    }`}>
                      
                      {/* 排名徽章 */}
                      <div className="absolute -top-4 -left-4 z-10">
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${getRankColor(rank)} flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                          <div className="text-center">
                            <div className="text-2xl md:text-3xl">{getRankIcon(rank)}</div>
                            <div className="text-white font-bold text-sm md:text-base">#{rank}</div>
                          </div>
                        </div>
                      </div>

                      {/* 主要内容 */}
                      <div className="ml-8 md:ml-12">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          
                          {/* 左侧：星座信息 */}
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                              {language === 'zh' ? item.name.zh : item.name.en}
                            </h3>
                            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                              {item.description}
                            </p>
                            
                            {/* 运势指数 */}
                            <div className="flex items-center gap-4 mb-3">
                              <span className="text-white/70 font-medium">
                                {language === 'zh' ? '运势指数:' : 'Fortune Index:'}
                              </span>
                              <div className="flex-1 max-w-xs">
                                <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${item.score}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span className="text-white font-bold text-lg">
                                {item.score}%
                              </span>
                            </div>
                            
                            {/* 运势说明 */}
                            <div className="text-sm text-white/60">
                              {language === 'zh' ? '今日运势综合评分' : 'Today\'s Overall Fortune Score'}
                            </div>
                          </div>
                          
                          {/* 右侧：分数显示 */}
                          <div className="text-center md:text-right">
                            <div className={`text-4xl md:text-5xl font-bold mb-2 ${
                              isTopThree ? 'bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent' : 'text-white'
                            }`}>
                              {item.score}
                            </div>
                            <div className="text-white/60 text-sm font-medium">
                              {language === 'zh' ? '分' : 'pts'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 顶级排名特效 */}
                      {isTopThree && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/10 to-orange-500/10 pointer-events-none"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 底部操作按钮 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button
            onClick={() => navigate(language === 'zh' ? '/zh' : '/')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {language === 'zh' ? '🏠 返回首页' : '🏠 Back to Home'}
          </button>
          
          <ShareButton 
            url={window.location.href}
            title={language === 'zh' ? `每日运势排行榜 - ${formatDate(year, month, day)}` : `Daily Horoscope Rankings - ${formatDate(year, month, day)}`}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          />
        </div>
        
        {/* 页面说明 */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <p className="text-white/70 text-sm leading-relaxed">
              {language === 'zh' 
                ? '每日运势排行榜基于星座学原理，结合天体运行规律计算得出。仅供娱乐参考，请理性对待。'
                : 'Daily horoscope rankings are calculated based on astrological principles and celestial movements. For entertainment purposes only, please treat rationally.'
              }
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DailyHoroscopePage;