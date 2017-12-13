import React from 'react';
import { timeSince } from './Utils';
import { Link } from 'react-router-dom';

export default class Post extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			username,
			timestamp,
			content,
			comments
		} = this.props.data;

		return(
			<div className='post-container'>
				<h3><Link to={`/${username}`} >{username}</Link></h3>
				<h6>Posted {timeSince(new Date(parseInt(timestamp)))}.</h6>
				<p>{content}</p>
				<div>
					{comments.map(c => <p key={c.id} >{c.username} : {c.content}</p>)}
				</div>
			</div>
		);
	}
}