import React from 'react';
import PostInput from './PostInput';
import Post from './Post';

export default class PostList extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			canLoadMore: true
		};
	}

	handleSubmitPost = (post) => {
		this.setState(prevState => ({
			posts: [post, ...prevState.posts]
		}));
	}

	loadPosts = (num = 5) => {
		fetch('/postslist', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'same-origin'
		})
		.then(data => data.json())
		.then(posts => {
			this.setState(prevState => ({
				posts: [...prevState.posts, ...posts]
			}));
		});
	}

	componentDidMount() {
		this.loadPosts(10);
	}

	render() {
		return(
			<div id='body-container'>
				<PostInput onSubmitPost={this.handleSubmitPost} />
				{this.state.posts.map(p => <Post data={p} key={p.id} />)}
			</div>
		);
	}
}