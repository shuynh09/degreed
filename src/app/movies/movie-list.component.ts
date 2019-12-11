import { Component } from '@angular/core';
import { IMovie } from './movie';
import { parse } from 'querystring';
import * as data from '../../api/movies/movies.json';

@Component({
  selector: 'pm-movies',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  title = 'Angular: Getting Started';
  filteredMovies: IMovie[];
  movies: IMovie[] = (data as any).default;
  _listFilter = 0;

  constructor() {
    this.filteredMovies = this.movies;
    this.listFilter = 0;
  }

  filter($event): void {
    const $el = $event.target;
    const prevActive = $el.parentElement.querySelector('.active');

    if (prevActive) {
      prevActive.classList.remove('active');
    }
    $el.className += ' active';
    this.listFilter = $el.dataset.year;
  }

  get listFilter(): number {
    return this._listFilter;
  }

  set listFilter(value: number) {
    this._listFilter = Number(value);
    this.filteredMovies = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.movies;
  }

  performFilter(filterBy: number): IMovie[] {
    filterBy = filterBy;
    return this.movies.filter((movie: IMovie) => {
      if (filterBy === 2000) {
        return parseInt(movie.Year, 10) >= 2000;
      } else {
        return (
          parseInt(movie.Year, 10) >= filterBy &&
          parseInt(movie.Year, 10) < filterBy + 10
        );
      }
    });
  }
}
