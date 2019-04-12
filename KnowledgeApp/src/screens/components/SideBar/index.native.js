import React from "react";
import { Platform } from 'react-native';
import { Content, Text, List, Button, Icon, ListItem } from "native-base";
import commonStyles from '../commonStyles';
import { Link } from '../../HomeScreen/routing'

export default class SideBar extends React.Component {
    render() {
        return (
            <Content style={Platform.OS === 'android' ? { backgroundColor: '#131726' }
                : { backgroundColor: "#0e121e", flexBasis: "auto", flexGrow: 0 }
            }>
                <List>
                    <ListItem >
                        <Icon name="md-contact" style={commonStyles.menuIcon} />
                        <Link to={"/profile"} onPress={this.props.closeDrawer}>
                            <Text style={commonStyles.menuText}>Profile</Text>
                        </Link>
                    </ListItem>
                    <ListItem >
                        <Icon name="md-cloud" style={commonStyles.menuIcon} />
                        <Link to={"/"} onPress={this.props.closeDrawer}>
                            <Text style={commonStyles.menuText}>Skills</Text>
                        </Link>
                    </ListItem>
                    <ListItem >
                        <Icon name="md-bookmark" style={commonStyles.menuIcon} />
                        <Link to={"/threads"} onPress={this.props.closeDrawer}>
                            <Text style={commonStyles.menuText}>Threads</Text>
                        </Link>
                    </ListItem>
                    <Button transparent block iconLeft onPress={this.props.deleteJWT}>
                        <Icon name="md-exit" style={{ color: '#FFFFFF' }} />
                        <Text style={commonStyles.menuText}>Log Out</Text>
                    </Button>
                </List>
            </Content>
        );
    }
}