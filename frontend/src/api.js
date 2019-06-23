const instagram_url = 'http://127.0.0.1:8000/api/v1/instagram'  //url for all the posts
const post_url = 'http://127.0.0.1:8000/api/v1/instagram/post/' // url for a particular post

export const fetchPosts = async() =>{
	return fetch(instagram_url, {
		header:{
			Authorization: `JWT ${localStorage.getItem('token')}`,
		}
	})
		.then(res=>res.json())
		.then(data =>{
			return data;
		});
	}

export const fetchUsername = async(name) =>{
	// get the userid of that user
		return fetch(instagram_url+"/users/"+name, {
			header:{
				'Authorization': `JWT ${localStorage.getItem('token')}`,
			}
		})
			.then(res=>res.json())
			.then(data =>{
				return data;
			});
		}
	
export const fetchPost = async(id) => {
	
	return fetch(post_url+id, {
		header:{
			'Authorization': `JWT ${localStorage.getItem('token')}`,
		}
	})
	.then(res=>res.json())
	.then(data =>{
		return data;
	});
}

export const addPost = (post) =>{
	 fetch(post_url, {
		method: 'POST',
		header:{
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `JWT ${localStorage.getItem('token')}`
		},
		body:JSON.stringify(post)
})
	 .then (res =>res.json())
	 .then(data =>{
	 	console.log(data);
	 })
	 return post

}

export const Login = (username, password, post) =>{
	fetch(post_url, {
	   method: 'POST',
	   header:{
		   'Accept': 'application/json',
		   'Content-Type': 'application/json',
		   'username': username,
		   'password': password,
	   },
	   body:JSON.stringify(post)
})
	.then (res =>res.json())
	.then(data =>{
		console.log(data);
	})
	return post

}