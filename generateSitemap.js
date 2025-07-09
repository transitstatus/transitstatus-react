import fs from 'fs';
import { agencies } from './src/config.js';

const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
const lastMod = `${year}-${month}-${day}`;

const sitemap = fs.createWriteStream('./public/sitemap.xml');

sitemap.write('<?xml version="1.0" encoding="UTF-8"?>');
sitemap.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
sitemap.write(`
  <url>
    <loc>https://transitstat.us/</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1.0</priority>
  </url>
`);

const processFeed = async (feed) => {
  if (feed.disabled) { // feed is hidden, broken, or disabled for some other reason. dont index it.
    console.log(`Feed is disabled: ${feed.key}`)
    return;
  }

  const feedData = await fetch(feed.endpoint)
    .then((res) => res.json())
    .catch((e) => console.log(`Feed does not exist: ${feed.key}`));

  if (!feedData) return;

  sitemap.write(`
    <url>
      <loc>https://transitstat.us/${feed.key}</loc>
      <lastmod>${lastMod}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>
  `);

  sitemap.write(`
    <url>
      <loc>https://transitstat.us/${feed.key}/map</loc>
      <lastmod>${lastMod}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
  `);

  Object.values(feedData.lines).forEach((line) => {
    sitemap.write(`
      <url>
        <loc>https://transitstat.us/${feed.key}/${line.lineCode}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });

  Object.values(feedData.stations).forEach((station) => {
    sitemap.write(`
      <url>
        <loc>https://transitstat.us/${feed.key}/${station.stationID}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.6</priority>
      </url>
    `);
  });
};

(async () => {
  const feeds = Object.keys(agencies).map((agencyKey) => {
    return {
      ...agencies[agencyKey],
      key: agencyKey
    };
  });

  for (let i = 0; i < feeds.length; i++) {
    await processFeed(feeds[i]);
    console.log(`Done with ${feeds[i].key}`)
  };

  sitemap.write('</urlset>');
  sitemap.end();
})();