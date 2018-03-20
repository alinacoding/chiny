const fs = require('fs');

//adapted from https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6
const handleAudio = (req, res) => {
	const path = 'static/chinese.wav'
	const stat = fs.statSync(path)
	const fileSize = stat.size
	const range = req.headers.range
	if (range) {
		const parts = range.replace(/bytes=/, "").split("-")
		const start = parseInt(parts[0], 10)
		const end = parts[1] 
			? parseInt(parts[1], 10)
			: fileSize - 1
		const chunksize = (end-start) + 1
		const file = fs.createReadStream(path, {start, end})
		const head = {
			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'audio/wav',
		}
		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			'Content-Length': fileSize,
			'Content-Type': 'audio/wav',
		}
		res.writeHead(200, head)
		fs.createReadStream(path).pipe(res)
	}
}


module.exports = {
	handleAudio
} 