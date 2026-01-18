import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { API } from '../utils/constants';
import { map, Observable, shareReplay } from 'rxjs';
import { Movie, MovieResponse } from '../../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movieCache = new Map();
  constructor(private apiService: APIService) {}

  getMovieData(args?: any): Observable<MovieResponse> {
    console.log(this.movieCache.has(args.page));
    if (!this.movieCache.has(args.page)) {
      console.log('Adding to cache');
      const movieObserver = this.apiService
        .get<MovieResponse>(API.DISCOVER_MOVIES, args)
        .pipe(
          map((response) => ({
            ...response,
            results: response.results.map((movie) => ({
              ...movie,
              poster_path: movie.poster_path
                ? `${API.TMDB_IMAGE_BASE_URL}${movie.poster_path}`
                : '',
              backdrop_path: movie.backdrop_path
                ? `${API.TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`
                : '',
            })),
          })),
          shareReplay(1),
        );
      this.movieCache.set(args.page, movieObserver);
      return movieObserver;
    }

    console.log('From cache');

    return this.movieCache.get(args.page);
  }

  searchMovies(query: string = ''): Observable<MovieResponse> {
    return this.apiService.get<MovieResponse>(`search/movie`, { query }).pipe(
      map((response) => ({
        ...response,
        results: response.results.map((movie) => ({
          ...movie,
          poster_path: movie.poster_path
            ? `${API.TMDB_IMAGE_BASE_URL}${movie.poster_path}`
            : '',
          backdrop_path: movie.backdrop_path
            ? `${API.TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`
            : '',
        })),
      })),
    );
  }
}
