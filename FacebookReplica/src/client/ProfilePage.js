import React from 'react';

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		const username = this.props.match.params.username;

		return(
			<div className='flex-container container_1024'>
				{username}
			</div>
		);
	}
}