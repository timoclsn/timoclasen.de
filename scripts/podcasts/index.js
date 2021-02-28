const fs = require('fs/promises');
const convert = require('xml-js');

(async () => {
    const subsXML = await fs.readFile('./scripts/podcasts/subscriptions.opml');
    const subsJSON = convert.xml2json(subsXML, {
        compact: true,
        spaces: 2
    });
    console.log(subsJSON);
})();
