import React from 'react';

const Comment = (props) => {
    <p></p>
};

export default class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.comments);

        this.state = {
            pendingComment: '',
            comments: this.props.comments
        };

        this.submitComment = this.submitComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({pendingComment: e.target.value});
    }

    submitComment(e) {
        e.preventDefault();

        if(!this.state.pendingComment)
            return;

        fetch('/comment', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id: this.props.postID,
                comment: this.state.pendingComment
            })
        })
        .then(res => res.text())
        .then(resp => this.setState(prevState => {
            let state = prevState;
            state.comments.push(resp);
            state.pendingComment = '';

            return state;
        }));
    }

    render() {
        console.log(this.state.comments.length);

        return(
            <div id='comment-section'>
                {this.state.comments.map((c, i) => <p key={i} >{c.content}</p>)}
                <form onSubmit={this.submitComment} >
                    <input value={this.state.pendingComment} onChange={this.handleChange} />
                </form>
            </div>
        );
    }
}