const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const corsPrefetch = require('cors-prefetch-middleware').default;
const imagesUpload = require('images-upload-middleware').default;

const imageurl = require('./controllers/imageurl');

const app = express();

app.use(cors());	
app.use(bodyParser.json());

app.use('/static', express.static('./static'));

app.get('/', (req, res)=> {
  res.send('hello');
})

app.post('/imageurl', (req, res) => {imageurl.handleImageUrl(req, res)})


app.post('/uploadedimage', imagesUpload(
    './static/',
    'http://localhost:3000/static/'
));

const PORT = 3000 ;
app.listen(PORT, ()=> {
  console.log(`app is running on port ${PORT}`);
})
