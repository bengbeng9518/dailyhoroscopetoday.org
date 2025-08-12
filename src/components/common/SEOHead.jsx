import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../hooks/useLanguage';

const SEOHead = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const location = useLocation();

  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://dailyhoroscopetoday.org';
  const currentUrl = `${siteUrl}${location.pathname}`;

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{t('seo.title')}</title>
      <meta name="description" content={t('seo.description')} />
      <meta name="keywords" content={t('seo.keywords')} />
      
      {/* Open Graph */}
      <meta property="og:title" content={t('seo.title')} />
      <meta property="og:description" content={t('seo.description')} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={currentLanguage} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t('seo.title')} />
      <meta name="twitter:description" content={t('seo.description')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Hreflang for multilingual SEO */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
      <link rel="alternate" hrefLang="zh" href={`${siteUrl}/zh`} />
      <link rel="alternate" hrefLang="es" href={`${siteUrl}/es`} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr`} />
      <link rel="alternate" hrefLang="de" href={`${siteUrl}/de`} />
      <link rel="alternate" hrefLang="ja" href={`${siteUrl}/ja`} />
      <link rel="alternate" hrefLang="ko" href={`${siteUrl}/ko`} />
    </Helmet>
  );
};

export default SEOHead;