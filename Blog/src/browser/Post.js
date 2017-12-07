import React from 'react';
import { Link } from 'react-router-dom';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            post: {},
            message: 'Your message here',
            author: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
    }

    handleChangeAuthor(e) {
        this.setState({author: e.target.value});
    }

    handleChangeMessage(e) {
        this.setState({message: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        if(!this.state.message
        || !this.state.author) {
            return;
        }

        fetch('/comment',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    postId: this.state.post.id,
                    author: this.state.author,
                    message: this.state.message
                })
            }
        )
        .then(data => data.json())
        .then(comments => this.setState(prevState => {
            let state = prevState;
            state.post.comments = comments;
            state.message = '';

            return state;
        }));
    }

    componentDidMount() {
        fetch('/post',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({postId: this.props.match.params.postId})
            }
        )
        .then(data => data.json())
        .then(post => this.setState({post: post, isLoading: false}))
        .then(() => document.title = this.state.post.title);
    }

    render() {
        if(this.state.isLoading) {
            return <h3>Loading post...</h3>;
        } else {
            return(
                <div>
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.text}</p>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Pseudo : 
                            <input onChange={this.handleChangeAuthor} value={this.state.author} /><br />
                        </label>
                        <textarea onChange={this.handleChangeMessage} value={this.state.message}></textarea><br />
                        <button>
                            Send comment !
                        </button>
                    </form>
                    {this.state.post.comments.map((c, i) => <p key={i}><strong>[{c.author} says]</strong>: {c.message}</p>)}
                    <Link to='/'>BACK TO HOME</Link>
                </div>
            );
        }
    }
}

export default Post;