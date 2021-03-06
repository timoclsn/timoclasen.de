const fs = require('fs');

export function getPodcasts() {
    return JSON.parse(fs.readFileSync('./data/podcasts.json'));
}
