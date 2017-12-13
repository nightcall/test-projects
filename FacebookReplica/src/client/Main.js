import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Will be passed later through server-side rendering
const initialState = {
	isLoggedIn: true,
	username: 'sara'
};

// PUT HYDRATE WHEN RENDERED SERVER SIDE
ReactDOM.render(<BrowserRouter>
					<App {...initialState} />
				</BrowserRouter>,
				document.getElementById('root'));
