import React, { Component } from "react";
import AllThreadView from "./Components/AllThreadView";
import { View, Button, Text, Spinner, Icon } from "native-base";
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

  refresh = () => {
    const { actTab } = this.state;
    this.setState({ reading: null });
    this.props.loadList(actTab);
  };

  tabChange = i => {
    switch (i) {
      case 0:
        this.setState({ actTab: ListTypes.MYFEED }, () => this.refresh());
        break;
      case 1:
        this.setState({ actTab: ListTypes.ALL }, () => this.refresh());
        break;
      case 2:
        this.setState({ actTab: ListTypes.MYTHREADS }, () => this.refresh());
        break;
      default:
        this.setState({ actTab: ListTypes.MYFEED }, () => this.refresh());
        break;
    }
  };

  actTabContent = () => {
    const { actTab } = this.state;
    switch (actTab) {
      case ListTypes.MYFEED:
        return this.MyFeedList;

      case ListTypes.ALL:
        return this.AllThreadList;

      case ListTypes.MYTHREADS:
        return this.MyThreadsList;

      default:
        return this.MyFeedList;
    }
  };

  renderTabContent = list => {
    return (
      <AllThreadView
        ref={list}
        read={this.read}
        delete={this.delete}
        refresh={() => {
          return null;
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        {this.state.reading ? (
          <ConversationView
            ref={this.Conversation}
            sendMessage={this.props.sendMessage}
            questionId={this.state.reading}
          />
        ) : (
          <View />
        )}
        <View style={{ width: "35%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: "100%",
              flexGrow: 0,
              marginBottom: 40,
              paddingTop: 10
            }}
          >
            <Button
              block
              rounded
              onPress={this.props.redirectToCreate}
              style={{
                marginLeft: 10,
                marginRight: 15,
                flexGrow: 1,
                flexShrink: 1
              }}
            >
              <Text style={commonStyles.commonText}>New Thread</Text>
            </Button>
            <Button
              block
              rounded
              success
              style={{ marginRight: 10 }}
              onPress={this.refresh}
            >
              <Icon name="md-refresh" style={{ color: "#FFFFFF" }} />
            </Button>
          </View>
          {this.state.loading ? (
            <View
              style={{
                flex: 1,
                width: "100%",
                flexGrow: 1
              }}
            >
              <Spinner color="#5067ff" />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                width: "100%",
                flexGrow: 1
              }}
            >
              {this.renderTabContent(this.actTabContent())}
            </View>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: "100%",
              flexGrow: 0,
              marginBottom: 40,
              paddingTop: 10
            }}
          >
            <Button
              block
              bordered={this.state.actTab !== ListTypes.MYFEED}
              onPress={() => this.tabChange(0)}
              style={{
                marginLeft: 10,
                marginRight: 15,
                flexGrow: 1,
                flexShrink: 1
              }}
            >
              <Text style={commonStyles.commonText}>My Feed</Text>
            </Button>
            <Button
              block
              bordered={this.state.actTab !== ListTypes.ALL}
              onPress={() => this.tabChange(1)}
              style={{
                marginLeft: 10,
                marginRight: 15,
                flexGrow: 1,
                flexShrink: 1
              }}
            >
              <Text style={commonStyles.commonText}>All Threads</Text>
            </Button>
            <Button
              block
              bordered={this.state.actTab !== ListTypes.MYTHREADS}
              onPress={() => this.tabChange(2)}
              style={{
                marginLeft: 10,
                marginRight: 15,
                flexGrow: 1,
                flexShrink: 1
              }}
            >
              <Text style={commonStyles.commonText}>My Threads</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
