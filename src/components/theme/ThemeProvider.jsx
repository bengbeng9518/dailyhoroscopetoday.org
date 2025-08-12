import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 将主题定义移到组件内部，这样可以访问翻译函数
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  // 静态主题定义（不依赖翻译）
  const themes = {
    light: {
      name: '明亮模式', // 保持静态文本，避免循环依赖
      icon: '☀️',
      colors: {
        primary: 'from-purple-600 to-blue-600',
        secondary: 'from-pink-500 to-purple-600',
        background: 'from-purple-50 to-blue-50',
        card: 'bg-white',
        text: 'text-gray-800',
        textSecondary: 'text-gray-600'
      }
    },
    dark: {
      name: '深色模式',
      icon: '🌙',
      colors: {
        primary: 'from-purple-400 to-blue-400',
        secondary: 'from-pink-400 to-purple-400',
        background: 'from-gray-900 to-blue-900',
        card: 'bg-gray-800',
        text: 'text-white',
        textSecondary: 'text-gray-300'
      }
    },
    cosmic: {
      name: '星空模式',
      icon: '🌌',
      colors: {
        primary: 'from-indigo-600 to-purple-600',
        secondary: 'from-blue-500 to-indigo-600',
        background: 'from-indigo-900 via-purple-900 to-pink-900',
        card: 'bg-indigo-800 bg-opacity-50',
        text: 'text-white',
        textSecondary: 'text-indigo-200'
      }
    },
    sunset: {
      name: '日落模式',
      icon: '🌅',
      colors: {
        primary: 'from-orange-500 to-pink-500',
        secondary: 'from-yellow-400 to-orange-500',
        background: 'from-orange-100 to-pink-100',
        card: 'bg-white bg-opacity-90',
        text: 'text-gray-800',
        textSecondary: 'text-orange-700'
      }
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('theme', themeName);
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, theme, themes, changeTheme }}>
      <div className={`min-h-screen bg-gradient-to-br ${theme.colors.background} transition-all duration-500`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};