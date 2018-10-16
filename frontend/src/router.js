import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './components/dashboard';
import Storyboard from './components/storyboard';
import MainWrapper from './components/main-wrapper';

class MainRouter extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" component={MainWrapper} />
        <Switch>
          <Route path="/storyboard" component={Storyboard} />
          <Route path="/" component={Dashboard} />
          {/* <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <PrivateRoute path="/log/success" component={SuccessLog} />
          <PrivateRoute path="/log/error" component={ErrorLog} /> */}
        </Switch>
      </React.Fragment>
    )
  }
}

export default MainRouter;
