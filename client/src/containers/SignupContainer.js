import React from 'react';
import { connect } from 'react-redux';
import { Signupview } from '../components';
import * as actions from '../actions';
import history from '../history';
const $ = window.$
const Materialize = window.Materialize;

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleSignup(username, password) {
        return this.props.onSignup(username, password).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    Materialize.toast('Success!', 2000);
                    history.push('/')
                    return true;
                } else {
                    let errorMessage = ['Invalid username', 'password is too short', 'Username already exists'];
                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Signupview onSignup={this.handleSignup} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    status: state.authentication.getIn(['register','status']),
    errorCode: state.authentication.getIn(['register', 'error'])
});

const mapDispatchToProps = (dispatch) => ({
    onSignup: (username, password) => dispatch(actions.onSignup(username,password))
});
        

const SignupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);

export default SignupContainer;