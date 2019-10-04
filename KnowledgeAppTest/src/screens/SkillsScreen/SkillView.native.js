import React, { Component } from "react";
import AllSkillTreeView from "./Components/AllSkillTreeView";
import commonStyles from "../_common/commonStyles";
import { Tab, Tabs } from "native-base";
import { SkillViewTypes } from "./Model/SkillViewTypesEnum";

export default class SkillView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actTab: SkillViewTypes.TREEVIEW
    };
    this.TreeView = React.createRef();
  }

  tabChange = ({ i }) => {
    switch (i) {
      case 0:
        this.setState({ actTab: SkillViewTypes.TREEVIEW }, () =>
          this.props.loadSkills()
        );
        break;
      case 1:
        this.setState({ actTab: SkillViewTypes.MYSKILLS }, () =>
          this._onRefresh()
        );
        break;
      default:
        this.setState({ actTab: SkillViewTypes.TREEVIEW }, () =>
          this.props.loadSkills()
        );
        break;
    }
  };

  render() {
    return (
      <Tabs locked onChangeTab={this.tabChange}>
        <Tab
          heading="All Skills"
          style={commonStyles.defaultBackground}
          tabStyle={commonStyles.defaultOverlayBackgroundColor}
          activeTabStyle={commonStyles.defaultOverlayBackgroundColor}
        >
          <AllSkillTreeView
            ref={this.TreeView}
            loadSkills={this.props.loadSkills}
            redirectToCreate={this.props.redirectToCreate}
            addSkillToMe={this.props.addSkillToMe}
            removeSkillFromMe={this.props.removeSkillFromMe}
            deleteSkill={this.props.deleteSkill}
            setRunOnClick={this.props.setRunOnClick}
          />
        </Tab>
        <Tab
          heading="My Skills"
          style={commonStyles.defaultBackground}
          tabStyle={commonStyles.defaultOverlayBackgroundColor}
          activeTabStyle={commonStyles.defaultOverlayBackgroundColor}
        ></Tab>
      </Tabs>
    );
  }
}
