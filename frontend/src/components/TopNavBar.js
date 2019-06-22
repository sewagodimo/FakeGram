import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem} from 'reactstrap';


class TopNavBar extends React.Component {
    navItemStyling = () => {
        return {
            paddingLeft:'1em', 
            fontSize:'30px', 
            color:'grey', 
            fontWeight:'bold'
        }
    }

render(){
    return( 
    <div style={{ paddingBottom:'4%', backgroundColor:'white'}}>
    <Navbar color="light" light expand="md" >
      <NavbarBrand href="/" style={{flexGrow:'3'}}>FakeGram</NavbarBrand>
        <Nav className="ml-auto" navbar style={{flexGrow: '1'}}>
            <NavItem >
            <a href="/users/" style={this.navItemStyling()}>👤</a> {'  '}

            <a href="notification" style={this.navItemStyling()}>♡</a>  {'  '}

            <a href="notification" style={this.navItemStyling()}>🚀</a>
          </NavItem>
          </Nav>
          </Navbar>
          </div>
    )
}

}

export default TopNavBar