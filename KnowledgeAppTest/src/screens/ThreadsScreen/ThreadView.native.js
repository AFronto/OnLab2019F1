import React, { Component } from "react";
import AllThreadView from "./Components/AllThreadView";
import { View, Fab, Icon, Tab, Tabs } from "native-base";
import { RefreshControl } from "react-native";
import ConversationView from "./Components/ConversationView";
import commonStyles from "../_common/commonStyles";
import { ListTypes } from "./Model/ListTypesEnum";

export default class ThreadView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: "",
      reading: null,
      actTab: ListTypes.MYFEED
    };
    this.MyFeedList = React.createRef();
    this.AllThreadList = React.createRef();
    this.MyThreadsList = React.createRef();
    this.Conversation = React.createRef();
  }

  read = id => {
    this.setState({ reading: id });
    this.props.loadConversation(id);
  };

  delete = id => {
    this.setState({ reading: null });
    this.props.deleteConversation(id);
  };

  refreshView = () => {
    return (
      <RefreshControl
        refreshing={this.state.loading}
        onRefresh={this._onRefresh}
        progressBackgroundColor={"#5cb85c"}
        colors={["#FFFFFF"]}
      />
    );
  };

  _onRefresh = () => {
    const { actTab } = this.state;
    this.props.loadList(actTab);
    this.forceUpdate();
  };

  tabChange = ({ i }) => {
    switch (i) {
      case 0:
        this.setState({ actTab: ListTypes.MYFEED }, () => this._onRefresh());
        break;
      case 1:
        this.setState({ actTab: ListTypes.ALL }, () => this._onRefresh());
        break;
      case 2:
        this.setState({ actTab: ListTypes.MYTHREADS }, () => this._onRefresh());
        break;
      default:
        this.setState({ actTab: ListTypes.MYFEED }, () => this._onRefresh());
        break;
    }
  };

  renderTabContent = list => {
    return (
      <AllThreadView
        ref={list}
        read={this.read}
        delete={this.delete}
        refresh={this.refreshView}
      />
    );
  };

  render() {
    if (this.state.reading) {
      return (
        <ConversationView
          ref={this.Conversation}
          sendMessage={this.props.sendMessage}
          questionId={this.state.reading}
        />
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Tabs locked onChangeTab={this.tabChange}>
            <Tab
              heading="My Feed"
              style={commonStyles.defaultBackground}
              tabStyle={commonStyles.defaultOverlayBackgroundColor}
              activeTabStyle={commonStyles.defaultOverlayBackgroundColor}
            >
              {this.renderTabContent(this.MyFeedList)}
            </Tab>
            <Tab
              heading="All Threads"
              style={commonStyles.defaultBackground}
              tabStyle={commonStyles.defaultOverlayBackgroundColor}
              activeTabStyle={commonStyles.defaultOverlayBackgroundColor}
            >
              {this.renderTabContent(this.AllThreadList)}
            </Tab>
            <Tab
              heading="My Threads"
              style={commonStyles.defaultBackground}
              tabStyle={commonStyles.defaultOverlayBackgroundColor}
              activeTabStyle={commonStyles.defaultOverlayBackgroundColor}
            >
              {this.renderTabContent(this.MyThreadsList)}
            </Tab>
          </Tabs>
          <Fab
            onPress={this.props.redirectToCreate}
            style={{ backgroundColor: "#5067FF" }}
          >
            <Icon name="md-add" />
          </Fab>
        </View>
      );
    }
  }
}
