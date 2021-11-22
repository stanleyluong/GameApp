export interface Game {
    id: string;
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: number;
    genres: Array<Genre>;
    parent_platforms: Array<ParentPlatform>;
    publishers: Array<Publishers>;
    ratings: Array<Rating>;
    screenshots: Array<Screenshots>;
    trailers: Array<Trailer>;
    esrb_rating: any;
    reddit_name: string;
    reddit_url: string;
    developers: Array<Developer>;
}

export interface APIResponse<T> {
    results: Array<T>;
}

interface Developer {
    games_count: number,
    id: number,
    image_background: string,
    name: string,
    slug: string
}

interface Genre {
name: string;
}

interface ParentPlatform {
platform: {
    name: string;
};
}

interface Publishers {
name: string;
}

interface Rating {
id: number;
count: number;
title: string;
}

interface Screenshots {
image: string;
}

interface Trailer {
data: {
    max: string;
};
}