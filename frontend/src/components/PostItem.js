import React, { Component } from 'react';
import { ListGroupItem, Media, Col } from 'reactstrap';
import Avatar from 'react-avatar';
import { fetchUsername } from '../api';


class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {is_userview: false,
                      user_profile: [],
                    };
    
                }

    getUrl = (type,image) => {
        return image.substring(image.indexOf(type))
    }

    async getUserClick(username) {
        console.log("user is ", username)
        let data = await fetchUsername(username);
        console.log("The user is ", data);
        this.setState({user_profile: data})
        return data;
      }
    
    render() {
        const {caption, image, user } = this.props.post;
        return (
            <div style={{paddingBottom:'9%'}}>
            <ListGroupItem  style={this.props.getPostPadding}> 
                <a style={{marginBottom:'10px',marginTop:'0.7em', paddingLeft:'0.5em'}}  onClick={() => this.getUserClick(user.username)} >
                    <Avatar name="Insta" size="45" round={true}  src={this.getUrl("/users/",user.profile_picture)}/>
                    <b> 
                    {'  '} 
                    {user.username}</b>
                </a>
                <Col style={{width:'100%', padding:'0px'}}>
                <Media src={this.getUrl("/posts/",image)} style={{width:'100%',padding:"0px"}}/>
                </Col>
        <p> <b>{user.username}</b> {' '} {caption}</p>
                
            </ListGroupItem>
            </div>
        )
    }


}

export default PostItem