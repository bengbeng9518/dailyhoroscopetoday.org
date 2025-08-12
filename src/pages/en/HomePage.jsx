import React from 'react';
import BaseHomePage from '../shared/BaseHomePage';

const EnHomePage = () => {
  const content = {
    title: "Daily Horoscope Today",
    subtitle: "Discover Your Zodiac Fortune",
    loading: "Loading...",
    todaysFortune: "Today's Featured Fortune",
    allSigns: "All Zodiac Signs",
    weeklyTrend: "Weekly Horoscope Trends"
  };

  return <BaseHomePage language="en" content={content} />;
};

export default EnHomePage;