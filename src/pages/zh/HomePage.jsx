import React from 'react';
import BaseHomePage from '../shared/BaseHomePage';

const ZhHomePage = () => {
  const content = {
    title: "今日星座运势",
    subtitle: "探索你的星座运程",
    loading: "加载中...",
    todaysFortune: "今日精选运势",
    allSigns: "十二星座运势",
    weeklyTrend: "本周运势趋势"
  };

  return <BaseHomePage language="zh" content={content} />;
};

export default ZhHomePage;