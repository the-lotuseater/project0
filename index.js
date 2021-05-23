const express = require('express');
const redis = require('redis');
const process = require('process')

const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379,
});
client.set('visits', 0);

/**
 * One simple endpoint to return the number of times this api is hit. Cache the information in an instance of redis client.
 */
app.get('/', (req, res) => {
  //uncomment the line below to get a fully functioning web app that prints the number of visits.
  process.exit(0); // add an exit with a status code 0. This code is a exit because you want to and that there was no problem in the container.
  client.get('visits', (err, visits) => {
    res.send('Number of visits ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});
