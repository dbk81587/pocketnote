import { connect } from 'react-redux';
import { Header } from '../components';
import * as actions from '../actions';

const mapStateToProps = (state) => ({
    isLoggedIn: state.authentication.getIn(['status', 'isLoggedIn']),
    username: state.authentication.getIn(['status', 'currentUser'])
});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(actions.onLogout())
});

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;