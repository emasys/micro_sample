const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const servicesURI = {
  eventBus: 'event-bus-srv:4005',
  posts: 'posts-clusterip-srv:4000',
  query: 'query-srv:4002',
  comments: 'comments-srv:4001',
  moderation: 'moderation-srv:4003'
}

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);
  console.log(`now processing ${JSON.stringify(event)}`)

  axios.post(`http://${servicesURI.posts}/events`, event);
  axios.post(`http://${servicesURI.query}/events`, event);
  axios.post(`http://${servicesURI.comments}/events`, event);
  axios.post(`http://${servicesURI.moderation}/events`, event);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on event-bus-srv:4005');
});
