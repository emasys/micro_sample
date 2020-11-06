const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const serviceURI = 'event-bus-srv:4005';
const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('fuck') ? 'rejected' : 'approved';

    await axios.post(`http://${serviceURI}/events`, {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
