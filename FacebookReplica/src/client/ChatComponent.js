import React from 'react';

const ChatSearchBar = (props) => {
	return(
		<div id='chat-search-bar'>
			<form onSubmit={e => e.preventDefault()} >
				<input placeholder='Search chat..' />
			</form>
		</div>
	);
};

const ChatList = (props) => {
	return(
		<div id='chat-list'>
			<p>List</p>
		</div>
	);
};

export default class ChatComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div id='chat-container'>
				<ChatList />
				<ChatSearchBar />
			</div>
		);
	}
}