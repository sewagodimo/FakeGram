import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Posts from './components/Posts';
import TopNavBar from './components/TopNavBar';
import UserProfile from './components/profile_components/UserProfile';
import PostUpload from './components/profile_components/PostUpload';
import Home from './components/registration_components/Home';
import UserNotifications from './components/profile_components/UserNotifications';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_logged_in:localStorage.getItem('token') ? true : false,
      username: '',
      user_id:null,

    };
  }

refresh_user = () => {
    //check if a user is logged in
    
    if (this.state.is_logged_in && !this.state.username) {
      fetch('http://localhost:8000/api/v1/instagram/current_user/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.detail){
            this.setState({is_logged_in:false, username: "", user_id:null});
          }
          else{
          this.setState({is_logged_in:true, username: json.username, user_id:json.id });
          console.log("refreshing user info.....", this.state.username);
          }
        });
}
}

handle_login = (e, data) => {
  e.preventDefault();
  fetch('http://localhost:8000/api/v1/instagram/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => {
      //check that the user is actually authenticate
      if (json.token){
      localStorage.setItem('token', json.token);
      this.setState({
        is_logged_in: true,
        displayed_form: '',
        username: json.user.username,
        user_id: json.user.id,
      });
    }
    });
};
handle_logout = () => {
  localStorage.removeItem('token');
  this.setState({ logged_in: false, username: '' });
};


getHomeRoute = () =>{
  if (this.state.is_logged_in){
    if(!this.state.username){
      this.refresh_user()
    }
    return  <Route exact path="/" component={Posts} />
  }
  return  <Route exact path="/" 
  render={(props) =>
  <Home {...props} handle_login={this.handle_login}/>}
  />

};

getNotificationsRoute = () =>{
  if (this.state.is_logged_in){
    if(!this.state.username){
      this.refresh_user()
    }
    
    return  <Route  exact path="/notifications" 
                    render={(props) =>
                    <UserNotifications {...props} username={this.state.username}/> }
                     />
  }
  return  <Route exact path="/noticiations" 
  render={(props) =>
  <Home {...props} handle_login={this.handle_login}/>}
  />

};

getUploadRoute = () =>{
  if (this.state.is_logged_in){
    if(!this.state.username){
      this.refresh_user()
    }                                                                                             
    return  <Route  exact path="/upload" 
                    render={(props) =>
                    <PostUpload {...props} username={this.state.username} 
                    is_logged_in={this.state.is_logged_in}
                    user_id={this.state.user_id}/> }
                     />
  }
  return  <Route exact path="/upload" 
  render={(props) =>
  <Home {...props} handle_login={this.handle_login}/>}
  />
  };

  render() {
    return (
      <React.Fragment >
       <TopNavBar is_logged_in = {this.state.is_logged_in} username={this.state.username} 
       refresh_user={this.refresh_user}/>

      <BrowserRouter style={{backgroundColor:'#f8f9fa', paddingTop: '10%'}}>
                <Switch>
                    {this.getHomeRoute()}
                    
                    {this.getNotificationsRoute()}
                    {this.getUploadRoute()}
                    <Route  path="/users/:username" component={UserProfile} />
                </Switch>
            </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
