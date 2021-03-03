const fs = require('fs');

export function getPodcastData() {
    return JSON.parse(fs.readFileSync('./data/podcasts.json'));
}
