import React, { Component } from 'react';

class Chevronicon extends Component {
	render() { 
		return (
			<svg className="icon icon--chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path color="currentColor" d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>			
		);
	}

}

export default Chevronicon;

