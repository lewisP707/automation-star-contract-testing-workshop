const path = require('path');
const { addNewMovie, deleteMovie, fetchMovies, fetchSingleMovie } = require('./consumer');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');

const {
  eachLike,
  integer,
  string,
  like
} = MatchersV3;

const provider = new PactV3({
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'WebConsumer',
  provider: 'MoviesAPI',
});

const EXPECTED_BODY = [{ id: 1, name: "My movie", date: 1999 }];

describe('Movies Service', () => {
  describe('When a GET request is made to /movies', () => {
    test('it should return all movies', async () => {
      provider
        .uponReceiving('a request to all movies')
        .withRequest({
          method: 'GET',
          path: '/movies',
        })
        .willRespondWith({
          status: 200,
          body: like(EXPECTED_BODY),
        });

      await provider.executeTest(async mockProvider => {
        const movies = await fetchMovies(mockProvider.url);
        expect(movies[0]).toEqual(EXPECTED_BODY[0]);
      });
    });
  });
});