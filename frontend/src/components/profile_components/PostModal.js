import React from 'react';
import { Media, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Avatar from 'react-avatar';


class PostModal  extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};

            }
  render() {
    console.log(this.props)
    return (
      <div>
        This is  the modal for {this.props.user.username}
      </div>
    )
  }
}

export default PostModal
