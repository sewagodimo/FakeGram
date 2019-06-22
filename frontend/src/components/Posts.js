import React, {Component} from 'react';
import {Container, Row, Col, ListGroup} from 'reactstrap';
import ListPosts from './ListPosts';

import { fetchPosts } from '../api';


class Posts extends Component{
    constructor(props){
        super(props);
        this.state={
            posts:[],
            is_fetching: true,
        }
        this.getPosts = this.getPosts.bind(this);
    }

    componentDidMount(){
        this.getPosts();
        console.log("Mounting")
    
      }

  getPostPadding = () => {
    return {
        padding: '0px',
    }
}
    async getPosts() {
        let data = await fetchPosts();
        this.setState({posts:data, is_fetching:false});
      }
    render(){
        return(
            <Container style={{paddingTop: '10%', zIndex:'-1'}}>
            <Row>
            <Col  md={{ size: 7, offset: 1 }} sm="12" style={this.getPostPadding()}>
            {this.state.is_fetching ?
                    "Loading..." :
                <ListGroup>
                  <ListPosts posts={this.state.posts} 
                  handlePostClick={(id) => this.handlePostClick(id)} 
                  style={this.getPostPadding()} getPostPadding={this.getPostPadding()}/>
            </ListGroup>
      }
            </Col>
            </Row>
            </Container>
        )
    }
}

export default Posts