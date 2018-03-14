const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const imageurl = require('./controllers/imageurl');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send('hello');
})

app.post('/imageurl', (req, res) => {imageurl.handleImageUrl(req, res)})

const PORT = process.env.PORT || 3000 ;
app.listen(PORT, ()=> {
  console.log(`app is running on port ${PORT}`);
})
