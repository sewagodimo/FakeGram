import React from 'react';
import {Media} from 'reactstrap';
import '../../styles/profile.css';
import PostModal from './PostModal';

class ListProfilePosts extends React.Component{

	constructor(props) {
        super(props);
        this.state = {is_userview: false,
                      modalShow: [],
                    };
    
                }

    getUrl = (type,image) => {
        if (image){
        return image.substring(image.indexOf(type));
        }
        else{
            return "";
        }
    }
    renderModal = (post) => {
        let modal;
        if(this.state.modalShow[0] === true && this.state.modalShow[1] === post.id){
            modal = <PostModal
                show={this.state.modalShow}
                image={this.getUrl("/post_pictures/",post.image)}
                id={post.id}
                user={post.user}
                caption={post.caption}
                image_filter={post.image_filter}
              />

        }
        else{
            modal = <p></p>
        }
       return modal 
    }
	
	render(){ 
	return this.props.posts.map((post) => ( 

		<div className="cell" key={post.id}>
            <Media src={this.getUrl("/post_pictures/",post.image)}  className={post.image_filter}
            onClick={() => this.setState({ modalShow: [true, post.id]})}
            style={{width:'100%', height:'150px'}}/>

            {this.renderModal(post)}
        </div>  
		))
	
}

}


export default ListProfilePosts
