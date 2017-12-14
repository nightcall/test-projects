import React from 'react';
import PostInput from './PostInput';
import PostList from './PostList';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('HomePage mounted')
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        return(
            <React.Fragment>
                <div id='sidebar-container'></div>
                <div id='body-container'>
                    <PostList />
                </div>
            </React.Fragment>
        );
    }
}