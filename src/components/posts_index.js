import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  componentDidMount() {// one of the life-cycle methods
	this.props.fetchPosts(); /* check NETWORK tab and XHR for array, this means we've successfully initialized state. Use postman to make a test post with this url: http://reduxblog.herokuapp.com/api/posts?key=JOEYBEEBEE21*/
  }

  // map over posts and generate <li> *lodash can map over an object*
  renderPosts(){
	return _.map(this.props.posts, post => {
	  return (
		<li className="list-group-item" key={post.id}>
		  <Link to={`/posts/${post.id}`} className="#">
			{post.title}
		  </Link>
		</li>
	  );
	});
  }

  // <Link /> acts kind of like an href
  render() {
	return (
      <div>
		<div className="text-xs-right">
		  <Link className="btn btn-primary" to="/posts/new">
			Add a Post
		  </Link>
		</div>
        <h3>POSTS</h3>
		<ul className="list-group">
		  {this.renderPosts()}
		</ul>
      </div>
	);
  };
};

/* hook up component to app-level state and render lists of posts inside the browser
   And remember, whenever you want to consume anything form application level state,
   we alwayd define out mstp function
/* *note that bindActionCreators needs to be brought in from redux */
function mapStateToProps(state) {
  return { posts: state.posts };
};

/* MSTP SNIPPET IS ANOTHER WAY TO DEFINE HOW THE 'action creator' can be hooked up
   we just pass in the action creator itself... They are identical in nature, but there
   are times when you want to use a separate function like mstp. Here, The step is still
   occuring but connect() is taking care of it for us... The question begged is -when
   will we call our action creator? That is, when are we going to attempt to reach
   out to our API and fetch our lists of posts? (Usually its been after some particular
   event occurs, but this here will be as soon as we are about to know that PostsIndex is
   about to be rendered is when we want to attempt to fetch our data/lists-of-posts)*LifeCycleMethod
*/
// export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);
// ES6 syntax
export default connect(mapStateToProps, { fetchPosts } )(PostsIndex);
