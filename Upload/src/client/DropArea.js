import React from 'react';

export default class DropArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseOver: false
        };

        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
    }

    handleDragOver(event) {
        event.preventDefault();
        this.setState({mouseOver: true});
    }

    handleDragLeave() {
        this.setState({mouseOver: false});
    }

    handleDrop(event) {
        event.preventDefault();
        this.setState({mouseOver: false});

        let files = event.dataTransfer.files;
        if(!files.length)
            return;

        this.props.onDrop(files[0]);
    }

    render() {
        return(
            <div id='drop-container'>
                <div id='drop-area'
                    draggable='true'
                    onDrop={this.handleDrop}
                    onDragOver={this.handleDragOver}
                    onDragLeave={this.handleDragLeave}
                    className={this.state.mouseOver ? 'transparent' : ''} >
                    <h1>Drop file here</h1>
                </div>
            </div>
        );
    }
}