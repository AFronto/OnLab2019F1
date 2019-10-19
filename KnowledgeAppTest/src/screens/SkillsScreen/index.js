import React, { Component } from "react";
import { Platform } from "react-native";
import axios from "axios";
import SkillView from "./SkillView";
import env from "../../env";

export default class SkillsScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === "android") {
      this.server = env.ServerUrlForAndroid;
      this.props.setTitle("Skills");
    } else {
      this.server = env.ServerUrlForWeb;
    }
    this.View = React.createRef();
  }

  componentDidMount() {
    this.loadSkills();
    this.loadMySkills();
  }

  loadSkills = () => {
    if (Platform.OS === "android") {
      this.props.setRunOnClick(null);
    }

    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    const usedRef = this.View.current;

    usedRef.setState({
      error: ""
    });

    axios({
      method: "GET",
      url: "http://" + this.server + ":5000/api/skills/tree",
      headers: headers
    })
      .then(response => {
        usedRef.setState({
          skills: response.data.skills,
          skillsShown: response.data.skills
            .map(s => {
              return {
                id: s.id,
                $id: s.$id,
                name: s.name,
                userKnows: s.userKnows
              };
            })
            .sort((a, b) =>
              a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
            ),
          loading: false
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

  loadMySkills = () => {
    if (Platform.OS === "android") {
      this.props.setRunOnClick(null);
    }

    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    const usedRef = this.View.current;

    usedRef.setState({
      error: ""
    });

    axios({
      method: "GET",
      url: "http://" + this.server + ":5000/api/skills/mySkills",
      headers: headers
    })
      .then(response => {
        usedRef.setState({
          mySkills: response.data.skills.sort((a, b) =>
            a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
          ),
          loading: false
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

  redirectToCreate = () => {
    this.props.history.push(`/createSkill`);
  };

  deleteSkill = id => {
    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    const usedRef = this.View.current.TreeView
      ? this.View.current.TreeView.current
      : this.View.current;

    usedRef.setState({
      error: ""
    });

    axios({
      method: "DELETE",
      url: "http://" + this.server + `:5000/api/skills/${id}`,
      headers: headers
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        usedRef.setState({
          error: error.response.data.error,
          loading: false
        });
      });
  };

  addSkillToMe = id => {
    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    const usedRef = this.View.current.TreeView
      ? this.View.current.TreeView.current
      : this.View.current;

    usedRef.setState({
      error: ""
    });

    axios({
      method: "PATCH",
      url: "http://" + this.server + `:5000/api/skills/${id}/add`,
      headers: headers
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        usedRef.setState({
          error: error.response.data.error,
          loading: false
        });
      });
  };

  removeSkillFromMe = id => {
    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    const usedRef = this.View.current.TreeView
      ? this.View.current.TreeView.current
      : this.View.current;

    usedRef.setState({
      error: ""
    });

    axios({
      method: "PATCH",
      url: "http://" + this.server + `:5000/api/skills/${id}/remove`,
      headers: headers
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        usedRef.setState({
          error: error.response.data.error,
          loading: false
        });
      });
  };

  render() {
    return (
      <SkillView
        ref={this.View}
        loadSkills={this.loadSkills}
        loadMySkills={this.loadMySkills}
        redirectToCreate={this.redirectToCreate}
        addSkillToMe={this.addSkillToMe}
        removeSkillFromMe={this.removeSkillFromMe}
        deleteSkill={this.deleteSkill}
        setRunOnClick={this.props.setRunOnClick}
      />
    );
  }
}
