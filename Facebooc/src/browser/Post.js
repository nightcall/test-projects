import React from 'react';

const Comment = (props) => {
    const { text } = props.data;
    return <p>{text}</p>;
};

export default class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            id,
            date,
            text,
            comments
        } = this.props.data;

        return(
            <div className='post'>
                <h3>{text}</h3>
                <h5>Posted {new Date(date).toLocaleDateString()} at {new Date(date).toLocaleTimeString()}</h5>
                <div id='comments'>
                    {comments.map(c => <Comment data={c} key={c.id} />)}
                </div>
            </div>
        );
    }
}