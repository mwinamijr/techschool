import React from "react";
import { connect } from "react-redux";
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";

import * as actions from "../store/actions/post";

class PostList extends React.Component {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getPosts(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getPosts(newProps.token);
      }
    }
  }
  
  renderItem = this.props.posts.map( (post) => {

    return (
      <span>
        <MDBRow>
          <MDBCol lg="7">
            <a href="#!" className="pink-text">
              <h6 className="font-weight-bold mb-3">
                <MDBIcon icon="image" className="pr-2" />
                Lifestyle
              </h6>
            </a>
            <h3 className="font-weight-bold mb-3 p-0">
              <strong>Title of the news</strong>
            </h3>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate
              non provident.
            </p>
            <p>
              by
              <a href="#!">
                <strong>Carine Fox</strong>
              </a>
              , 14/08/2018
            </p>
            <MDBBtn
              color="pink"
              size="md"
              className="mb-lg-0 mb-4 waves-light"
            >
              Read more
            </MDBBtn>
          </MDBCol>
          <MDBCol lg="5">
            <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
              <img
                className="img-fluid"
                src="https://mdbootstrap.com/img/Photos/Others/img%20(34).jpg"
                alt=""
              />
              <a href="#!">
                <MDBMask overlay="white-slight" />
              </a>
            </MDBView>
          </MDBCol>
        </MDBRow>
        <hr className="my-5" />
      </span>
    );
  });

  render(){
    return (
      <MDBCard className="my-5 px-5 pb-5">
        <MDBCardBody>
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            Recent posts
          </h2>
          <p className="text-center w-responsive mx-auto mb-5">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          {this.renderItem}
        </MDBCardBody>
      </MDBCard>
    );
  }
}

const mapStateToProps = state => {

  console.log(state)
  return {
    token: state.auth.token,
    posts: state.posts,
    loading: state.posts.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: token => dispatch(actions.getPosts(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);