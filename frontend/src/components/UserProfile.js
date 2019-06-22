import React, {Component} from 'react';
import {fetchUsername, fetchPost} from '../api';
import Avatar from 'react-avatar';
import {Media, Row, Col, } from 'reactstrap';


class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user_profile:[],
            post_row_count: 0,
            is_fetching_profile:true,
        };
        this.getProfilePosts = this.getProfilePosts.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
        this.getUserPosts = this.getUserPosts.bind(this);
        
    }
    componentDidMount(){
        //check if a user is logged in, and if so is this their profile
        const { match: { params } } = this.props;
       this.getUserProfile(params.username);
      }
      
      getUrl = (type,image) => {
          if (image){
        return this.state.user_profile.profile_picture.substring(image.indexOf(type))
          }
        return "no profile picture";
    }

    getProfilePosts= async post_id => {
        return await fetchPost(post_id);
        
    }
    async getUserProfile(username) {
            let data = await fetchUsername(username);
            this.setState({
                user_profile: data, 
                is_fetching_profile: false,
            });
            if (data.get_posts !==[]){
                this.getUserPosts(data.get_posts);
            }

        }

    async getUserPosts(post_ids){
            // check that the user info loadede
            if (this.state.user_profile === []){
                return "Loading......"
            }
            else{ 
            //get all the posts related to the user's get_posts
            var posts =  await Promise.all(post_ids.map(item => this.getProfilePosts(item)))
            //for(int i = 0 ; i<post_ids)s
            var listed_posts = [];
            var i=0;
            for (let l = posts.length+1; (i ) <= l; i += 3) {
                listed_posts.push(
                    [posts[i],
                    posts[i+1], posts[1+2]]);
                //console.log("splice",posts.slice(i, i + 3), i)
            }
            console.log("Original: ", posts)
            console.log(listed_posts);

            this.setState({user_posts: listed_posts});
        }
    }


    render(){
        const {id, username, profile_picture, first_name, last_name, bio} = this.state.user_profile;
        return (
            <div>
             <a>
             <Avatar name="Insta" size="45" round={true}  src={this.getUrl("/users/", profile_picture)}/>
            </a>
            <h3> {first_name} {' '} {last_name}</h3>
            <p>{bio}</p>

            this.state.user_posts}
            </div>
        )
    }
}

export default UserProfile