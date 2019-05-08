import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import axios from 'axios';
import { Drawer, Header, Left, Icon, Right, Button, Body, Title} from "native-base";
import SideBar from '../components/SideBar';
import { Router, Switch, Route } from './routing';
import SkillsScreen from '../SkillsScreen';
import ThreadsScreen from '../ThreadsScreen';
import ProfileScreen from '../ProfileScreen';
import SkillCreateScreen from '../SkillCreateScreen';
import commonStyles from '../components/commonStyles';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : "",
        };
    }

    addSkill = () => {
        const headers = {
            'Authorization': 'Bearer ' + this.props.jwt
        };
        axios({
            method: 'PATCH',
            url: 'http://localhost:5000/api/skills/Web/add',
            headers: headers,
        }).then((response) => {
            console.log("response: " + response);
        }).catch((error) => {
            console.log(error);
        });
    }

    closeDrawer = () => {
        this.drawer._root.close()
    }

    openDrawer = () => {
        this.drawer._root.open()
    };

    setTitle = (title) => {
        this.setState({title: title});
    }

    render() {
        const { container, webHomeContainer, skillText, errorText } = styles;

        if (Platform.OS === 'android') {
            return (
                <Router>
                    <Drawer ref={(ref) => { this.drawer = ref; }}
                        content={<SideBar deleteJWT={this.props.deleteJWT} closeDrawer={this.closeDrawer}/>}
                        onClose={() => this.closeDrawer()} >
                        <Header style={{ backgroundColor: "#1A1D2E" }}>
                            <Left>
                                <Button
                                    transparent
                                    onPress={this.openDrawer}>
                                    <Icon name="md-menu" />
                                </Button>
                            </Left>
                            <Body>
                                <Title>
                                    {this.state.title}
                                </Title>
                            </Body>
                            <Right />
                        </Header>
                        <Switch>
                            <Route exact path="/" render={props => <SkillsScreen {...props} jwt={this.props.jwt} setTitle={this.setTitle}/>} />
                            <Route path="/createSkill" render={props => <SkillCreateScreen {...props} jwt={this.props.jwt} setTitle={this.setTitle}/>} />
                            <Route path="/threads" render={props => <ThreadsScreen {...props} jwt={this.props.jwt} setTitle={this.setTitle}/>} />
                            <Route path="/profile" render={props => <ProfileScreen {...props} jwt={this.props.jwt} setTitle={this.setTitle}/>} />
                        </Switch>
                    </Drawer>
                </Router>
            );
        } else {
            return (
                <View style={webHomeContainer}>
                    <Router>
                        <SideBar deleteJWT={this.props.deleteJWT} />
                        <Switch>
                            <Route exact path="/" render={props => <SkillsScreen {...props} jwt={this.props.jwt}/>} />
                            <Route path="/createSkill" render={props => <SkillCreateScreen {...props} jwt={this.props.jwt} />} />
                            <Route path="/threads" render={props => <ThreadsScreen {...props} jwt={this.props.jwt} />} />
                            <Route path="/profile" render={props => <ProfileScreen {...props} jwt={this.props.jwt} />} />
                        </Switch>
                    </Router>
                </View>
            );
        }
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    webHomeContainer: {
        flex: 1,
        backgroundColor: '#131726',
        justifyContent: "flex-start",
        flexDirection: "row",
        height: "100%"
    },
    skillText: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 20
    },
    errorText: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    }
};