const { server, importDatabase } = require('./provider');
const port = process.env.PORT || 3000;

importDatabase();

server.listen(port, () => console.log(`Listening on port ${port}...`));