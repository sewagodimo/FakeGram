import React from 'react';
import {Container} from 'reactstrap';

import PropTypes from 'prop-types';


class Home extends React.Component{
	state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

	render(){ 
		return (
		<Container style={{paddingTop: '10%', zIndex:'-1'}}>
		<h1>Welcome to FakeGram!</h1>
			<div style={{display:'flex', paddingRight:'12%'}}>
				<div style={{flexGrow:'1'}}>
				<form onSubmit={e => this.props.handle_login(e, this.state)}>
        <h4>Log In</h4>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
				<br></br>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        	<br></br>
        <button type="submit">
          Login
        </button>
      </form>
				</div>
				<div style={{flexGrow:'1'}}>
					Register
				</div>
			</div>
		</Container>
		)
		
	}
}
export default Home


Home.propTypes = {
  handle_login: PropTypes.func.isRequired
};
