import React, { Component } from 'react';
import ImagesUploader from 'react-images-uploader';

import 'react-images-uploader/font.css';
import 'react-images-uploader/styles.css';

import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import TextArea from './components/TextArea/TextArea';
import SpeechButton from './components/SpeechButton/SpeechButton';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			translation: '',
			uploadedImagePath: ''
		}
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
	}

	onInputChange = (event) => {
    	this.setState({input: event.target.value});
  	}

	onTextAreaInput = (event) => {
		const { imageUrl, uploadedImagePath, translation } = this.state;
		const textArea = document.getElementById("tArea");

		if (imageUrl && !translation) {
			fetch('http://localhost:3000/imageurl', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					imageUrl: imageUrl
				})
			})
			.then(response => response.json())
			.then(englishTranslation => {
				this.setState({translation: englishTranslation});
				textArea.value = englishTranslation;
			})
			.catch(err => {
				console.log(err);
			})
		}

		if (uploadedImagePath && !translation) {
			const params = {uploadedImagePath: uploadedImagePath};
			const url = new URL('http://localhost:3000/uploadedimage/');
			Object.keys(params)
				.forEach(key => url.searchParams.append(key, params[key]))
			fetch(url, {
				method: 'get',
				headers: {'Content-Type': 'application/json'},				
				body: undefined			
			})
			.then(response => response.json())
			.then(englishTranslation => {
				this.setState({translation: englishTranslation});
				textArea.value = englishTranslation;
			})			
			.catch(err => {
				console.log(err);
			})
		}

	}

	render() {
		const { imageUrl, translation } = this.state;

		return (
		  <div className="App">
		  	<Logo />
		  	<ImageLink 
		  		onInputChange={this.onInputChange} 
		  		onButtonSubmit={this.onButtonSubmit}
		  	/>
			<ImagesUploader
				url="http://localhost:3000/uploadedimage"
				optimisticPreviews
				multiple={false}
				onLoadEnd={(err, imagePath) => {
					if (err) {
						console.log(err);
					}
					if (imagePath) {
						this.setState({uploadedImagePath: imagePath});
					}
				}}
				label="Upload a picture"
			/>

			<div>
				<p>Translation</p>
				<TextArea onTextAreaInput = {this.onTextAreaInput}/> 
			</div>
			<SpeechButton/>
		  </div>
		);
	}
}

export default App;

