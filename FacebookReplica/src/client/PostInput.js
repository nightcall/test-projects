import React from 'react';

export default class PostInput extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};
	}

	handleChange = (event) => {
		this.setState({value: event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		if(!this.state.value)
			return;

		fetch('/addpost', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
            	// changer username + userid car on les recup coté server via session
            	userid: 1,
            	content: this.state.value
            })
		})
		.then(data => data.json())
		.then(post => {
			this.setState({value: ''});
			this.props.onSubmitPost(post);
		});
	}

	render() {
		return(
			<div id='post-input-container'>
				<form onSubmit={this.handleSubmit} >
					<textarea className='form-control'
						placeholder='What is on your mind ?'
						value={this.state.value}
						onChange={this.handleChange} />
					<button className='btn btn-primary btn-sm'>Submit</button>
				</form>
			</div>
		);
	}
}