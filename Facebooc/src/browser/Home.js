import React from 'react';
import Post from './Post';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            canLoadMore: true,
            post: '',
            posts: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({post: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if(!this.state.post)
            return;

        fetch('/post', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify({post: this.state.post})
        })
        .then(data => data.json())
        .then(post => {
            this.setState(prevState => {
                let state = prevState;
                state.post = '';
                state.posts.unshift(post);

                return state;
            });
        });
    }

    getNewsFeed() {
        return fetch('/newsfeed', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify({
                from: this.state.posts.length,
                to: this.state.posts.length + 5
            })
        })
        .then(data => data.json())
        .then(results => {
            this.setState(prevState => {
                let state = prevState;
                state.posts = state.posts.concat(results.posts);
                state.canLoadMore = results.canLoadMore;

                return state;
            });
        });
    }

    componentDidMount() {
        this.getNewsFeed();
    }

    render() {
        return(
            <div id='home'>
                <h1>My Newsfeed</h1>
                <form id='submitpost' onSubmit={this.handleSubmit} >
                    <textarea placeholder='How are you feeling today ?'
                        onChange={this.handleChange}
                        value={this.state.post} />
                    <button>Submit !</button>
                </form>
                {this.state.posts.map((p, i) => <Post data={p} key={p.id} />)}
            </div>
        );
    }
}