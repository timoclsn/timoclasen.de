const fs = require('fs');

export function getPodcasts() {
    return JSON.parse(fs.readFileSync('./data/podcasts.json'));
}

export function getFavoritePodcasts() {
    const podcasts = getPodcasts();
    return podcasts.filter((podcast: any) => podcast.favorite);
}
