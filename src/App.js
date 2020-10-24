import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux'

import * as actions from './store/actions/auth';

import BaseLayout from "./containers/Layout";
import BaseRouter from './routes';

class App extends React.Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render(){
    return (
      <Router>
        <div className="App">
          <div className="container ">
            <BaseLayout {...this.props}>
              <BaseRouter />
            </BaseLayout>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);