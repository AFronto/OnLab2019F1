import React, { Component } from "react";
import { Platform } from "react-native";
import axios from "axios";
import * as signalR from "@aspnet/signalr";
import ThreadView from "./ThreadView";
import env from "../../env";
import { ListTypes } from "./Model/ListTypesEnum";

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
        console.log(error);
        this.View.current.setState({
          error: "Error retrieving data"
        });
      });
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

  redirectToCreate = () => {
    this.props.history.push(`/createMessage`);
  };

  render() {
    return (
      <ThreadView
        ref={this.View}
        loadConversation={this.loadConversation}
        redirectToCreate={this.redirectToCreate}
        sendMessage={this.sendMessage}
        deleteConversation={this.deleteConversation}
        loadList={this.loadList}
      />
    );
  }
}
