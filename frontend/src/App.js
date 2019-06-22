import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Posts from './components/Posts';
import TopNavBar from './components/TopNavBar';
import UserProfile from './components/profile_components/UserProfile';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      user: {},
      current_post_id:0,
      is_uploading:true,
      is_fetching:true,
      is_loggedin:false,
      is_userview:false,

    }

  }

  componentDidMount(){
    //check if a user is logged in
  }

  render() {
    return (
      <React.Fragment >
      <TopNavBar/>

      <BrowserRouter style={{backgroundColor:'#f8f9fa'}}>
                <Switch>
                    <Route exact path="/" component={Posts} />
                    <Route  path="/:username" component={UserProfile} />
                </Switch>
            </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
