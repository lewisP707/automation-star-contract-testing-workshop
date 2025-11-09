const path = require('path');
const { addNewMovie, deleteMovie, fetchMovies, fetchSingleMovie } = require('./consumer');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');

const {
  eachLike,
  integer,
  string,
  date
} = MatchersV3;

const provider = new PactV3({
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'WebConsumer',
  provider: 'MoviesAPI',
});

describe('Movies Service', () => {
  const MOVIE_BODY = { id: 1, name: "My movie", date: "1999-01-01" };

  describe('When a GET request is made to a specific movie ID', () => {
    test('it should return a specific movie', async () => {
      const testId = 100;
      MOVIE_BODY.id = testId;

      provider
        .given('Has a movie with specific ID', { id: testId })
        .uponReceiving('a request to a specific movie')
        .withRequest({
          method: 'GET',
          path: `/movie/${testId}`,
        })
        .willRespondWith({
          status: 200,
          body: {
            id: integer(testId),
            name: string(MOVIE_BODY.name),
            date: integer(1999),
          }
        });

      await provider.executeTest(async mockProvider => {
        const movie = await fetchSingleMovie(mockProvider.url, testId);
        expect(movie.id).toEqual(MOVIE_BODY.id);
        expect(movie.name).toEqual(MOVIE_BODY.name);
      });
    });
  });
});