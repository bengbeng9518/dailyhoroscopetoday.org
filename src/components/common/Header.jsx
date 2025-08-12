import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const Header = ({ content = {} }) => {
  const location = useLocation();
  const currentLanguage = location.pathname.split('/')[1] || 'en';

  // 默认内容
  const defaultContent = {
    siteTitle: 'Daily Horoscope',
    home: 'Home',
    about: 'About'
  };

  // 合并默认内容和传入的内容
  const finalContent = { ...defaultContent, ...content };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={`/${currentLanguage}`} className="flex items-center space-x-2">
            <span className="text-2xl">✨</span>
            <h1 className="text-xl font-bold">{finalContent.siteTitle}</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to={`/${currentLanguage}`} 
              className="hover:text-purple-200 transition-colors"
            >
              {finalContent.home}
            </Link>
            <Link 
              to={`/${currentLanguage}/about`} 
              className="hover:text-purple-200 transition-colors"
            >
              {finalContent.about}
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