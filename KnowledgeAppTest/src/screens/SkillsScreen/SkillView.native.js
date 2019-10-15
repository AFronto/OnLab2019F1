import React, { Component } from "react";
import AllSkillTreeView from "./Components/AllSkillTreeView";
import MySkillsView from "./Components/MySkillsView";
import commonStyles from "../_common/commonStyles";
import { Tab, Tabs } from "native-base";
import { SkillViewTypes } from "./Model/SkillViewTypesEnum";

export default class SkillView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actTab: SkillViewTypes.TREEVIEW,
      loading: true,
      error: "",
      mySkills: "",
      skills: "",
      skillsShown: ""
    };
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
          this.props.loadMySkills()
        );
        break;
      default:
        this.setState({ actTab: SkillViewTypes.TREEVIEW }, () =>
          this.props.loadSkills()
        );
        break;
    }
  };

  modifyMySkillList = newList => {
    this.setState({ mySkills: newList });
  };

  modifySkillsShownList = newList => {
    return new Promise(resolve => {
      this.setState({ skillsShown: newList }, resolve);
    });
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
            loading={this.state.loading}
            error={this.state.error}
            skills={this.state.skills}
            skillsShown={this.state.skillsShown}
            modifySkillsShownList={this.modifySkillsShownList}
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
        >
          <MySkillsView
            loading={this.state.loading}
            error={this.state.error}
            mySkills={this.state.mySkills}
            modifyMySkillList={this.modifyMySkillList}
            loadMySkills={this.props.loadMySkills}
            removeSkillFromMe={this.props.removeSkillFromMe}
          />
        </Tab>
      </Tabs>
    );
  }
}
