import React from "react";
import axios from "axios";
import Posts from "../components/Post";
import CustomForm from "../components/Form";


class PostList extends React.Component {
  state = {
    posts: []
  };

  fetchPosts = () => {
    axios.get("http://127.0.0.1:8000/posts/").then(res => {
      this.setState({
        posts: res.data
      });
    });
  }

  componentDidMount() {
    this.fetchPosts();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchPosts();      
    }
  }

  render() {
    return (
      <div>
        <Posts data={this.state.posts} /> <br />
        <h2> Create an article </h2>
        <CustomForm requestType="post" articleID={null} btnText="Create" />
      </div>
    );
  }
}

export default PostList;