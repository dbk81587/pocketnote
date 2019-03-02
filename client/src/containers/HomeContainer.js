import React, { Component } from 'react';
import { PostContainer, NoteContainer } from './';

class HomeContainer extends Component {
    render() {
        return (
            <div className="container">
                <PostContainer />
                <NoteContainer />
            </div>
        )
    }
};


export default HomeContainer;