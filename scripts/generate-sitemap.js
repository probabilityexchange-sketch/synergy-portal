import fs from 'fs';

const services = ['motor-rewind', 'ac-motor-repair', 'dc-motor-repair', 'servomotor-repair', 'gearbox-repair', 'pump-repair'];
const cities = ['chattanooga-tn', 'nashville-tn', 'murfreesboro-tn', 'clarksville-tn', 'dunlap-tn', 'birmingham-al', 'hoover-al', 'pelham-al', 'huntsville-al', 'madison-al', 'decatur-al', 'athens-al', 'florence-al', 'anniston-al', 'gadsden-al', 'talladega-al', 'fort-payne-al', 'scottsboro-al', 'bridgeport-al'];

const urls = ['/', '/services', '/service-area', '/about', '/contact'];

services.forEach(s => {
  cities.forEach(c => {
    urls.push(`/${s}/${c}`);
  });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>https://synergyindsolutions.com${u}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully!');
