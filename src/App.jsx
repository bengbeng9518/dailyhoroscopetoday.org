import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { ThemeProvider } from './components/theme/ThemeProvider';
import LanguageSelector from './components/common/LanguageSelector';

// 英文页面
import EnHomePage from './pages/en/HomePage';
import EnHoroscopeDetailPage from './pages/en/HoroscopeDetailPage';
import EnAboutPage from './pages/en/AboutPage';

// 中文页面
import ZhHomePage from './pages/zh/HomePage';
import ZhHoroscopeDetailPage from './pages/zh/HoroscopeDetailPage';
import ZhAboutPage from './pages/zh/AboutPage';

// 内部应用组件，在 Router 内部使用 useLocation
function AppContent() {
  const location = useLocation();
  const currentLanguage = location.pathname.split('/')[1] || 'en';
  
  // 动态内容配置
  const getHeaderContent = (lang) => ({
    siteTitle: lang === 'zh' ? '今日星座运势' : 'Daily Horoscope',
    home: lang === 'zh' ? '首页' : 'Home',
    about: lang === 'zh' ? '关于' : 'About'
  });

  const getFooterContent = (lang) => ({
    siteTitle: lang === 'zh' ? '今日星座运势' : 'Daily Horoscope',
    siteDescription: lang === 'zh' ? '获取您的每日星座运势和占星预测。' : 'Get your daily horoscope and zodiac predictions.',
    quickLinks: lang === 'zh' ? '快速链接' : 'Quick Links',
    home: lang === 'zh' ? '首页' : 'Home',
    about: lang === 'zh' ? '关于' : 'About',
    privacy: lang === 'zh' ? '隐私政策' : 'Privacy',
    terms: lang === 'zh' ? '使用条款' : 'Terms',
    disclaimer: lang === 'zh' ? '免责声明' : 'Disclaimer',
    disclaimerText: lang === 'zh' ? '本内容仅供娱乐参考。' : 'This is for entertainment purposes only.',
    allRightsReserved: lang === 'zh' ? '版权所有。' : 'All rights reserved.'
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header content={getHeaderContent(currentLanguage)} />
      <LanguageSelector />
      <main className="flex-1">
        <Routes>
          {/* 根路径重定向到英文首页 */}
          <Route path="/" element={<Navigate to="/en" replace />} />
          
          {/* 英文页面路由 */}
          <Route path="/en" element={<EnHomePage />} />
          <Route path="/en/about" element={<EnAboutPage />} />
          <Route path="/en/horoscope/:sign" element={<EnHoroscopeDetailPage />} />
          
          {/* 中文页面路由 */}
          <Route path="/zh" element={<ZhHomePage />} />
          <Route path="/zh/about" element={<ZhAboutPage />} />
          <Route path="/zh/horoscope/:sign" element={<ZhHoroscopeDetailPage />} />
        </Routes>
      </main>
      <Footer content={getFooterContent(currentLanguage)} />
    </div>
  );
}

// 主 App 组件
function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
const defaultFooterContent = {
  siteTitle: 'Daily Horoscope',
  siteDescription: 'Get your daily horoscope and zodiac predictions.',
  quickLinks: 'Quick Links',
  home: 'Home',
  about: 'About',
  privacy: 'Privacy',
  terms: 'Terms',
  disclaimer: 'Disclaimer',
  disclaimerText: 'This is for entertainment purposes only.',
  allRightsReserved: 'All rights reserved.'
};