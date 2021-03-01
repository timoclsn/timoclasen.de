const fs = require('fs');
const fetch = require('node-fetch');
const parser = require('fast-xml-parser');

(async () => {
    const subsXML = fs
        .readFileSync('./scripts/podcasts/subscriptions.opml')
        .toString();

    const subsJSObj = parser.parse(
        subsXML,
        {
            attributeNamePrefix: '',
            attrNodeName: false,
            ignoreAttributes: false
        },
        true
    ).opml.body.outline;

    const data = await Promise.all(
        subsJSObj.flatMap(async (podcast) => {
            let podcastObj = {
                titel: podcast.title,
                feedUrl: podcast.xmlUrl
            };

            const response = await fetch(podcast.xmlUrl);
            if (response.ok) {
                const podcastXML = await response.text();
                try {
                    const podcastJSObj = parser.parse(
                        podcastXML,
                        {
                            attributeNamePrefix: '',
                            attrNodeName: false,
                            ignoreAttributes: false
                        },
                        true
                    ).rss.channel;

                    podcastObj.title = podcastJSObj.title;
                    podcastObj.description = podcastJSObj.description;
                    podcastObj.website = podcastJSObj.link;
                    podcastObj.image = podcastJSObj.image
                        ? podcastJSObj.image.url
                        : podcastJSObj['itunes:image'].href;
                } catch (e) {
                    console.log(`❌ ${podcast.title} (${podcast.xmlUrl})`);
                    return [];
                }
            } else {
                console.log(`❌ ${podcast.title} (${podcast.xmlUrl})`);
                return [];
            }
            return podcastObj;
        })
    );

    console.log(data);
})();
