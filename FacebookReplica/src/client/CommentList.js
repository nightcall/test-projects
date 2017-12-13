import React from 'react';
import { timeSince } from './Utils';

const Comment = ({data: {username, content, timestamp}}) => {
    return(
        <p>{username} says {content}&nbsp;{timeSince(new Date(parseInt(timestamp)))}.</p>
    );
};

export default class CommentList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            comments: this.props.data,
            pendingComment: ''
        };
    }

    handleChange = (event) =>  {
        this.setState({pendingComment: event.target.value});
    }

    handleSubmitComment = (event) => {
        event.preventDefault();

        if(!this.state.pendingComment)
            return;

        this.props.onSubmitComment(this.state.pendingComment);
        this.setState({pendingComment: ''});
    }

    render() {
        const comments = this.props.data;

        return(
            <div id='post-comments'>
                {comments.map(c => <Comment key={c.id} data={c} />)}
                <form onSubmit={this.handleSubmitComment} >
                    <input placeholder='Comment something..'
                        onChange={this.handleChange}
                        value={this.state.pendingComment} />
                </form>
            </div>
        );
    }
}