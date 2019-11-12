import React, { Component } from "react";
import { Spinner } from "native-base";
import { Redirect } from "../HomeScreen/routing";

export default class SkillView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: "",
      skills: ""
    };
  }

  render() {
    return this.state.loading ? (
      <Spinner color="#5067ff" />
    ) : (
      <Redirect to="/createSkill" />
    );
  }
}
