import React, { Component } from "react";
import { Platform } from "react-native";
import axios from "axios";
import env from "../../env";
import ProfileView from "./ProfileView";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === "android") {
      this.server = env.ServerUrlForAndroid;
      this.props.setTitle("Profile");
    } else {
      this.server = env.ServerUrlForWeb;
    }
    this.View = React.createRef();
  }

  componentDidMount() {
    this.loadProfile();
  }

  loadProfile = () => {
    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    const usedRef = this.View.current;

    usedRef.setState({
      error: ""
    });

    axios({
      method: "GET",
      url: "http://" + this.server + ":5000/api/profile",
      headers: headers
    })
      .then(response => {
        usedRef.setState({
          loading: false,
          email: response.data.email,
          userName: response.data.username
        });
      })
      .catch(error => {
        console.log(error);
        usedRef.setState({
          error: "Error retrieving data",
          loading: false
        });
      });
  };

  render() {
    return <ProfileView ref={this.View} />;
  }
}
