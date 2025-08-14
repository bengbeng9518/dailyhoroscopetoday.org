import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const SEOHead = ({ title, description, language = 'en' }) => {
  const location = useLocation();
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://dailyhoroscopetoday.org';
  const currentUrl = `${siteUrl}${location.pathname}`;

  // 默认SEO内容
  const defaultTitle = language === 'zh' ? '每日星座运势 - 今日运势查询' : 'Daily Horoscope Today - Your Daily Astrology Guide';
  const defaultDescription = language === 'zh' 
    ? '查看今日十二星座运势，获取专业的星座分析和运势预测。每日更新，准确可靠。'
    : 'Check your daily horoscope for all 12 zodiac signs. Get professional astrology analysis and fortune predictions. Updated daily.';
  
  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const keywords = language === 'zh'
    ? '星座运势,每日运势,十二星座,星座查询,运势预测,占星术'
    : 'horoscope, daily horoscope, zodiac signs, astrology, fortune, predictions';

  return (
    <Helmet>
      <html lang={language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={language === 'zh' ? 'zh_CN' : 'en_US'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Hreflang for multilingual SEO */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
      <link rel="alternate" hrefLang="zh" href={`${siteUrl}/zh`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />
    </Helmet>
  );
};

export default SEOHead;