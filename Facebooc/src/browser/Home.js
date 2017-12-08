import React from 'react';
import Post from './Post';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            canLoadMore: true,
            posts: []
        };
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
                <h1>Home</h1>
                {this.state.posts.map((p, i) => <Post data={p} key={p.id} />)}
            </div>
        );
    }
}