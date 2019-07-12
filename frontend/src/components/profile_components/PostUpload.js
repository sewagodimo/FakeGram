import React from 'react';
import  { Redirect } from 'react-router-dom';
import {Container} from 'reactstrap';
import {uploadPost} from '../../api';
import '../../styles/icons.css';
import '../../styles/post.css';

class PostUpload extends React.Component{
	formData = new FormData();
		state = {
			image:null,
			caption: "",
			image_blob: "",
			image_filter:"",
			stage: "empty",
		};
 make_post = async (post) =>{
	let data = await uploadPost(post);
	return data;
}
	

	onFormSubmit = (e) =>{
		if (this.props.user_id && this.state.caption && this.state.image_blob){
			//upload post sync call
			const post = {
				'image': this.state.image,
				'caption': this.state.caption,
				'user_id': this.props.user_id,
				'image_filter': this.state.image_filter,
			};
			this.make_post(post);
			this.props.history.push('/')
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
				stage: "image",
			});
			//render the 
		}
	}
	
	selectFilter = e =>{
		console.log(e)
		this.setState({
			image_filter: e
		})

	}
	
	render(){ 
		
	return (
	<Container style={{paddingTop: '10%',zIndex:'-1'}}>
	  <form onSubmit={this.onFormSubmit}>
	    <div className="upload-container">
				<h1 className="heading">#New post</h1>
				{ this.state.stage !== "image" ?
				<div  className= "uploadImage upload" >
                <input type="file" name="image" onChange= {this.onChange} />
				</div> :
				<div  className= "uploadImage upload " >
                <img src={this.state.image_blob} className={this.state.image_filter} 
				style={{height:'250px'}}/>
				</div>}
				<div className= "message caption-text">
				<input type="text" name="caption" onChange= {this.onChange}value={this.state.caption} 
				 style={{width: '300px', height:'100px'}}/>
				 </div>
				 <div className="filters">
				{ this.state.stage === "image" ?
					<div>
						<img src={this.state.image_blob}  className=" filter" onClick={(e) => this.selectFilter("")}/>
						<img src={this.state.image_blob}  className=" filter blur-filter"  onClick={(e) => this.selectFilter("blur-filter")}/>
						<img src={this.state.image_blob}  className=" filter bng-filter" onClick={(e) => this.selectFilter("bng-filter")}/>
						<img src={this.state.image_blob}  className=" filter bright-filter"  onClick={(e) => this.selectFilter("bright-filter")}/>
						<img src={this.state.image_blob}  className=" filter saturate-filter"  onClick={(e) => this.selectFilter("saturate-filter")}/>
						<img src={this.state.image_blob}  className=" filter sepia-filter"  onClick={(e) => this.selectFilter("sepia-filter")}/>
					</div>
					: 
					<div></div>}
				</div>
				<div className="submit">
                <button type="submit" onClick={this.onFormSubmit}>Post</button>
				</div>
				</div>
            </form>
	</Container>
	)
	
}
}

export default PostUpload