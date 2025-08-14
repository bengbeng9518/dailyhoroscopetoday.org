import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme/ThemeProvider';
import HomePage from './pages/en/HomePage';
import ZhHomePage from './pages/zh/HomePage';
import DailyHoroscopePage from './pages/shared/DailyHoroscopePage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* 英文首页 */}
          <Route path="/" element={<HomePage />} />
          
          {/* 中文首页 */}
          <Route path="/zh" element={<ZhHomePage />} />
          
          {/* 每日运势排行榜路由 */}
          <Route path="/daily-horoscope/:year/:month/:day" element={<DailyHoroscopePage />} />
          <Route path="/zh/daily-horoscope/:year/:month/:day" element={<DailyHoroscopePage />} />
        </Routes>
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