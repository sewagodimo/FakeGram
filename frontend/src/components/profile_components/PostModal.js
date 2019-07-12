import React from 'react';
import {NavLink} from 'react-router-dom';
import { Media,  Modal, ModalHeader, ListGroup} from 'reactstrap';
import Avatar from 'react-avatar';
import '../../styles/profile.css'

class PostModal  extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
 }

 toggle = ()=> {
  this.setState(prevState => ({
    modal: !prevState.modal
  }));
}

getUserUrl = (username) =>{
  return "/users/"+username;
}
getUrl = (type,image) => {
  if (image){
    return image.substring(image.indexOf(type));
    }
    return "";
}
  
  render() {
    return (
      <div>
      <Modal isOpen={this.state.modal} toggle={this.toggle} style={{width: '70%'}}>
      <div className="modal_flex">
        <div style={{width:'60%'}}>
      <Media src={this.props.image}style={{width:'100%', height:'100%'}} 
      className={this.props.image_filter}></Media>
      </div>
      <div style={{width:'40%'}}>
      <ListGroup>
      <ModalHeader toggle={this.toggle} style={{padding:'2px'}}>
                <div style={{marginBottom:'5px',marginTop:'0.7em', }}>
                    <Avatar name="Insta" size="45" round={true}  
                    src={this.getUserUrl("/profile_pictures/",this.props.user.profile_picture)}/>
                    <b>{'  '} 
                    <NavLink to={this.getUserUrl(this.props.user.username)}>{this.props.user.username}</NavLink>
                    </b>
      </div>
      </ModalHeader>
      {this.props.caption}
      </ListGroup>
         </div>
          </div>
      </Modal>
      </div>
    )
  }
}

export default PostModal
