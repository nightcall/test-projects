import React from 'react';
import PostInput from './PostInput';
import PostList from './PostList';

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('HomePage mounted')
	}

	shouldComponentUpdate() {
		return true;
	}

	render() {
		return(
			<div className='flex-container container_1024'>
				<div id='sidebar-container'>
				[sidebar]
				</div>
				<PostList />
			</div>
		);
	}
}