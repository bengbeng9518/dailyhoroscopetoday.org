import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('warmGradient');

  const themes = {
    warmGradient: {
      name: '温暖渐变',
      icon: '🌅',
      colors: {
        primary: 'from-orange-400 via-pink-400 to-red-400',
        secondary: 'from-yellow-300 via-orange-400 to-pink-400',
        tertiary: 'from-pink-300 via-rose-300 to-orange-300',
        background: 'from-orange-50 via-pink-50 to-rose-50',
        card: 'bg-white/80 backdrop-blur-sm border border-orange-100/50',
        cardHover: 'bg-white/90 border-orange-200/70 shadow-lg shadow-orange-100/50',
        text: 'text-gray-800',
        textSecondary: 'text-orange-700',
        textAccent: 'text-pink-600',
        button: 'bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500',
        buttonSecondary: 'bg-gradient-to-r from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500',
        accent: 'text-orange-500',
        border: 'border-orange-200/30',
        shadow: 'shadow-orange-100/50'
      }
    },
    light: {
      name: '明亮模式',
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
      <div className={`min-h-screen bg-gradient-to-br ${theme.colors.background} transition-all duration-700`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};