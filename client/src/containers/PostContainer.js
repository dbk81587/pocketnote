import React from 'react';
import * as actions from '../actions';
import PostformModal from '../components/PostformModal'
import { connect } from 'react-redux';
const $ = window.$

class PostContainer extends React.Component {
    componentDidMount() {
        $('.modal-trigger').ready(function(){
            $('#modal1').modal();
        });
    }
    render() {
        return (
            <div className="center">
                <div href="#modal1" className="modal-trigger btn-floating btn-large waves-effect waves-light postBtn">
                    <i class="material-icons">add</i>
                </div>
                <PostformModal onCreate={ this.props.postMemo } />
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    postMemo: (title, memo) => dispatch(actions.postMemo(title, memo))
});

export default connect(null, mapDispatchToProps)(PostContainer);