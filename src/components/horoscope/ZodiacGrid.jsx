import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ZODIAC_SIGNS } from '../../utils/constants';
import StarRating from '../ui/StarRating';

const ZodiacGrid = ({ horoscopeData = {}, content }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLanguage = location.pathname.split('/')[1] || 'en';

  const handleZodiacClick = (sign) => {
    navigate(`/${currentLanguage}/horoscope/${sign}`);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 max-w-6xl mx-auto">
        {Object.entries(ZODIAC_SIGNS).map(([sign, data]) => {
          const rating = horoscopeData[sign]?.overall || Math.floor(Math.random() * 5) + 1;
          
          return (
            <div
              key={sign}
              onClick={() => handleZodiacClick(sign)}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 text-center border border-gray-100"
            >
              <div className="text-3xl mb-2">{data.symbol}</div>
              <div className="text-sm font-medium text-gray-800 mb-1">
                {content.zodiacNames[sign]}
              </div>
              <div className="text-xs text-gray-500 mb-2">{data.dates}</div>
              <StarRating rating={rating} size="sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ZodiacGrid;