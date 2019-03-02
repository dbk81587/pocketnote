import React, { Component } from 'react';
import { HeaderContainer, LoginContainer, HomeContainer, SignupContainer } from './';
import { Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import * as actions from '../actions';

class App extends Component {
  componentDidMount() {
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    let loginData = getCookie('key');

    if(typeof loginData === "undefined") return;

    loginData = JSON.parse(atob(loginData));
    console.log(loginData)

    if(!loginData.isLoggedIn) return;

    this.props.getStatusRequest().then(
        () => {
            console.log(this.props.status);
            if(!this.props.status.get('valid')) {
                // logout the session
                loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie='key=' + btoa(JSON.stringify(loginData));
                history.push('/login')

            }
        }
    );
}
  render() {
    return (
      <Router history={history}>
        <div className="app">
          <HeaderContainer />
          <Route exact path="/" component={HomeContainer} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/login" component={LoginContainer} />
        </div>
      </Router>
    )
  }
};

const mapStateToProps = (state) => ({
  status: state.authentication.get('status')
});

const mapDispatchToProps = (dispatch) => ({
  getStatusRequest: () => dispatch(actions.getStatusRequest())
});




export default connect(mapStateToProps,mapDispatchToProps)(App);