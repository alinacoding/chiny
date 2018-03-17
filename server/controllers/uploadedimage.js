const tesseract = require('tesseract.js');
const translate = require('google-translate-api');
const imagesUpload = require('images-upload-middleware').default;

const handleImageUpload = (req, res) => {

	const { uploadedImagePath } = req.query;
	const filename = uploadedImagePath.split('/').pop()
	const filePath = './static/' + filename;

	tesseract.recognize(filePath, {lang: "chi_sim"})
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
			res.json(rez.text);
			console.log(rez.text);
			console.log(rez.from.language.iso);
		})
		.catch(err => {
			console.error(err);
		})
	})
	.catch(err => {
		console.log(err);
	});	
}



module.exports = {
	handleImageUpload
} 