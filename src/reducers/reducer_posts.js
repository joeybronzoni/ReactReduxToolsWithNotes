import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';



/* Notice that the state is initiated as an empty object and not an array
   don't forget to export the function dummy....*/
export default function(state = {}, action) {
  switch(action.type) {
	  case DELETE_POST:
		/* member the 'action''s payload contains the id of the post that we just
		   deleted. so just reach into our state obj and get rid of the key:value
		   that match that post' and we use lodash _.omit()-->this looks at state obj
		   and checks for key and drops it and returns a NEW state object with that
		   particular id. Note how this would pan out if we were to use an Array,
		   we'd have to use reject */
		return _.omit(state, action.payload);

	  case FETCH_POST:
		/* we want to add to the previous state not throw away the previous
		   posts we've fetched. So what operator do you think that we need
		   to use */
		/* But this is ES6 syntax (*!*! the [] is not an array its key interperlation)
		   So, whatever the variable [a.p.d.id] is -make a new key in the object and
		   assign it the value of a.p.data -So overtime as the user adds more post we will
		   add them to the overall state here
		*/
		return { ...state, [action.payload.data.id]: action.payload.data };
	  case FETCH_POSTS:
		//query looks like this:{id: value}--> { 4: post }
		return _.mapKeys(action.payload.data, 'id');
	  default:
		return state;
  }
};


/* Go to https://stephengrider.github.io/JSPlaygrounds/
   and test code like this:
const posts = [
  { id: 4, title: "Hi" },
  { id: 25, title: "bye" },
  { id: 36, title: "Hows it going" },
  ];

const state = _.mapKeys(posts, 'id');

state["4"]


*** This is what we are going to do for our reducer since we are storing our state
as a single object with the keys = the id's and the value being the posts instead of
as an array of objects
*/



// ES6 syntax
// export default function(state = {}, action) {
//   switch(action.type) {
// 	  case FETCH_POST:
//      const post = action.payload.data;
//      const newState = {...state};
//      newState[post.id] = post;
//      return newState;
// 	  case FETCH_POSTS:
// 		return _.mapKeys(action.payload.data, 'id');
// 	  default:
// 		return state;
//   }
// };
