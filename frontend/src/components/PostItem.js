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
        if (image){
        return image.substring(image.indexOf(type))
        }
        return ""
    }
    getUserUrl = (username) =>{
        return "users/"+username;
    }

    async getUserClick(username) {
        console.log("user is ", username)
        let data = await fetchUsername(username);
        console.log("The user is ", data);
        this.setState({user_profile: data})
        return data;
      }
    
    render() {
        const {caption, image, user, image_filter } = this.props.post;
        return (
            <div style={{paddingBottom:'9%'}}>
            <ListGroupItem  style={this.props.getPostPadding}> 
                <a style={{marginBottom:'10px',marginTop:'0.7em', paddingLeft:'0.5em'}}  
                onClick={() => this.getUserClick(user.username)} >
                    <Avatar name="Insta" size="45" round={true}  
                    src={this.getUrl("/profile_pictures/",user.profile_picture)}/>
                    {'  '}<b> <a href={this.getUserUrl(user.username)}>{user.username}</a></b>
                </a>
                <Col style={{width:'100%', padding:'0px'}}>
                <Media src={this.getUrl("/post_pictures/",image)} 
                style={{width:'100%',padding:"0px"}}
                className={image_filter}/>
                </Col>
        <p> <b><a href={this.getUserUrl(user.username)}>{user.username}</a></b> {' '} {caption}</p>
                
            </ListGroupItem>
            </div>
        )
    }


}

export default PostItem