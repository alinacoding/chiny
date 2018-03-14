const request = require('request');
const fs = require('fs');
var path = require('path');
const tesseract = require('tesseract.js')

const extractTextFromImage = (filename) => {
    tesseract.recognize(filename, {lang: "chi_sim"})
    .then(console.log)
    .progress(progress => {
      console.log('progress', progress)
    })
    .catch(err => {
      console.log(err);
    })
    .then(function (result) {
      console.log(result.text);
    })
    .catch(err => {
      console.log(err);
    });
}

const downloadFile = (imageUrl, filename, translateImage) => {
    request(imageUrl)
      .pipe(fs.createWriteStream(filename))
      .on('close', function() {
        console.log(`${imageUrl} saved to ${filename}`);
        translateImage(filename);

      })
      .on('error', function(err) {
        console.log(err)
      })
}

const processUrl = (imageUrl, downloadFile) => {
  request.head(imageUrl, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    const fileExtension = res.headers['content-type'].split('/')[1];
    const filename = path.resolve(__dirname) + '/image.' + fileExtension;
    downloadFile(imageUrl, filename, extractTextFromImage);
  });
};

const handleImageUrl = (req, res) => {
  const { imageUrl } = req.body;
  if (imageUrl) {
    processUrl(imageUrl, downloadFile);
    res.send('finished processing the file');
  } else {
    res.status(400).send("Did not receive url");
  }
}

module.exports = {
	handleImageUrl
}