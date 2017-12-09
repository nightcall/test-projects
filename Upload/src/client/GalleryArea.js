import React from 'react';
import { PropTypes as T } from 'prop-types';

export default class GalleryArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { images } = this.props;

        return(
            <div id='gallery'>
                {images.map((src, i) => <a href={src} key={i} ><img src={src} /></a>)}
            </div>
        );
    }
}