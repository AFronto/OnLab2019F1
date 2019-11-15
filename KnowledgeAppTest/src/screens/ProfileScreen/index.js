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
    this.loadMySkills();
  }

  loadProfile = () => {
    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    const usedRef = this.View.current;

    usedRef.setState({
      error: "",
      loading: true
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
          error: { message: "Error retrieving data" },
          loading: false
        });
      });
  };

  loadMySkills = () => {
    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    const usedRef = this.View.current;

    usedRef.setState({
      error: "",
      loading: true
    });

    axios({
      method: "GET",
      url: "http://" + this.server + ":5000/api/skills/mySkills",
      headers: headers
    })
      .then(response => {
        usedRef.setState({
          knownSkills: response.data.skills.sort((a, b) =>
            a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
          ),
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        usedRef.setState({
          error: { message: "Error retrieving data" },
          loading: false
        });
      });
  };

  updateProfile = () => {
    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    const usedRef = this.View.current;

    usedRef.setState({
      error: ""
    });

    axios({
      method: "PATCH",
      url: `http://${this.server}:5000/api/profile`,
      headers: headers,
      data: {
        username: this.View.current.state.userName,
        email: this.View.current.state.email
      }
    })
      .then(response => {
        console.log("Updatinging profile was succesful");
        usedRef.setState({
          updateSuccess: true,
          profileChanged: false
        });
      })
      .catch(error => {
        console.log(error);
        usedRef.setState({
          error: error.response ? error.response.data : error
        });
      });
  };

  updatePassword = () => {
    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    const usedRef = this.View.current;

    usedRef.setState({
      error: ""
    });

    axios({
      method: "PATCH",
      url: `http://${this.server}:5000/api/profile/password`,
      headers: headers,
      data: {
        password: this.View.current.state.password
      }
    })
      .then(response => {
        console.log("Changing password was succesful");
        usedRef.setState({
          password: "",
          passwordSuccess: true
        });
      })
      .catch(error => {
        console.log(error);
        usedRef.setState({
          password: "",
          error: error.response ? error.response.data : error
        });
      });
  };

  render() {
    return (
      <ProfileView
        ref={this.View}
        updateProfile={this.updateProfile}
        updatePassword={this.updatePassword}
      />
    );
  }
}
