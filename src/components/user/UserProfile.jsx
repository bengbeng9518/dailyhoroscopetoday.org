import React, { useState, useEffect } from 'react';
import { ZODIAC_SIGNS } from '../../utils/constants';

const UserProfile = ({ content }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    birthday: '',
    zodiacSign: '',
    favoriteColor: '',
    notifications: true
  });

  useEffect(() => {
    // 从localStorage加载用户信息
    const savedInfo = localStorage.getItem('userProfile');
    if (savedInfo) {
      setUserInfo(JSON.parse(savedInfo));
    }
  }, []);

  const calculateZodiacSign = (birthday) => {
    const date = new Date(birthday);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // 星座日期判断逻辑
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'pisces';
    return 'leo';
  };

  const handleBirthdayChange = (birthday) => {
    const zodiacSign = calculateZodiacSign(birthday);
    const updatedInfo = { ...userInfo, birthday, zodiacSign };
    setUserInfo(updatedInfo);
    localStorage.setItem('userProfile', JSON.stringify(updatedInfo));
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(userInfo));
    alert(content.profileSaved);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        👤 {content.profileCenter}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.name}
          </label>
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder={content.enterName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.birthday}
          </label>
          <input
            type="date"
            value={userInfo.birthday}
            onChange={(e) => handleBirthdayChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {userInfo.zodiacSign && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {content.zodiacSign}
            </label>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <span className="text-2xl">{ZODIAC_SIGNS[userInfo.zodiacSign]?.symbol}</span>
              <span className="font-medium">{content.zodiacNames[userInfo.zodiacSign]}</span>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {content.favoriteColor}
          </label>
          <input
            type="color"
            value={userInfo.favoriteColor}
            onChange={(e) => setUserInfo({...userInfo, favoriteColor: e.target.value})}
            className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            {content.notifications}
          </label>
          <button
            onClick={() => setUserInfo({...userInfo, notifications: !userInfo.notifications})}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              userInfo.notifications ? 'bg-purple-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                userInfo.notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
        >
          {content.saveProfile}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;