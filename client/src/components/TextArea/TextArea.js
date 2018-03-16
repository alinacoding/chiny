import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';


const TextArea = ({ onTextAreaInput, translation }) => {

	return(
		<TextareaAutosize 
			id="tArea"
			style={{ minHeight: 200, maxHeight: 100 }} 
			onChange = {onTextAreaInput()}
		/>

	);
		
}

export default TextArea;
