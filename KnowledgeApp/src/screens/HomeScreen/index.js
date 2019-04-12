import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import axios from 'axios';
import { Drawer, Header, Left, Icon, Right, Button, Body, Spinner } from "native-base";
import SideBar from '../components/SideBar';
import { Router, Switch, Route } from './routing';
import SkillsScreen from '../SkillsScreen';
import ThreadsScreen from '../ThreadsScreen';
import ProfileScreen from '../ProfileScreen';


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            skills: '',
            error: ''
        };
        this.server = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
        // this.addSkill = this.addSkill.bind(this);
    }

    componentDidMount() {
        const headers = {
            'Authorization': 'Bearer ' + this.props.jwt
        };
        axios({
            method: 'GET',
            url: 'http://' + this.server + ':5000/api/skills',
            headers: headers,
        }).then((response) => {
            var list = '';
            response.data.skills.forEach(
                skill => {
                    list += skill.name + ', '
                        + skill.description
                        + '\n';
                }
            );
            this.setState({
                skills: list,
                loading: false
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                error: 'Error retrieving data',
                loading: false
            });
        });
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

    render() {
        const { container, webHomeContainer, skillText, errorText } = styles;
        const { loading, skills, error } = this.state;

        if (loading) {
            return (
                <View style={container}>
                    <Spinner color='#5067ff' />
                </View>
            )
        } else if (Platform.OS === 'android') {
            return (
                <Router>
                    <Drawer ref={(ref) => { this.drawer = ref; }}
                        content={<SideBar deleteJWT={this.props.deleteJWT} closeDrawer={this.closeDrawer}/>}
                        onClose={() => this.closeDrawer()} >
                        <Header>
                            <Left>
                                <Button
                                    transparent
                                    onPress={this.openDrawer}>
                                    <Icon name="md-menu" />
                                </Button>
                            </Left>
                            <Body />
                            <Right />
                        </Header>
                        <Switch>
                            <Route exact path="/" render={props => <SkillsScreen {...props} />} />
                            <Route path="/threads" render={props => <ThreadsScreen {...props} />} />
                            <Route path="/profile" render={props => <ProfileScreen {...props} />} />
                        </Switch>
                    </Drawer>
                </Router>
            );
        } else {
            return (
                <View style={webHomeContainer}>
                    <Router>
                        <SideBar deleteJWT={this.props.deleteJWT}/>
                        <Switch>
                            <Route exact path="/" render={props => <SkillsScreen {...props} />} />
                            <Route path="/threads" render={props => <ThreadsScreen {...props} />} />
                            <Route path="/profile" render={props => <ProfileScreen {...props} />} />
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