import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTheme } from '../theme/ThemeProvider';

const Header = ({ content = {} }) => {
  const location = useLocation();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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

          {/* Desktop Navigation */}
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

          {/* Desktop Language Selector */}
          <div className="hidden md:block">
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <div className="flex flex-col space-y-1">
              <span className={`block w-5 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <nav className="flex flex-col space-y-2 mt-4">
              <Link 
                to={getHomePath()} 
                className="px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {finalContent.home}
              </Link>
              <Link 
                to={currentLanguage === 'zh' ? '/zh/about' : '/about'} 
                className="px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {finalContent.about}
              </Link>
            </nav>
            
            {/* Mobile Language Selector */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-center">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;