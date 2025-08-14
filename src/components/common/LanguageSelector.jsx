import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from '../../utils/constants';

const LanguageSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从当前路径获取语言
  const getCurrentLanguage = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    return pathSegments[0] === 'zh' ? 'zh' : 'en';
  };
  
  const currentLang = getCurrentLanguage();
  
  const switchLanguage = (newLang) => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // 移除当前语言前缀（如果存在）
    if (pathSegments[0] === 'zh') {
      pathSegments.shift();
    }
    
    // 构建新路径
    let newPath;
    if (newLang === 'zh') {
      // 中文：添加 /zh 前缀
      newPath = '/zh/' + pathSegments.join('/');
    } else {
      // 英文：不添加前缀
      newPath = '/' + pathSegments.join('/');
    }
    
    // 确保路径格式正确
    newPath = newPath.replace(/\/+/g, '/'); // 移除多余的斜杠
    if (newPath === '/') newPath = newLang === 'zh' ? '/zh' : '/';
    
    navigate(newPath);
  };
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-2 flex gap-2">
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
          <button
            key={code}
            onClick={() => switchLanguage(code)}
            className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
              currentLang === code
                ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md'
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