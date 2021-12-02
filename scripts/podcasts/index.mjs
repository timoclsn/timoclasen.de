import parser from 'fast-xml-parser';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import he from 'he';
import fetch from 'node-fetch';
import prettier from 'prettier';
import { remark } from 'remark';
import strip from 'remark-strip-html';
import sharp from 'sharp';

const favs = [
  'Accidental Tech Podcast',
  'Design Details',
  'Full Stack Radio',
  'How to Save a Planet',
  'OMR Podcast',
  'The Smart Home Show',
  'The Vergecast',
  'This is Product Management',
  'The Internet of Things Podcast - Stacey On IoT',
];

const coversDir = './public/podcasts';

if (existsSync(coversDir)) {
  rmSync(coversDir, { recursive: true });
}

mkdirSync(coversDir);

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const subsXML = readFileSync(
    './scripts/podcasts/subscriptions.opml'
  ).toString();

  const subsJSObj = parser.parse(
    subsXML,
    {
      attributeNamePrefix: '',
      attrNodeName: false,
      ignoreAttributes: false,
    },
    true
  ).opml.body.outline;

  const podcasts = await Promise.all(
    subsJSObj.map(async (podcast) => {
      let podcastObj = {};

      const response = await fetch(podcast.xmlUrl);
      if (response.ok) {
        const podcastXML = await response.text();
        try {
          const podcastJSObj = parser.parse(
            podcastXML,
            {
              attributeNamePrefix: '',
              attrNodeName: false,
              ignoreAttributes: false,
            },
            true
          ).rss.channel;

          podcastObj.title = he.decode(podcastJSObj.title);
          podcastObj.favorite = favs.includes(podcastObj.title);
          podcastObj.feed = podcast.xmlUrl;
          podcastObj.description = await stripHTML(
            he.decode(podcastJSObj.description)
          );
          podcastObj.website = addHTTP(podcastJSObj.link);
          podcastObj.hosts = he.decode(podcastJSObj['itunes:author']);
          // podcastObj.category =
          //     podcastJSObj['media:category'] ||
          //     podcastJSObj['itunes:category'];
          podcastObj.image = `cover-${hashString(podcastObj.title)}.jpg`;
          const imageUrl = podcastJSObj.image
            ? podcastJSObj.image.url
            : podcastJSObj['itunes:image'].href;
          const imageResponse = await fetch(imageUrl);
          const imageBuffer = await imageResponse.buffer();
          sharp(imageBuffer)
            .resize(1000)
            .toFile(`${coversDir}/${podcastObj.image}`);
        } catch (e) {
          console.log(
            `❌ (parse feed) ${podcast.title} (${podcast.xmlUrl}): ${e.message}`
          );
          return [];
        }
      } else {
        console.log(`❌ (fetch feed) ${podcast.title} (${podcast.xmlUrl})`);
        return [];
      }
      return podcastObj;
    })
  );

  const podcastsSorted = podcasts
    .flat()
    .sort((a, b) => a.title.localeCompare(b.title));

  const formatted = prettier.format(JSON.stringify(podcastsSorted), {
    ...prettierConfig,
    parser: 'json',
  });

  writeFileSync('./data/podcasts.json', formatted);
})();

function hashString(string) {
  let hash = 0;

  if (string.length === 0) {
    return hash;
  }

  for (let i = 0; i < string.length; i++) {
    let chr = string.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}

async function stripHTML(html) {
  const result = await remark().use(strip).process(html);
  return result.toString();
}

function addHTTP(url) {
  return url.includes('://') ? url : `http://${url}`;
}
