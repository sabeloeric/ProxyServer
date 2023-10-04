const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const corsOptions = {
  origin: '*', // Allow requests from any origin
};

app.use(cors(corsOptions));

app.get('/proxy', (req, res) => {
  const url = req.query.url;

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(500).send('Error fetching data');
    }
  });
});

app.get('/proxy/google/', (req, res) => {
  const url = "https://maps.googleapis.com/maps/api" + req.query.url;

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(500).send('Error fetching data');
    }
  });
});


app.get('/places', (req, res) => {
  const query = req.query.query;
  const apiKey = req.query.apiKey;

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&language=en&key=${apiKey}`;

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(500).send('Error fetching data');
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
