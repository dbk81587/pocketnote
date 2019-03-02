import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Loginview = ({ onLogin }) => {
    let usernameinput;
    let passwordinput;
    let onKeyPress = (e) => {
        if(e.charCode === 13) {
            onLogin(usernameinput.value.toLowerCase(), passwordinput.value.toLowerCase());
        } else {
            return
        }
    }
    return (
        <div className="container">
            <div className="center">
                <div>
                    <h1>Login</h1>
                </div>
                <div className="loginForm center">
                    <div className="input-field">
                        <input type="text" autoComplete="off" ref={node => usernameinput = node} name="username" className="validate" id="username" />
                        <label for="username">Username</label>
                    </div>
                    <div class="input-field">
                        <input type="password" onKeyPress={onKeyPress} ref={node => passwordinput = node} name="password" className="validate" id="password" />
                        <label for="password">Password</label>
                    </div>
                    <button type='submit' className="waves-effect waves-light btn" onClick={() => onLogin(usernameinput.value.toLowerCase, passwordinput.value.toLowerCase)}>Login</button>
                </div>
                <Link to="/signup">Create an account</Link>
            </div>
        </div>
    )
};

Loginview.propTypes = {
    onLogin: PropTypes.func
};

Loginview.defaultProps = {
    onLogin: () => console.warn('onLogin not defined')
};

export default Loginview;