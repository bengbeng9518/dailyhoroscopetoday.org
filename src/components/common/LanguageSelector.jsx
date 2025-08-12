import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from '../../utils/constants';

const LanguageSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从当前路径获取语言
  const getCurrentLanguage = () => {
    const pathSegments = location.pathname.split('/');
    return pathSegments[1] || 'en';
  };
  
  const currentLang = getCurrentLanguage();
  
  const switchLanguage = (newLang) => {
    const pathSegments = location.pathname.split('/');
    pathSegments[1] = newLang;
    const newPath = pathSegments.join('/');
    navigate(newPath);
  };
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex gap-2">
        {Object.entries(SUPPORTED_LANGUAGES).slice(0, 2).map(([code, lang]) => (
          <button
            key={code}
            onClick={() => switchLanguage(code)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              currentLang === code
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {lang.flag} {lang.nativeName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;