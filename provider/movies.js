class Movie {
  id;
  name;
  date;

  constructor() {
    this.movies = [];
  }

  getMovies() {
    return this.movies;
  }

  getMovieById(id) {
    return this.movies.find((movie) => parseInt(id) == movie.id);
  }

  getMovieByName(name) {
    return this.movies.find(movie => movie.name === name)
  }

  insertMovie(movie) {
    let insert = new Movie();
    insert = {
      id: movie.id,
      name: movie.name,
      date: movie.date
    };
    this.movies.push(insert);
  }

  getFirstMovie() {
    return this.movies[0];
  }
}

module.exports = Movie;