import { XMLParser } from 'fast-xml-parser';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import he from 'he';
import prettier from 'prettier';
import { remark } from 'remark';
import strip from 'remark-strip-html';
import sharp from 'sharp';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  attributesGroupName: false,
});

const favs = [
  'The Vergecast',
  'Decoder with Nilay Patel',
  'Doppelgänger Tech Talk',
  'OMR Podcast',
  'JavaScript Jabber',
  'devtools.fm',
  'This is Product Management',
  'How to Save a Planet',
  'F1: Beyond The Grid',
  'Baywatch Berlin',
];

const coversDir = './public/podcasts';

if (existsSync(coversDir)) {
  rmSync(coversDir, { recursive: true });
}

mkdirSync(coversDir);

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const subsXML = readFileSync('./scripts/podcasts/subscriptions.opml');

  const subsJSObj = parser.parse(subsXML).opml.body.outline;

  const podcasts = await Promise.all(
    subsJSObj.map(async (podcast) => {
      let podcastObj = {};

      const response = await fetch(podcast.xmlUrl);
      if (response.ok) {
        const podcastXML = await response.text();
        try {
          const podcastJSObj = parser.parse(podcastXML).rss.channel;

          podcastObj.title = he.decode(podcastJSObj.title);
          podcastObj.favorite = favs.includes(podcastObj.title);
          podcastObj.feed = podcast.xmlUrl;
          podcastObj.description = await stripHTML(
            he.decode(podcastJSObj.description),
          );
          podcastObj.website = addHTTP(podcastJSObj.link);
          podcastObj.hosts = he.decode(podcastJSObj['itunes:author']);
          podcastObj.categories = findCategories(
            podcastJSObj['itunes:category'],
          );
          podcastObj.image = `cover-${hashString(podcastObj.title)}.jpg`;
          const imageUrl = podcastJSObj.image
            ? podcastJSObj.image.url
              ? podcastJSObj.image.url
              : podcastJSObj.image.href
            : podcastJSObj['itunes:image'].href;
          const imageResponse = await fetch(imageUrl);
          const imageBuffer = await imageResponse.arrayBuffer();
          sharp(Buffer.from(imageBuffer))
            .resize(1000)
            .toFile(`${coversDir}/${podcastObj.image}`);
        } catch (e) {
          console.log(
            `❌ (parse feed) ${podcast.title} (${podcast.xmlUrl}): ${e.message}`,
          );
          return [];
        }
      } else {
        console.log(`❌ (fetch feed) ${podcast.title} (${podcast.xmlUrl})`);
        return [];
      }
      return podcastObj;
    }),
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

const isObject = (value) => {
  return !!(value && typeof value === 'object' && !Array.isArray(value));
};

function findCategories(categoryObj, keyToMatch = 'text') {
  const categories = [];

  if (Array.isArray(categoryObj)) {
    categoryObj.forEach((category) => {
      categories.push(...findCategories(category));
    });
  } else if (isObject(categoryObj)) {
    const entries = Object.entries(categoryObj);

    for (let i = 0; i < entries.length; i += 1) {
      const [objectKey, objectValue] = entries[i];

      if (objectKey === keyToMatch) {
        categories.push(objectValue);
      }

      if (isObject(objectValue) || Array.isArray(objectValue)) {
        categories.push(...findCategories(objectValue, keyToMatch));
      }
    }
  }

  const uniqCategories = [...new Set(categories)];
  const sortedCategories = uniqCategories.sort((a, b) => a.localeCompare(b));

  return sortedCategories;
}
