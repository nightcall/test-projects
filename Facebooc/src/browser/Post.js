import React from 'react';

const Comment = (props) => {
    const {
        id,
        user,
        content,
        date
     } = props.data;

    return <p className='comment'>{user.username} says : {content}</p>;
};

export default class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: ''
        };

        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    handleSubmitComment(event) {
        event.preventDefault();

        /* SUBMIT COMMENT TODO */
        window.alert(`Posted a comment:'${this.state.comment}'`);
    }

    handleCommentChange(event) {
        this.setState({comment: event.target.value});
    }

    render() {
        const {
            id,
            user,
            date,
            content,
            comments
        } = this.props.data;

        return(
            <div className='post'>
                <h3>{content}</h3>
                <h5>Posted {new Date(date).toLocaleDateString()} at {new Date(date).toLocaleTimeString()}</h5>
                <div id='comments'>
                    {comments.map(c => <Comment data={c} key={c.id} />)}
                </div>
                <form onSubmit={this.handleSubmitComment} >
                    <input className='addcomment'
                        placeholder='Add a comment...'
                        onChange={this.handleCommentChange}
                        value={this.state.comment} />
                </form>
            </div>
        );
    }
}