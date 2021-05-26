import fs from 'fs';

export interface Podcast {
    title: string;
    description: string;
    hosts: string;
    image: string;
    link: string;
    favorite: boolean;
}

export function getPodcasts(): Podcast[] {
    return JSON.parse(fs.readFileSync('./data/podcasts.json', 'utf-8'));
}

export function getFavoritePodcasts() {
    const podcasts = getPodcasts();
    return podcasts.filter((podcast: Podcast) => podcast.favorite);
}
