import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Palette } from 'lucide-react';

const ThemeSelector = () => {
  const { currentTheme, themes, changeTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${theme.colors.card} ${theme.colors.text} shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        <Palette size={16} />
        <span>{themes[currentTheme].icon}</span>
        <span className="hidden sm:inline">{themes[currentTheme].name}</span>
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 right-0 ${theme.colors.card} rounded-lg shadow-xl border p-2 z-50 min-w-48`}>
          {Object.entries(themes).map(([key, themeOption]) => (
            <button
              key={key}
              onClick={() => {
                changeTheme(key);
                setIsOpen(false);
              }}
              className={`flex items-center space-x-3 w-full px-3 py-2 text-left rounded hover:bg-opacity-80 transition-all duration-200 ${
                currentTheme === key ? 'bg-purple-100 dark:bg-purple-800' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{themeOption.icon}</span>
              <span className={theme.colors.text}>{themeOption.name}</span>
              {currentTheme === key && (
                <span className="ml-auto text-purple-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;