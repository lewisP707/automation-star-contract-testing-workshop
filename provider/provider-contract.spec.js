const { Verifier } = require('@pact-foundation/pact');
const { importData, movies, server } = require('./provider')

const port = '3001';
const app = server.listen(port, () => console.log(`Listening on port ${port}...`));

importData();

// INSERT OPTIONS HERE
const options = {};

options.pactUrls = ['./pacts/WebConsumer-MoviesAPI.json']

// INTIALIZE VERIFIER HERE
const verifier = new Verifier(options);

describe('Pact Verification', () => {
  test('should validate the expectations of movie-consumer', () => {
    // INSERT VERIFIER HERE
    return
  });
});
