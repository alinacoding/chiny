const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const corsPrefetch = require('cors-prefetch-middleware').default;
const imagesUpload = require('images-upload-middleware').default;
const imageurl = require('./controllers/imageurl');
const uploadedimage = require('./controllers/uploadedimage');
const audio = require('./controllers/audio');

const app = express();

app.use(cors());	
app.use(bodyParser.json());
app.use(imagesUpload)
app.use(corsPrefetch);

app.use('/static', express.static('./static'));

app.get('/', (req, res)=> {
  res.send('hello');
})

app.post('/imageurl', (req, res) => {imageurl.handleImageUrl(req, res)})

app.post('/uploadedimage', 	
	imagesUpload(
		'./static/',
		'http://localhost:3000/static/'
	)	
)

app.get('/uploadedimage', (req, res) => {uploadedimage.handleImageUpload(req, res)});

app.get('/audio', (req, res) => {audio.handleAudio(req, res)});


const PORT = 3000;
app.listen(PORT, ()=> {
  console.log(`app is running on port ${PORT}`);
})
