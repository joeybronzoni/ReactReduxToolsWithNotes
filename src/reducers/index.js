import { combineReducers } from 'redux';
import {reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

/* the Goal in this reducer is to return the state-object with the id of each post as the key and the value will be the actual post/data */
/* At the end of the day redux-form is savinf us from hooking up and connecting
   action creators as they're already bound to dispatch for certain actions.
   And the devs recommend importing the reduxer property as formReducer, so we are
   renaming the reducer to formReducer */
const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
