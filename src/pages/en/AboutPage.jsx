import React from 'react';
import { useTheme } from '../../components/theme/ThemeProvider';

const EnAboutPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.colors.background} py-16 px-4`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-bold text-center mb-8 ${theme.colors.textPrimary}`}>
          About Daily Horoscope Today
        </h1>
        
        <div className={`prose prose-lg mx-auto ${theme.colors.textSecondary}`}>
          <p className="text-xl leading-relaxed mb-6">
            Welcome to Daily Horoscope Today, your trusted source for accurate and insightful 
            astrological guidance. We provide daily horoscope readings for all twelve zodiac 
            signs, helping you navigate life's challenges and opportunities.
          </p>
          
          <h2 className={`text-2xl font-semibold mt-8 mb-4 ${theme.colors.textPrimary}`}>
            Our Mission
          </h2>
          <p className="mb-6">
            Our mission is to make astrology accessible and meaningful for everyone. We believe 
            that understanding your zodiac sign can provide valuable insights into your 
            personality, relationships, and life path.
          </p>
          
          <h2 className={`text-2xl font-semibold mt-8 mb-4 ${theme.colors.textPrimary}`}>
            What We Offer
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>Daily horoscope readings for all zodiac signs</li>
            <li>Detailed personality insights</li>
            <li>Love and relationship compatibility</li>
            <li>Career and financial guidance</li>
            <li>Monthly and yearly predictions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EnAboutPage;