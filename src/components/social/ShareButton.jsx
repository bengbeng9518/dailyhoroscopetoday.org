import React, { useState } from 'react';
import { Share2, Download, Copy } from 'lucide-react';

const ShareButton = ({ zodiacSign, horoscope, rating, content = {}, url, title, description }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // 默认内容
  const defaultContent = {
    share: 'Share',
    zodiacNames: {
      aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer',
      leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio',
      sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces'
    },
    todayHoroscope: 'Today\'s horoscope for {zodiac}',
    overallRating: 'Overall Rating',
    hashtags: '#horoscope #astrology #zodiac',
    copyText: 'Copy Text',
    copied: 'Copied!',
    downloadImage: 'Download Image',
    todayFortune: ' Today\'s Fortune',
    horoscope: 'horoscope',
    shareTitle: 'Daily Horoscope',
    copyFailed: 'Copy failed:',
    shareFailed: 'Share failed:'
  };

  // 合并默认内容和传入的内容
  const finalContent = { 
    ...defaultContent, 
    ...content,
    zodiacNames: { ...defaultContent.zodiacNames, ...(content.zodiacNames || {}) }
  };

  const generateShareText = () => {
    if (description && title) {
      // 简单模式：直接使用传入的 title 和 description
      return `${title}\n\n${description}`;
    }
    
    // 复杂模式：使用星座信息生成分享文本
    if (zodiacSign && finalContent.zodiacNames[zodiacSign]) {
      return `🌟 ${finalContent.todayHoroscope.replace('{zodiac}', finalContent.zodiacNames[zodiacSign])} 🌟\n\n${horoscope?.description || ''}\n\n${finalContent.overallRating}：${'⭐'.repeat(rating || 0)}\n\n${finalContent.hashtags}`;
    }
    
    return title || 'Daily Horoscope';
  };

  const generateShareImage = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 600;

    // 创建渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#8B5CF6');
    gradient.addColorStop(1, '#3B82F6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 600);

    // 添加文本
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    
    if (zodiacSign && finalContent.zodiacNames[zodiacSign]) {
      ctx.fillText(`${finalContent.zodiacNames[zodiacSign]}${finalContent.todayFortune}`, 200, 80);
    } else {
      ctx.fillText(title || 'Daily Horoscope', 200, 80);
    }
    
    ctx.font = '16px Arial';
    const text = horoscope?.description || description || '';
    const words = text.split('');
    let line = '';
    let y = 150;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i];
      if (ctx.measureText(testLine).width > 350 && i > 0) {
        ctx.fillText(line, 200, y);
        line = words[i];
        y += 25;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 200, y);

    // 添加评分
    ctx.font = '20px Arial';
    ctx.fillText(`${finalContent.overallRating}：${'⭐'.repeat(rating || 0)}`, 200, y + 60);

    return canvas.toDataURL('image/png');
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(finalContent.copyFailed, err);
    }
  };

  const handleDownloadImage = async () => {
    const imageData = await generateShareImage();
    const link = document.createElement('a');
    const filename = zodiacSign && finalContent.zodiacNames[zodiacSign] 
      ? `${finalContent.zodiacNames[zodiacSign]}-${finalContent.horoscope}.png`
      : 'horoscope.png';
    link.download = filename;
    link.href = imageData;
    link.click();
  };

  const handleShare = async (platform) => {
    const text = generateShareText();
    const shareUrl = url || window.location.href;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`);
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: finalContent.shareTitle,
              text: text,
              url: shareUrl
            });
          } catch (err) {
            console.error(finalContent.shareFailed, err);
          }
        }
    }
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
      >
        <Share2 className="w-4 h-4" />
        <span>{finalContent.share}</span>
      </button>

      {showShareMenu && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border p-4 z-50 min-w-48">
          <div className="space-y-2">
            <button
              onClick={handleCopyText}
              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 rounded transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? finalContent.copied : finalContent.copyText}</span>
            </button>
            
            <button
              onClick={handleDownloadImage}
              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 rounded transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{finalContent.downloadImage}</span>
            </button>
            
            <hr className="my-2" />
            
            <button
              onClick={() => handleShare('twitter')}
              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 rounded transition-colors"
            >
              <span>🐦</span>
              <span>Twitter</span>
            </button>
            
            <button
              onClick={() => handleShare('facebook')}
              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 rounded transition-colors"
            >
              <span>📘</span>
              <span>Facebook</span>
            </button>
            
            <button
              onClick={() => handleShare('whatsapp')}
              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 rounded transition-colors"
            >
              <span>💬</span>
              <span>WhatsApp</span>
            </button>
            
            <button
              onClick={() => handleShare('telegram')}
              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 rounded transition-colors"
            >
              <span>✈️</span>
              <span>Telegram</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;