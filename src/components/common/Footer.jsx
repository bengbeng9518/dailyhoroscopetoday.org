import React from 'react';

const Footer = ({ content = {} }) => {
  const currentYear = new Date().getFullYear();

  // 默认内容
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

  // 合并默认内容和传入的内容
  const finalContent = { ...defaultContent, ...content };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 网站信息 */}
          <div>
            <h3 className="text-lg font-bold mb-4">{finalContent.siteTitle}</h3>
            <p className="text-gray-300 text-sm">
              {finalContent.siteDescription}
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="font-semibold mb-4">{finalContent.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">{finalContent.home}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">{finalContent.about}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">{finalContent.privacy}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">{finalContent.terms}</a></li>
            </ul>
          </div>

          {/* 免责声明 */}
          <div>
            <h4 className="font-semibold mb-4">{finalContent.disclaimer}</h4>
            <p className="text-gray-300 text-sm">
              {finalContent.disclaimerText}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-300">
          <p>&copy; {currentYear} {finalContent.siteTitle}. {finalContent.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;