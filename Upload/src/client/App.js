import React from 'react';
import './App.css';
import DropArea from './DropArea';
import GalleryArea from './GalleryArea';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };

        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDrop(file) {
        let data = new FormData;
        data.append('picture', file);

        fetch('/upload', {
            method: 'POST',
            body: data
        })
        .then(res => {
            if(res.ok) {
                return Promise.resolve(res.text());
            } else {
                return res.text().then(err => Promise.reject(new Error(err)));
            }
        })

        /* IMAGE UPLOADED */
        .then(src => this.setState(prevState => {
            let state = prevState;
            state.images.unshift(src);

            return state;
        }))

        /* ERRORS HANDLER */
        .catch(err => console.log('Error : ' + err.message));
    }

    render() {
        return(
            <div id='container'>
                <DropArea onDrop={this.handleDrop} />
                <GalleryArea images={this.state.images} />
            </div>
        );
    }
}