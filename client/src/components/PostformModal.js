import React from 'react';
import './Postview.css';
import PropTypes from 'prop-types';

const PostformModal = ({ onCreate }) => {
    let titleInput;
    let memoInput;
    return (
        <div>
            <div id="modal1" className="modal modalForm">
                <form onSubmit={ e => {
                    e.preventDefault();
                    titleInput.value = '';
                    memoInput.value = '';
                    document.getElementById('title1').className = '';
                    document.getElementById('memo1').className = '';
                    document.getElementById('memo').style.height = '42px'
                }}className="center">
                    <i className="modal-close material-icons right clearBtn">clear</i>
                    <div className="input-field titleInput">
                        <input ref={node => titleInput = node} name="title" autoComplete="off" id="title" type="text" />
                        <label id="title1" for="title">Title</label>
                    </div>
                    <div className="input-field noteInput">
                        <textarea name="memo" ref={node => memoInput = node} id="memo" className="textArea materialize-textarea"></textarea>
                        <label id="memo1" for="memo">Memo</label>
                    </div>
                    <button type="submit" onClick={() => onCreate(titleInput.value, memoInput.value) } className="modal-action modal-close btn waves-effect waves-light blue">Submit</button>
                </form>
            </div>
        </div>
    )
};

PostformModal.propTypes = {
    onClose: PropTypes.func,
    onCreate: PropTypes.func,
    onEdit: PropTypes.func
};

PostformModal.defaultProps = {
    onClose: () => console.warn('onClose not defined'),
    onCreate: () => console.warn('onCreate not defined'),
    onEdit: () => console.warn('onEdit not defined')
}

export default PostformModal;