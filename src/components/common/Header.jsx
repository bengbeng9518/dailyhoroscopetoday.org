import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTheme } from '../theme/ThemeProvider';

const Header = ({ content = {} }) => {
  const location = useLocation();
  const { theme } = useTheme();
  
  // 修复语言检测逻辑
  const getCurrentLanguage = () => {
    const pathname = location.pathname;
    // 如果路径以 /zh 开头，则为中文
    if (pathname.startsWith('/zh')) {
      return 'zh';
    }
    // 否则为英文
    return 'en';
  };
  
  const currentLanguage = getCurrentLanguage();
  
  // 生成正确的首页路径
  const getHomePath = () => {
    return currentLanguage === 'zh' ? '/zh' : '/';
  };

  const defaultContent = {
    siteTitle: 'Daily Horoscope',
    home: 'Home',
    about: 'About'
  };

  const finalContent = { ...defaultContent, ...content };

  return (
    <header className={`bg-gradient-to-r ${theme.colors.primary} text-white shadow-xl ${theme.colors.shadow} backdrop-blur-sm`}>
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={getHomePath()} className="flex items-center space-x-3 group">
            <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">✨</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
              {finalContent.siteTitle}
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to={getHomePath()} 
              className="relative px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 group"
            >
              <span className="relative z-10">{finalContent.home}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              to={currentLanguage === 'zh' ? '/zh/about' : '/about'} 
              className="relative px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 group"
            >
              <span className="relative z-10">{finalContent.about}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </nav>

          {/* Language Selector */}
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;