import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem} from 'reactstrap';
import '../styles/icons.css';


class TopNavBar extends React.Component {

    navItemStyling = () => {
        return {
            paddingLeft:'2em', 
            fontSize:'20px', 
            color:'gold', 
            fontWeight:'bold'
        }
    }
    navBarStyling = () => {
        return {
        backgroundColor: 'white', 
        position: 'fixed', 
        width:'100%',
        top: "0",
        overflow:'hidden',
        zIndex:'1',
    }
    }

    getUserUrl = (username) =>{
        return "/users/"+username;
      }
render(){
    if (this.props.is_logged_in && !this.props.username){
    this.props.refresh_user()
}
    return( 
    <div >
    <Navbar light expand="md" style={this.navBarStyling()}>
      <NavbarBrand href="/" style={{flexGrow:'3'}}>
      <i className="fa fa-camera" style={{fontSize:'38px', color:'gold'}}>FakeGram</i></NavbarBrand>
        <Nav className="ml-auto" navbar style={{flexGrow: '1'}}>
            <NavItem >
                {this.props.is_logged_in? 
              <div>
            <a href={this.getUserUrl(this.props.username)} className= "Profile" style={this.navItemStyling()}>{'  '}</a> 

            <a href="/notifications/" className= "Like" style={this.navItemStyling()}>{'  '}</a>  

            <a href="/upload/" className= "Upload" style={this.navItemStyling()}>{'  '}</a>
            </div>: 
         <a href="/">Login</a>}
          </NavItem>
          </Nav>
          </Navbar>
          </div>
    )
}

}

export default TopNavBar