import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
	/* match.params gives us access to all of the parameters in the url
	   so if we had /posts/:id/:comments it would give us access to both or multiple
	*/
	/* if (!this.props.post){} if you don't to fetch posts twice every time wrap fetchPost(id) in if-statement*/
	// match is provided to us directly by react-router
	// const id = this.props.match.params.id; Destructur underneath
	const { id } = this.props.match.params;
	// Call the action creator
	this.props.fetchPost(id);
	// console.log('this.props: ', this.props);
  }

  /* Since we are hitting the API what do we need to think about?
	 That's right, an action creator. Also, its risky to use the
	 this.props.post.id; because we may not have the id as props yet so
  with the match.params method we don't have to think about it at all*/
  onDeleteClick(){
	const { id } = this.props.match.params;

	this.props.deletePost(id, () => {
	  /* Making use of programatic navigation
		 making use of react-router with action creators:
		 we did this by passing around callbacks() to our
		 action creators that will take care of the navigation
		 after the action creator has completed executing
	   */
	  this.props.history.push('/');
	});
  }

  render() {
	/* this is the usual way we would use our mstp()
	   posts[this.props.match.params.id]; //the post we want to show
	   We want this compnentto only rely on a single post, not the entire list
	   of posts -hence ownProps()
	*/
	const { post } = this.props;
	// Data issues lik this will happen and should be noted!
	if (!post){return <div>...Loading</div>;}

    return (
      <div>
		<Link to="/" className="#">Back To Index</Link>
		<button
		  className="btn btn-danger pull-xs-right"
		  onClick={this.onDeleteClick.bind(this)}
		  >
		  Delete Post
		</button>
		<h3>{post.title}</h3>
		<h6>Categories: {post.categories}</h6>
		<p>{post.content}</p>
      </div>
    );
  }
}

/* We could use the usaul way of using our mstp
function mapStateToProps({ posts }) {
  return { posts };
}*/
/*
 Or use a trick that cleans up the logic it component and make them more usable
   Some people put their mstp() in a separate file like helper functions. ownProps()
   makes it easier to handle some intermediate level of calculation or 'lookup'
*/
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id]  };
}




export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
