import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions'; /* no need for index.js because actions has only one file */

class PostsNew extends Component {
  renderField(field){ /* Remember, its up to us to define the jsx-component for reduxForm to know how to render. So its still on us to connect
						 <Field/> to form . So, {...field.input} --> is an object with a bunch of different event handlers and props(like onChange()
						 etc. and it also has the value). Also part of what reduxForm does automatically for us is validation. Another *Note: {field.meta.error}
						 is what ties our validation to the error strings we created as one of the properties. *Note the ternary operatory and {field.meta.touched} comes from reduxForm*/

	/* deconstruct and pull touched & error from the nested meta object. So meta.touched and meta.error drop the meta */
	const { meta: { touched, error } } = field;

	const className = `form-group ${ touched && error ? 'has-danger' : ''}`;

	return (
	  <div className={className}>
		<label>{field.label}</label>
		<input
		  className="form-control"
		  type="text"
		  {...field.input}
		  />
		<div className="text-help">
		   {touched ? error : ''}
		</div>
	  </div>
	);
  }

  onSubmit(values) {
	// this === component
	/* wire up the submit button to an action creator, whenever we think about saving
	   data/making API request inside our redux app we always want to be thinking
	   about action creators. So first lets create our action creator and then out
	   our API request inside of it. Then we can figure out how to hook it up to our
	   onSubmit()
	*/
	console.log('values: ', values);
	// this line will navigate to a route
	// this.props.history.push('/');
	/* In order to beat the race condition between our new post and the rendering
	   of posts component we are going to pass a CB function to createPost action creator
	   that calls this.props.history.push('/')
	*/
	this.props.createPost(values, () => {
	  this.props.history.push('/');
	});
	// programatic navigation
  }

  render() {
	/* Note that this { handleSubmit } is being passed to the component on behalf of reduxForm,
	   but we define the onSubmit() and then passes us the values out of the form. *There are
	   3 different types of state for the reduxform for each and every field that we create: pristine, touched, invalid. */
	const { handleSubmit } = this.props;
	/* programatic navigation: we want to automatically navigate the user
	   the instant that we know the post has been created successfully, not by
	   creating an anchor tag that the user clicks on, like the <Link/>
	*/

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

		<Field
		  label="Title"
		  name="title"
		  component={this.renderField}
		  />

		<Field
		  label="Categories"
		  name="categories"
		  component={this.renderField}
		  />

		<Field
		  label="Post Content"
		  name="content"
		  component={this.renderField}
		  />
		<button type="submit" className="btn btn-primary">Submit</button>
		<Link to="/" className="btn btn-danger">Cancel</Link>
	  </form>
    );
  };
};

function validate(values) {
  // argument by convention is called values
  /* console.log('values: ', values); -->// like e.target. The following is how we will always layout this function*/
  const errors = {};

  // Validate the inputs from 'values'
  // if (values.title.length < 3){	errors.title = "Enter a title at least 3 characters";}
  if (!values.title || values.title.length < 3) { errors.title = "Enter a title"; }

  if (!values.categories) {	errors.categories = 'Enter some categories'; }

  if (!values.content) { errors.content = 'Enter some content please'; }

  // If errors{} is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

//action-creator note:
/* How do we combine our action creator with our reduxForm? */
/* We hook up and use reduxForm the same way we would if we were using our connect() helper
   reduxForm()() takes a single argument which is a  function and that function takes some
   number of configuration options. Here we declare the form:(make sureValue is unique) property
   and think of its the 'name' of the form. If we wanted to list multiple forms on the page at once
   *note: that component property of the form takes a function.
   *note: the string of form: should be unique for somple forms like this, but if we are dealing
   with multi-page forms we may want the forms to merge and share the same state.
*/
/* To stack up multiple connect-like helpers this reduxForm changes from :
   export default reduxForm({
     validate,
     form: 'PostsNewForm'
   })(PostsNew);
To this:
*/
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})( connect(null,{ createPost })(PostsNew) );


// Scaffold PostsNew component
// Add route configuration * all routes will be in our top-level index.js
// Add navigation between index and New
// Make action creator to save post -->https://redux-form.com/4.2.0/#/?_k=w4xy1k
