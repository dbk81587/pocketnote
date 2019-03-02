import React from 'react';
import { connect } from 'react-redux';
import { Loginview } from '../components';
import * as actions from '../actions';
import history from '../history';
const $ = window.$
const Materialize = window.Materialize;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(username, password) {
        return this.props.onLogin(username, password).then(
            () => {
                if(this.props.status === true) {
                    let loginData = {
                        isLoggedIn: true,
                        currentUser: username
                    };
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    history.push('/');
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Loginview onLogin={this.handleLogin} />
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    status: state.authentication.getIn(['status', 'isLoggedIn'])
});

const mapDispatchToProps = (dispatch) => ({
    onLogin: (username, password) => dispatch(actions.onLogin(username,password))
});

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;