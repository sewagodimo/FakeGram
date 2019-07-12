import React from 'react';
import  { Redirect } from 'react-router-dom';
import {Container} from 'reactstrap';
import {uploadPost} from '../../api';

class PostUpload extends React.Component{
	formData = new FormData();
		state = {
			image:null,
			caption: "",
			image_blob: "",
		};
 make_post = async (post) =>{
	let data = await uploadPost(post);
	return data;
}
	

	onFormSubmit = (e) =>{
		if (this.props.user_id && this.state.caption && this.state.image_blob){
			//upload post sync call
			console.log("but my image it ", this.state.image)
			const post = {
				'image': this.state.image,
				'caption': this.state.caption,
				'user_id': this.props.user_id
			};
			const res = this.make_post(post);
			console.log("this is the response",res)
			
			return post
		}
		else{
			return <Redirect to='/'  />
		}
       
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
				image_blob: URL.createObjectURL(e.target.files[0]),
				image:e.target.files[0],
			});
		}
    }
	
	render(){ 
		
	return (
	<Container style={{paddingTop: '10%',zIndex:'-1'}}>
	  <form onSubmit={this.onFormSubmit}>
                <h1>#New post</h1>
                <input type="file" name="image" onChange= {this.onChange} />
				<img src={this.state.image_blob}/>
				<input type="text" name="caption" onChange= {this.onChange}value={this.state.caption} />
				<p onClick={this.onFormSubmit}>submit</p>
                <button type="submit">Upload</button>
            </form>
	</Container>
	)
	
}
}

export default PostUpload