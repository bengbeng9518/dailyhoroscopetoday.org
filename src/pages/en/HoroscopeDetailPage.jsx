import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateDailyHoroscopes } from '../../services/horoscopeService';
import { ZODIAC_SIGNS } from '../../utils/constants';
import { useTheme } from '../../components/theme/ThemeProvider';
import HoroscopeCard from '../../components/horoscope/HoroscopeCard';
import ShareButton from '../../components/social/ShareButton';

const EnHoroscopeDetailPage = () => {
  const { sign } = useParams();
  const { theme } = useTheme();
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHoroscope = async () => {
      try {
        const horoscopes = await generateDailyHoroscopes(new Date(), 'en');
        setHoroscope(horoscopes[sign]);
      } catch (error) {
        console.error('Failed to load horoscope:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sign && ZODIAC_SIGNS[sign]) {
      loadHoroscope();
    } else {
      setLoading(false);
    }
  }, [sign]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className={`${theme.colors.textSecondary}`}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!sign || !ZODIAC_SIGNS[sign]) {
    return (
      <div className={`min-h-screen ${theme.colors.background} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 ${theme.colors.textPrimary}`}>
            Zodiac Sign Not Found
          </h1>
          <p className={`text-lg mb-8 ${theme.colors.textSecondary}`}>
            The zodiac sign you're looking for doesn't exist.
          </p>
          <Link 
            to="/en" 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const zodiacInfo = ZODIAC_SIGNS[sign];

  return (
    <div className={`min-h-screen ${theme.colors.background}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">{zodiacInfo.symbol}</div>
          <h1 className="text-4xl font-bold mb-2 capitalize">{sign}</h1>
          <p className="text-xl opacity-90">{zodiacInfo.dates}</p>
          <p className="text-lg opacity-75">Element: {zodiacInfo.element}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <Link 
          to="/en" 
          className={`inline-flex items-center ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} transition-colors`}
        >
          ← Back to Home
        </Link>
      </div>

      {/* Horoscope Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {horoscope ? (
          <>
            <HoroscopeCard 
              sign={sign}
              horoscope={horoscope}
              detailed={true}
              language="en"
            />
            
            <div className="mt-8 text-center">
              <ShareButton 
                url={window.location.href}
                title={`${sign.charAt(0).toUpperCase() + sign.slice(1)} Horoscope Today`}
                description={horoscope.overall}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className={`text-lg ${theme.colors.textSecondary}`}>
              Horoscope not available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnHoroscopeDetailPage;