const request = require('request');
const fs = require('fs');
var path = require('path');

const downloadFile = (imageUrl, filename) => {
    request(imageUrl)
      .pipe(fs.createWriteStream(filename))
      .on('close', function() {
        console.log(filename);
        console.log(`${imageUrl} saved to ${filename}`);
      })
      .on('error', function(err) {
        console.log(err)
      })
}


const processFile = (imageUrl, filename, downloadFile, sendResponse) => {
  request.head(imageUrl, filename, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    const fileExtension = res.headers['content-type'].split('/')[1];
    filename += fileExtension;
    downloadFile(imageUrl, filename);
    sendResponse(filename);
  });
};

const handleImageUrl = (req, res) => {
  const { imageUrl } = req.body;
  if (imageUrl) {
    console.log('received url');
    let filename = path.resolve(__dirname) + '/image.';
    processFile(imageUrl, filename, downloadFile, function(filename){
      res.send(`downloaded ${filename}`);
    });
  } else {
    res.status(400).send("Did not receive url");
  }
}


module.exports = {
	handleImageUrl
}