import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Posts from './components/Posts';
import TopNavBar from './components/TopNavBar';
import UserProfile from './components/profile_components/UserProfile';
import PostUpload from './components/profile_components/PostUpload';
import UserNotifications from './components/profile_components/UserNotifications';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_fetching:true,

    }

  }

  componentDidMount(){
    //check if a user is logged in
  }

  render() {
    return (
      <React.Fragment >
      <TopNavBar/>

      <BrowserRouter style={{backgroundColor:'#f8f9fa', paddingTop: '10%'}}>
                <Switch>
                    <Route exact path="/" component={Posts} />
                    <Route  path="/users/:username" component={UserProfile} />
                    <Route  exact path="/notifications" component={UserNotifications} />
                    <Route  exact path="/upload" component={PostUpload} />
                </Switch>
            </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
