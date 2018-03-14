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
		return (
		  <div className="App">
		  	<Logo />
		  	<ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
		  	<ImageRecognition imageUrl={imageUrl}/>
		  </div>
		);
	}
}

export default App;
