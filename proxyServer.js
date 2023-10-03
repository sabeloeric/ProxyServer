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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
