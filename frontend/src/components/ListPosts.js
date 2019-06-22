import React from 'react';
import PostItem from './PostItem';


class ListPosts extends React.Component{
	
	render(){ 
		
	return this.props.posts.map((post) => ( 
			
			<PostItem key={post.id} post={post} getPostPadding={this.props.getPostPadding}/>
			
		))
	
}
}


export default ListPosts