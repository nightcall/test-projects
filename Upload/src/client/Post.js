import React from 'react';
import CommentSection from './CommentSection';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            image: '',
            comments: []
        };
    }

    componentDidMount() {
        fetch('/post', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id: this.props.match.params.id
            })
        })
        .then(res => res.json())
        .then(post => this.setState(prevState => {
            let state = prevState;
            state.comments = state.comments.concat(post.comments);
            state.image = post.path;

            return state;
        }));
    }

    render() {
        return(
            <div id='post-container'>
                <div id='image-container'>
                    <img src={'/uploads/' + this.state.image} />
                </div>
                <CommentSection comments={this.state.comments} postID={this.props.match.params.id} />
            </div>
        );
    }
}