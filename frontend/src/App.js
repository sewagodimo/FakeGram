import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Posts from './components/Posts';
import Home from './components/registration_components/Home'
import TopNavBar from './components/TopNavBar';
import UserProfile from './components/profile_components/UserProfile';
import PostUpload from './components/profile_components/PostUpload';
import UserNotifications from './components/profile_components/UserNotifications';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_logged_in:localStorage.getItem('token') ? true : false,
      username: '',

    }

  }

  componentDidMount(){
    //check if a user is logged in
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/v1/instagram/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
         
          this.setState({is_logged_in:true, username: json.user.username });
        });
    }
    console.log("who is this: ", this.state.username)
  };
  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/v1/instagram/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        console.log(json.user.username)
        this.setState({
          is_logged_in: true,
          displayed_form: '',
          username: json.user.username
        });
      });
  };
  getHomePage = () =>{
    if (this.state.is_logged_in && this.state.username){
      return  <Route exact path="/" component={Posts} />
    }
    return  <Route exact path="/" 
    render={(props) =>
    <Home {...props} handle_login={this.handle_login}/>}
    />

  };
  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };
  render() {
    return (
      <React.Fragment >
      <TopNavBar is_logged_in = {this.state.is_logged_in}/>

      <BrowserRouter style={{backgroundColor:'#f8f9fa', paddingTop: '10%'}}>
                <Switch>
                     {this.getHomePage()}
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
