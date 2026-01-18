import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../../models/movie';
import { debounceTime, filter, Subscription, switchMap } from 'rxjs';
import { CardDirective } from '../../directives/card.directive';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  imports: [
    CardDirective,
    CommonModule,
    ReactiveFormsModule,
    PaginationComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  movies: Movie[] = [];
  searchedMovies: Movie[] = [];
  subscriptions: Subscription[] = [];
  searchString = new FormControl('');
  isSearchMade: boolean = Boolean(this.searchString.value);
  pageNum = 1;
  totalCount = 0;

  constructor(
    private title: Title,
    private movieService: MovieService,
  ) {
    title.setTitle('Roflix - Home');
  }

  ngOnInit() {
    this.handleMovieFetch(this.pageNum);
    const searchStringSubscription = this.searchString.valueChanges
      .pipe(
        debounceTime(800),
        filter((data) => {
          const searchTruth = Boolean(data);

          if (!searchTruth) this.isSearchMade = false;
          return searchTruth;
        }),
        switchMap((value) => this.movieService.searchMovies(value ?? '')),
      )
      .subscribe((data) => {
        this.isSearchMade = true;
        this.searchedMovies = data.results;
      });

    this.subscriptions.push(searchStringSubscription);
  }

  handleMovieFetch(page: number) {
    const movieSubscription = this.movieService
      .getMovieData({ page })
      .subscribe((data) => {
        this.totalCount = data.total_results;
        this.movies = data.results;
      });

    this.subscriptions.push(movieSubscription);
  }

  handlePagination(presenPageNumber: number) {
    this.handleMovieFetch(presenPageNumber);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
