import React, { Component } from 'react';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: ''
		}
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
	}

	onInputChange = (event) => {
    	this.setState({input: event.target.value});
  	}

	render() {
		const { imageUrl } = this.state;
		console.log(imageUrl);
		// if (imageUrl) {
		// 	fetch('http://localhost:3000/imageurl', {
		// 		method: 'post',
		// 		headers: {'Content-Type': 'application/json'},
		// 		body: JSON.stringify({
		// 			imageUrl: imageUrl
		// 		})
		// 	})
		// 	.then(console.log)

		// 	.then(response => response.json())
		// }

		return (
		  <div className="App">
		  	<Logo />
		  	<ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
		  	<ImageRecognition imageUrl={`https://www.brainscape.com/blog/wp-content/uploads/2011/08/hanzi_xingyunliushui-006.jpg`}/>
		  </div>
		);
	}
}

export default App;