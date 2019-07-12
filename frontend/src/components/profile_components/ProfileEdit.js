import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {fetchUsername} from '../../api';
import Avatar from 'react-avatar';


class ProfileEdit extends Component{

    state ={
        profile_picture: null,
        profile_picture_blob:null,
        user_id: null,
        firstname: "",
        lastname: "",
        bio: "",
        detect_change: false,
        errors_detected: false,

    }
    componentDidMount(){
        this.getUserProfile(this.props.username);
    }
    getUrl = (type,image) => {
        if (image){
      return this.state.profile_picture.substring(image.indexOf(type))
        }
      return "no profile picture";
  }
   getUserProfile = async() => {
      const username  = this.props.username;
    if (!username){
        return ""
    }
        let data = await fetchUsername(username);
        if (!data.detail){
            this.setState({
                user_id: data.id,
                lastname: data.last_name,
                firstname: data.first_name,
                bio: data.bio,
                profile_picture: data.profile_picture,
                errors_detected: true
            });
                return ""
        }
        console.log(data)
        this.setState({
            errors_detected: false,
        });

    }

    onChange = e => {
		const type = e.target.name;
		const value = e.target.value;
		if (type === "caption"){
			this.setState({
				caption: value
			});
		}
		else if (type === "image"){
			this.setState({
				profile_picture_blob: URL.createObjectURL(e.target.files[0]),
				profile_picture:e.target.files[0],
			});
			//render the 
		}
	}

    render() {
        
        return (
            <Container style={{paddingTop: '20%', zIndex:'-1'}}>
            <div>
            <a>
             <Avatar name="Insta" size="130" round={true}  src={this.getUrl("/profile_pictures/", this.state.profile_picture)}/>
             <div  className= "uploadProfile " >Change Profile Picture
                <input type="file" name="image" onChange= {this.onChange} name="image"/>
				</div>
            </a>
            </div>
            <div>Name {this.state.firstname}</div>
            <div>Surname {this.state.lastname}</div>
            <div>Bio {this.state.bio}</div>

            </Container>
        )
    }

}

export default ProfileEdit;