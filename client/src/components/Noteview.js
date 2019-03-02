import React from 'react';
import './Noteview.css';
import PropTypes from 'prop-types';
const $ = window.$;

class Noteview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleEdit: this.props.title,
            memoEdit: this.props.memo
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        $('.dropdown-button').dropdown({
            constrainWidth: false,
            belowOrigin: true
        });
        $('.modal-trigger').ready(function(){
            $('.modal').modal();
        });
    };
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleDelete() {
        let index = this.props.index;
        let id = this.props.id
        this.props.deleteMemo(index, id)
    };

    handleEdit() {
        let index = this.props.index;
        let title = this.state.titleEdit;
        let memo = this.state.memoEdit;
        let id = this.props.id
        this.props.editMemo(index, title, memo, id);
    };
    render() {
        return (
            <div className="card singleCard yellow lighten-2">
                <div className="card-content">
                    <span className="card-title grey-text text-darken-4">{this.props.title}<i data-activates={`dropdown-${this.props.index}`}  className="vert dropdown-button material-icons right">more_vert</i></span>
                    <div className="noteMain">{this.props.memo}</div>
                </div>
                <ul id={`dropdown-${this.props.index}`} className="dropdown-content">
                    <li className="modal-trigger" href={`#modal-${this.props.index}`}><span>Edit</span></li>
                    <li class="divider"></li>
                    <li onClick={ this.handleDelete }><span>Remove</span></li>
                </ul>
                <div id={`modal-${this.props.index}`} className="modal modalForm">
                    <form onSubmit={ e => {
                        e.preventDefault()
                    }}className="center">
                        <i className="modal-close material-icons right clearBtn">clear</i>
                        <div className="input-field titleInput">
                            <input name="titleEdit" onChange={this.handleChange} value={this.state.titleEdit} autoComplete="off" id="titleEdit" type="text" />
                            
                        </div>
                        <div className="input-field noteInput">
                            <textarea name="memoEdit" onChange={this.handleChange} value={this.state.memoEdit} id="memoEdit" className="materialize-textarea"></textarea>
                            
                        </div>
                        <button type="submit" onClick={ this.handleEdit } className="modal-close btn waves-effect waves-light blue">Edit</button>
                    </form>
                </div>
                
            </div>
        )
    }
};

Noteview.propTypes = {
    title: PropTypes.string,
    memo: PropTypes.string,
    deleteMemo: PropTypes.func
};

Noteview.defaultProps = {
    title: '',
    memo: '',
    deleteMemo: () => console.warn('deleteMemo not defined')
};

export default Noteview;