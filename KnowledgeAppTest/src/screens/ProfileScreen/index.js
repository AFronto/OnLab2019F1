import React, { Component } from "react";
import { Text } from "native-base";
import { Platform } from "react-native";
import commonStyles from "../_common/commonStyles";
import env from "../../env";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === "android") {
      this.server = env.ServerUrlForAndroid;
      this.props.setTitle("Profile");
    } else {
      this.server = env.ServerUrlForWeb;
    }
  }

  render() {
    return <Text style={commonStyles.menuText}>ProfileScreen</Text>;
  }
}
