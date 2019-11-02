import React, { Component } from "react";
import { Platform } from "react-native";
import axios from "axios";
import * as signalR from "@aspnet/signalr";
import ThreadView from "./ThreadView";
import env from "../../env";
import { ListTypes } from "./Model/ListTypesEnum";
import { Text, View, Button, Icon, Card, CardItem } from "native-base";
import commonStyles from "../_common/commonStyles";
import { Modal } from "../_common/modal";

export default class ThreadsScreen extends Component {
  constructor(props) {
    super(props);
    if (Platform.OS === "android") {
      this.server = env.ServerUrlForAndroid;
      this.props.setTitle("Threads");
    } else {
      this.server = env.ServerUrlForWeb;
    }
    this.View = React.createRef();
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://" + this.server + ":5000/api/thread")
      .build();

    this.connection.on(
      "ReceiveMessage",
      (message, user, username, creationTime, id) => {
        this.View.current.Conversation.current.reciveMessage(
          message,
          user,
          username,
          creationTime,
          id
        );
      }
    );

    this.connection.on("ErrorHandle", error => {
      this.handleErrorWithModal(error);
    });

    this.state = {
      modalText: "",
      modalVisible: false
    };
  }

  componentDidMount() {
    this.loadList();
  }

  componentWillUnmount() {
    this.connection
      .stop()
      .then(() => {
        console.log("Dropping connection...");
      })
      .catch(function(err) {
        return console.error(err.toString());
      });
  }

  loadList = (listType = ListTypes.MYFEED) => {
    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    this.View.current.setState({
      error: "",
      loading: true
    });

    axios({
      method: "GET",
      url: "http://" + this.server + ":5000/api/messages" + listType,
      headers: headers
    })
      .then(response => {
        this.View.current.setState({
          loading: false
        });

        switch (listType) {
          case ListTypes.MYFEED:
            this.View.current.MyFeedList.current.setState({
              threads: response.data.messages
                .sort((a, b) => (a.creationTime > b.creationTime ? 1 : -1))
                .reverse(),
              loggedInUser: response.data.loggedInUser
            });
            break;

          case ListTypes.ALL:
            this.View.current.AllThreadList.current.setState({
              threads: response.data.messages
                .sort((a, b) => (a.creationTime > b.creationTime ? 1 : -1))
                .reverse(),
              loggedInUser: response.data.loggedInUser
            });
            break;

          case ListTypes.MYTHREADS:
            this.View.current.MyThreadsList.current.setState({
              threads: response.data.messages
                .sort((a, b) => (a.creationTime > b.creationTime ? 1 : -1))
                .reverse(),
              loggedInUser: response.data.loggedInUser
            });
            break;

          default:
            this.View.current.MyFeedList.current.setState({
              threads: response.data.messages
                .sort((a, b) => (a.creationTime > b.creationTime ? 1 : -1))
                .reverse(),
              loggedInUser: response.data.loggedInUser
            });
            break;
        }
      })
      .catch(error => {
        console.log(error);
        this.View.current.setState({
          error: "Error retrieving data",
          loading: false
        });
      });
  };

  deleteConversation = id => {
    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    this.View.current.setState({
      error: ""
    });

    axios({
      method: "DELETE",
      url: "http://" + this.server + `:5000/api/messages/${id}`,
      headers: headers
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        this.View.current.setState({
          error: "Error retrieving data"
        });
      });
  };

  androidCallback = () => {
    this.View.current.setState({ reading: false });
    this.props.setRunOnClick(null);
    this.loadList();
  };

  loadConversation = id => {
    if (Platform.OS === "android") {
      this.props.setRunOnClick(this.androidCallback);
    }
    this.connection
      .stop()
      .then(() => {
        this.startingConnection(id);
      })
      .catch(function(err) {
        return console.error(err.toString());
      });
  };

  startingConnection = id => {
    this.connection
      .start()
      .then(() => {
        this.joinGroup(id);
        this.loadConversationData(id);
      })
      .catch(function(err) {
        return console.error(err.toString());
      });
  };

  loadConversationData = id => {
    console.log(`Loading conversation for ${id}...`);
    const headers = {
      Authorization: "Bearer " + this.props.jwt
    };
    this.View.current.setState({
      error: ""
    });

    axios({
      method: "GET",
      url: "http://" + this.server + `:5000/api/messages/${id}/load`,
      headers: headers
    })
      .then(response => {
        for (let msg in response.data.messages) {
          response.data.messages[msg].createdAt = new Date(
            response.data.messages[msg].createdAt * 1000
          );
        }
        if (Platform.OS === "android") {
          response.data.messages.reverse();
        }
        this.View.current.Conversation.current.setState(response.data);
      })
      .catch(error => {
        this.handleErrorWithModal(error.response.data.error);
      });
  };

  handleErrorWithModal = error => {
    this.View.current.setState({
      error: "Error retrieving data",
      reading: null
    });
    this.setState({
      modalText: error,
      modalVisible: true
    });
    if (Platform.OS === "android") {
      this.props.setRunOnClick(this.androidCallback);
    } else if (Platform.OS === "web") {
      this.View.current.setState({ actTab: ListTypes.MYFEED });
    }
    this.loadList();
    this.connection.stop();
  };

  joinGroup = id => {
    console.log(`Joining ${id}...`);
    this.connection.invoke("SubscribeToThread", id).catch(function(err) {
      return console.error(err.toString());
    });
  };

  sendMessage = (questionId, message, user) => {
    this.connection
      .invoke("SendMessage", questionId, message, user)
      .catch(function(err) {
        return console.error(err.toString());
      });
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  redirectToCreate = () => {
    this.props.history.push(`/createMessage`);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ThreadView
          ref={this.View}
          loadConversation={this.loadConversation}
          redirectToCreate={this.redirectToCreate}
          sendMessage={this.sendMessage}
          deleteConversation={this.deleteConversation}
          loadList={this.loadList}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
          style={{ backgroundColor: "#13172688" }}
        >
          <View
            style={[
              commonStyles.modalPositioning,
              { backgroundColor: "#13172688" }
            ]}
          >
            <Card
              style={
                Platform.OS === "android"
                  ? commonStyles.androidModalCard
                  : commonStyles.webModalCard
              }
            >
              <CardItem style={commonStyles.cardItemContentRowFlexStart}>
                <Icon name="md-warning" style={{ color: "#FFFFFF" }} />
                <View style={commonStyles.textRows}>
                  <Text style={[commonStyles.commonText]}>
                    {this.state.modalText}
                    {Platform.OS === "web" && "\n"}
                  </Text>
                  <Text style={commonStyles.commonText}>
                    {"\n"}
                    These actions cannot be completed! {"\n"}
                    Your actions will be reverted!
                  </Text>
                </View>
              </CardItem>
              <CardItem style={commonStyles.cardItemContentRowSpaceAround}>
                <Button
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                >
                  <Text style={commonStyles.commonText}>I understand!</Text>
                </Button>
              </CardItem>
            </Card>
          </View>
        </Modal>
      </View>
    );
  }
}
