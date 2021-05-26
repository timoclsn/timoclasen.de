import fs from 'fs';

export function getPodcasts() {
    return JSON.parse(fs.readFileSync('./data/podcasts.json', 'utf-8'));
}

export function getFavoritePodcasts() {
    const podcasts = getPodcasts();
    return podcasts.filter((podcast: any) => podcast.favorite);
}
