import { action, makeObservable, observable } from 'mobx';
import { Movie } from '../types/movie';

export class WatchList {
  savedMovies: WatchLater[] = []; // property to observe (either save or remove)

  constructor(watchList: WatchLater[]) {
    makeObservable(this, {
      savedMovies: observable,
      remove: action,
      save: action,
    });
    this.savedMovies = watchList;
  }

  save(watchList: WatchLater): void {
    const movieExist = this.savedMovies.some(
      (movie) => movie.movie.title === watchList.movie.title
    );
    if (!movieExist) {
      this.savedMovies.push(watchList);
    } else {
      alert('Movie already saved.');
    }
  }

  remove(id: number): void {
    const index = this.savedMovies.findIndex((movie) => movie.movie.id === id);
    if (index !== -1) {
      this.savedMovies.splice(index, 1);
    } else {
      alert('Movie not found.');
    }
  }
}

export class WatchLater {
  watched = false; // property to observe
  movie: Movie;

  constructor(movie: Movie) {
    makeObservable(this, {
      watched: observable,
      toggleWatch: action,
    });

    this.movie = movie;
  }

  toggleWatch() {
    this.watched = !this.watched;
  }
}