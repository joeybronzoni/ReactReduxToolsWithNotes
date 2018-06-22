import axios from 'axios';

// define & export the types
export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_posts';
export const DELETE_POST = 'delete_post';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';

// http://reduxblog.herokuapp.com/api/posts?key=${API_KEY}
const API_KEY = '?key=JOEYBEEBEE21';
/* What we need for this action creator is something for a network request using axios
   for the request and redux-promise to handle the asynchronous Promise */
/* The payload will be caught by redux-promise middleware and unwrap the promise */
// action creator for fetching posts
export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  return {
	type: FETCH_POSTS,
	payload: request
  };
}

/* axios uses the same syntax to POST as it does GET, 2args: 1stArg:url, 2ndArg:data
   The reason we can't just grab our values object and dump it directly into our
   state-array because it doesn' yet have an 'id' associated with it.
*/
// action creator for submit(POST)
export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
		.then(() => callback()); //create a promise

  return {
	type: CREATE_POST,
	payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
	type: FETCH_POST,
	payload: request
  };
}

export function deletePost(id, callback){
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
		.then(() => {callback();});
  /* Note that local state is not updated yet and the deleted post is still in local memory and we do this in our reducers*/

  return {
	type: DELETE_POST,
	payload: id
  };
}
// console.log(`the url is: ${ROOT_URL}/posts${id}${API_KEY}`);
