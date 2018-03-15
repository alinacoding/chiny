const request = require('request');
const fs = require('fs');
const path = require('path');
const tesseract = require('tesseract.js')
const translate = require('google-translate-api');


const handleImageUrl = (req, res) => {
  const { imageUrl } = req.body;
  if (imageUrl) {
    request.head(imageUrl, function(err, response, body){
        console.log('content-type:', response.headers['content-type']);
        const fileExtension = response.headers['content-type'].split('/')[1];
        const filename = path.resolve(__dirname) + '/image.' + fileExtension;
        request(imageUrl)
          .pipe(fs.createWriteStream(filename))
          .on('close', function() {
                console.log(`${imageUrl} saved to ${filename}`);
                tesseract.recognize(filename, {lang: "chi_sim"})
                .progress(progress => {
                  console.log('progress', progress)
                })
                .catch(err => {
                  console.log(err);
                })
                .then(function(result) {
                  console.log(result.text);
                  translate(result.text, {to: 'en'})
                    .then(rez => {
                      console.log(rez.text);
                      console.log(rez.from.language.iso);
                      })
                    .catch(err => {
                      console.error(err);
                  })
                  res.json(result.text);
                })
                .catch(err => {
                  console.log(err);
                });
          })
          .on('error', function(err) {
            console.log(err)
          })
    });
  } else {
      res.status(400).send('Did not receive url');
  }  
}

module.exports = {
	handleImageUrl
} 