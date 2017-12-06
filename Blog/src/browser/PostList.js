import React from 'react';
import { Link } from 'react-router-dom';

class PostList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			canLoadMore: true,
			posts: []
		};

		this.loadPosts = this.loadPosts.bind(this);
	}

	componentDidMount() {
		this.loadPosts();
		document.title = `Saraband's Blog`;
	}

	loadPosts() {
		fetch('/posts',
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					from: this.state.posts.length,
					to: this.state.posts.length + 5
				})
			}
		)
		.then(data => data.json())
		.then(results => this.setState(prevState => {
			let state = prevState;
			state.posts = state.posts.concat(results.posts);
			state.canLoadMore = results.canLoadMore;
			state.isLoading = false;

			return state;
		}));
	}

	render() {
		if(this.state.isLoading) {
			return <h2>Post list loading...</h2>;
		}

		return(
			<div id='postlist'>
				<h1>Saraband's blog</h1>
				{this.state.posts.map(p => {
					return(
						<div className='post' key={p.id} >
							<h2>{p.title}</h2>
							<p>{p.text}</p>
							<Link to={`/post/${p.id}`}>{p.comments.length} comments.</Link>
						</div>
					);
				})}

				{/* Can load more posts ? */}
				{this.state.canLoadMore ? 
					<a href='#' onClick={(e) => {e.preventDefault(); this.loadPosts();}}>Load more posts</a>
					: null}
			</div>
		);
	}
}

export default PostList;