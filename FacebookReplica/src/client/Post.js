import React from 'react';
import { timeSince } from './Utils';
import { Link } from 'react-router-dom';
import CommentList from './CommentList';

export default class Post extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            comments : this.props.data.comments
        };
    }

    handleSubmitComment = (comment) => {
        const { id } = this.props.data;

        fetch('/addcomment', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                postid: id,
                content: comment
            })
        })
        .then(data => data.json())
        .then(c => {
            this.setState({
                comments: [...this.state.comments, c]
            });
        });
    }

    render() {
        const {
            username,
            timestamp,
            content
        } = this.props.data;

        return(
            <div className='post-container'>
                <h3><Link to={`/${username}`} >{username}</Link></h3>
                <h6>Posted {timeSince(new Date(parseInt(timestamp)))}.</h6>
                <p>{content}</p>
                <div>
                    <CommentList data={this.state.comments}
                        onSubmitComment={this.handleSubmitComment} />
                </div>
            </div>
        );
    }
}