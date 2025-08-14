const fs = require('fs');
const path = require('path');

function updateSitemap() {
  const baseUrl = 'https://dailyhoroscopetoday.org';
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  
  // 生成最近30天的URL
  const dailyUrls = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // 英文版本
    dailyUrls.push({
      loc: `${baseUrl}/daily-horoscope/${year}/${month}/${day}`,
      lastmod: date.toISOString().split('T')[0],
      changefreq: 'daily',
      priority: i === 0 ? '0.9' : '0.8'
    });
    
    // 中文版本
    dailyUrls.push({
      loc: `${baseUrl}/zh/daily-horoscope/${year}/${month}/${day}`,
      lastmod: date.toISOString().split('T')[0],
      changefreq: 'daily',
      priority: i === 0 ? '0.9' : '0.8'
    });
  }
  
  // 基础页面URL
  const staticUrls = [
    { loc: baseUrl, lastmod: today.toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/zh`, lastmod: today.toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' },
    // 添加其他静态页面...
  ];
  
  // 生成sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...dailyUrls].map(url => 
  `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
).join('\n')}
</urlset>`;
  
  // 保存sitemap
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(__dirname, '..', 'build', 'sitemap.xml'), sitemap);
  
  console.log('Sitemap updated successfully!');
}

if (require.main === module) {
  updateSitemap();
}

module.exports = { updateSitemap };