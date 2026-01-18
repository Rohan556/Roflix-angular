import { environment } from '../../environments/environment.development';

export const AUTH = {
  TOKEN: environment.TMDB_TOKEN,
};

export const API = {
  ENDPOINT: environment.API_ENDPOINT,
  DISCOVER_MOVIES: 'discover/movie',
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/original',
};

export const API_ENDPOINTS = {
  DISCOVER_MOVIES: 'discover/movie',
  SEARCH_MOVIES: 'search/movie',
};

export enum PAGINATION_CONSTANTS {
  PAGE_LEFT_BUTTON = 'left',
  PAGE_RIGHT_BUTTON = 'right',
}
