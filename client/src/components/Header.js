import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout, username }) => {
    const loginBtn = (
        <div>
            <Link to='/login'><i className="fas fa-sign-in-alt material-icons loginBtn"></i></Link>
        </div>
    );
    const logoutBtn = (
        <div className="d-flex">
            <Link to='/login'><i onClick={onLogout} className="fas fa-sign-out-alt material-icons logoutBtn"></i></Link>
        </div>
    );
    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-3">
                <div className="brand-logo center brand">{ isLoggedIn ? username : 'POCKET NOTE'}</div>
                <ul className="right">
                    <li>
                        { isLoggedIn ? logoutBtn : loginBtn }
                    </li>
                </ul>
            </div>
        </nav>
    )
};

Header.propTypes = {
    username: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};

Header.defaultProps = {
    username: '',
    isLoggedIn: false,
    onLogout: () => console.warn("onLogout not defined")
};

export default Header;