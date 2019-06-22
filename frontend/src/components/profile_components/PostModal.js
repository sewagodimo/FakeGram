import React from 'react';
import { Media,  Modal, ModalHeader, ListGroupItem, ListGroup} from 'reactstrap';
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
  return "users/"+username;
}
getUrl = (type,image) => {
  return image.substring(image.indexOf(type))
}
  
  render() {
    console.log(this.props)
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} style={{width: '60%'}}>
      <div className="modal_flex">
        <div style={{flexGrow:'6'}}>
      <Media src={this.props.image}style={{width:'100%', height:'100%'}} ></Media>
      </div>
      <div style={{flexGrow:'4'}}>
      <ListGroup>
      <ModalHeader toggle={this.toggle} style={{padding:'2px'}}>
                <p style={{marginBottom:'5px',marginTop:'0.7em', }}  
                onClick={() => this.getUserClick(this.props.user.username)} >
                    <Avatar name="Insta" size="45" round={true}  
                    src={this.getUrl("/users/",this.props.user.profile_picture)}/>
                    <b> 
                    {'  '} 
                    <a href={this.getUserUrl(this.props.user.username)}>{this.props.user.username}</a></b>
      </p>
      </ModalHeader>
      {this.props.caption}
      </ListGroup>
         </div>
          </div>
      </Modal>
    )
  }
}

export default PostModal
