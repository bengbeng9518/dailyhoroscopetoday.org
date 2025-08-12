import React from 'react';
import { ZODIAC_SIGNS } from '../../utils/constants';
import StarRating from '../ui/StarRating';
import { Heart, Briefcase, DollarSign, Activity } from 'lucide-react';

const HoroscopeCard = ({ zodiacSign, horoscope, content = {} }) => {
  if (!horoscope) return null;

  // 默认内容
  const defaultContent = {
    zodiacNames: {
      aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer',
      leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio',
      sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces'
    },
    overall: 'Overall',
    categories: {
      love: 'Love',
      career: 'Career', 
      money: 'Money',
      health: 'Health'
    },
    advice: 'Advice',
    luckyNumber: 'Lucky Number',
    luckyColor: 'Lucky Color',
    luckyDirection: 'Lucky Direction'
  };

  // 合并默认内容和传入的内容
  const finalContent = { 
    ...defaultContent, 
    ...content,
    zodiacNames: { ...defaultContent.zodiacNames, ...(content.zodiacNames || {}) },
    categories: { ...defaultContent.categories, ...(content.categories || {}) }
  };

  const iconMap = {
    love: Heart,
    career: Briefcase,
    money: DollarSign,
    health: Activity
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-xl text-white p-6">
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">{ZODIAC_SIGNS[zodiacSign]?.symbol}</div>
        <h2 className="text-2xl font-bold">{finalContent.zodiacNames[zodiacSign]}</h2>
        <p className="text-purple-200">{ZODIAC_SIGNS[zodiacSign]?.dates}</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">{finalContent.overall}</h3>
          <StarRating rating={horoscope.overall} size="md" />
          <p className="text-sm mt-2 text-purple-100">{horoscope.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {['love', 'career', 'money', 'health'].map((category) => {
            const Icon = iconMap[category];
            return (
              <div key={category} className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{finalContent.categories[category]}</span>
                </div>
                <StarRating rating={horoscope[category]} size="sm" />
              </div>
            );
          })}
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <h4 className="font-semibold mb-2">{finalContent.advice}</h4>
          <p className="text-sm text-purple-100">{horoscope.advice}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-purple-200">{finalContent.luckyNumber}</p>
            <p className="font-bold">{horoscope.luckyNumber}</p>
          </div>
          <div>
            <p className="text-xs text-purple-200">{finalContent.luckyColor}</p>
            <p className="font-bold">{horoscope.luckyColor}</p>
          </div>
          <div>
            <p className="text-xs text-purple-200">{finalContent.luckyDirection}</p>
            <p className="font-bold">{horoscope.luckyDirection}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoroscopeCard;