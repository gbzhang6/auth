import React from 'react';
import Navbar from './Navbar';
import PaintingContainer from './PaintingContainer';
import About from './About';
import Login from './Login';
import { Route, Switch } from 'react-router-dom';
import api from '../services/api';

class App extends React.Component {
  state = { auth: { currentUser: {} } };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      api.auth.getCurrentUser().then(user => {
        console.log('response is', user);
        if (!user.error) {
          this.setState({ auth: { currentUser: user } });
        }
      });
    }
  }

  handleLogin = user => {
    localStorage.setItem('token', user.token);
    this.setState({ auth: { currentUser: user } });
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ auth: { currentUser: {} } });
  };

  render() {
    console.log('App state', this.state.auth);
    return (
      <div className="App">
        <Navbar
          icon="paint brush"
          title="Painterest"
          description="web-100917 App"
          currentUser={this.state.auth.currentUser}
          handleLogout={this.handleLogout}
        />
        <div id="content" className="ui container">
          <Switch>
            <Route
              path="/login"
              render={routerProps => {
                return (
                  <Login {...routerProps} handleLogin={this.handleLogin} />
                );
              }}
            />
            <Route path="/paintings" component={PaintingContainer} />
            <Route path="/" component={About} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
