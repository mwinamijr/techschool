import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Card } from "antd";
import CustomForm from "../components/Form";


class PostDetail extends React.Component {
  state = {
    post: {}
  };

  componentDidMount() {
    const postID = this.props.match.params.postID;
    axios.get(`http://127.0.0.1:8000/posts/${postID}/`).then(res => {
      this.setState({
        post: res.data
      });
    console.log(res.data)
    });
  }

  handleDelete = event => {
    event.preventDefault();
    const postID = this.props.match.params.postID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.delete(`http://127.0.0.1:8000/posts/${postID}/delete/`)
    .then(res => {
      if (res.status === 204) {
        this.props.history.push(`/`);
      }
    })
  };

  render() {
    return (
      <div>
        <Card title={this.state.post.title}>
          <p> {this.state.post.description} </p>
        </Card>
        <CustomForm
          {...this.props}
          token={this.props.token}
          requestType="put"
          postID={this.props.match.params.postID}
          btnText="Update"
        />
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">
            Delete
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(PostDetail);