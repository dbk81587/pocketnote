import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';

const Signupview = ({ onSignup }) => {
    let usernameinput;
    let passwordinput;
    const onKeyPress = (e) => {
        if(e.charCode === 13) {
            onSignup(usernameinput.value.toLowerCase(), passwordinput.value.toLowerCase())
        } else {
            return
        }
    }
    return (
        <div className="container">
            <div className="center">
                <div>
                    <h1>Register</h1>
                </div>
                <div className="loginForm center">
                    <div className="input-field">
                        <input type="text" autoComplete="off" maxLength="16" ref={node => usernameinput = node} name="username" className="validate" id="username" />
                        <label for="username">Username</label>
                    </div>
                    <div className="input-field">
                        <input type="password" onKeyPress={onKeyPress} ref={node => passwordinput = node} name="password" className="validate" id="password" />
                        <label for="password">Password</label>
                    </div>
                    <button type='submit' className="waves-effect waves-light btn" onClick={() => onSignup(usernameinput.value.toLowerCase(), passwordinput.value.toLowerCase())}>SUBMIT</button>
                </div>
            </div>
        </div>
    
    )
};

Signupview.propTypes = {
    onSignup: PropTypes.func
};

Signupview.defaultProps = {
    onSignup: () => console.warn('onSignup not defined')
};

export default Signupview;