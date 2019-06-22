import React from 'react';
import { Card, Media, CardDeck } from 'reactstrap';
import Avatar from 'react-avatar';
import '../../styles/profile.css';

class ListProfilePosts extends React.Component{

	constructor(props) {
        super(props);
        this.state = {is_userview: false,
                    };
    
                }

    getUrl = (type,image) => {
        return image.substring(image.indexOf(type))
    }
    
	
	render(){ 
		
	return this.props.posts.map((post) => ( 
		
		<div className="cell" key={post.id}>
			<Media src={this.getUrl("/posts/",post.image)} style={{width:'100%', height:'150px'}}/>
		</div>
			
		))
	
}

}


export default ListProfilePosts