import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// PUT HYDRATE WHEN RENDERED SERVER SIDE
ReactDOM.hydrate(<BrowserRouter>
                    <App {...initialState} />
                </BrowserRouter>,
                document.getElementById('root'));
