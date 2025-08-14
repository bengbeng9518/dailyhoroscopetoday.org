import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

const Footer = ({ content = {} }) => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  const defaultContent = {
    siteTitle: 'Daily Horoscope',
    siteDescription: 'Get your daily horoscope and zodiac predictions.',
    quickLinks: 'Quick Links',
    home: 'Home',
    about: 'About',
    privacy: 'Privacy',
    terms: 'Terms',
    disclaimer: 'Disclaimer',
    disclaimerText: 'This is for entertainment purposes only.',
    allRightsReserved: 'All rights reserved.'
  };

  const finalContent = { ...defaultContent, ...content };

  return (
    <footer className={`bg-gradient-to-r ${theme.colors.secondary} text-white py-12 mt-16`}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 网站信息 */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
              {finalContent.siteTitle}
            </h3>
            <p className="text-orange-100 text-sm leading-relaxed">
              {finalContent.siteDescription}
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-sm">📧</span>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-sm">📱</span>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                <span className="text-sm">🌐</span>
              </div>
            </div>
          </div>

          {/* 快速链接 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-yellow-100">{finalContent.quickLinks}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-orange-100 hover:text-white transition-colors hover:underline">{finalContent.home}</a></li>
              <li><a href="#" className="text-orange-100 hover:text-white transition-colors hover:underline">{finalContent.about}</a></li>
              <li><a href="#" className="text-orange-100 hover:text-white transition-colors hover:underline">{finalContent.privacy}</a></li>
              <li><a href="#" className="text-orange-100 hover:text-white transition-colors hover:underline">{finalContent.terms}</a></li>
            </ul>
          </div>

          {/* 免责声明 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-yellow-100">{finalContent.disclaimer}</h4>
            <p className="text-orange-100 text-sm leading-relaxed">
              {finalContent.disclaimerText}
            </p>
            <div className="pt-4 border-t border-white/20">
              <p className="text-xs text-orange-200">
                © {currentYear} {finalContent.siteTitle}. {finalContent.allRightsReserved}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;