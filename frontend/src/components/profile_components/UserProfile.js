import React, {Component} from 'react';
import {fetchUsername, fetchPost, getCurrentUser} from '../../api';
import Avatar from 'react-avatar';
import {Container, Row, Col} from 'reactstrap';
import ListProfilePosts from './ListProfilePosts';
import '../../styles/profile.css';


class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user_exists: true,
            user_profile:[],
            user_posts:[],
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
    getCurrentUser = async username=>{
        return await getCurrentUser();
        
    }
    async getUserProfile(username) {
        if (!username){
            return ""
        }
            let data = await fetchUsername(username);
            if (data.detail){
                    this.setState({user_exists:false})
                    return ""
            }
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
            var posts =  await Promise.all(post_ids.map(item => this.getProfilePosts(item)));
            this.setState({user_posts: posts.reverse()});
        }
    }
    render(){
        const {username, profile_picture, first_name, last_name, bio} = this.state.user_profile;
        return (
            <div>
           {this.state.user_exists ?     
        <Container style={{paddingTop: '10%', zIndex:'-1'}}>
        
            <Row>
            <Col  md={{ size: 7, offset: 3 }} sm="12" >
             <a>
             <Avatar name="Insta" size="45" round={true}  src={this.getUrl("/profile_pictures/", profile_picture)}/>
            </a>
            <h3> {first_name} {' '} {last_name}</h3>
            <h6><b>@{username}</b></h6>
            <p>{bio}</p>
            </Col>
            </Row>
            { this.state.user_posts.length>0  ?
            <Col  md={{ size: 10, offset: 1 }} className="profile_grid" style={{ paddingBottom:'15px'}}>
                  <ListProfilePosts posts={this.state.user_posts} 
                  user = {this.state.user_profile}

                  handlePostClick={(id) => this.handlePostClick(id)} 
                   />
            </Col> :
             <Col  md={{ size: 10, offset: 1 }} className="profile_grid">
             <h3>{"No posts yet"}</h3>
             </Col>
            }
            </Container>
            :<Container style={{paddingTop: '10%', zIndex:'-1'}}>
            <h3>{"User does not exist"}</h3></Container> 
            }
            </div>
        )
    }
}

export default UserProfile