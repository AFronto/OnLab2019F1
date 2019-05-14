import React from "react";
import { Content, Text, List, Button, Icon, ListItem } from "native-base";
import commonStyles from '../commonStyles';

export default class SideBarView extends React.Component {
    render() {
        return (
            <Content style={{ backgroundColor: '#131726' }}>
                <List>
                    <Button transparent iconLeft onPress={() => this.props.redirectTo("/profile")}>
                        <Icon name="md-contact" style={commonStyles.menuIcon} />
                        <Text style={commonStyles.menuText}>Profile</Text>
                    </Button>
                    <Button transparent iconLeft onPress={() => this.props.redirectTo("/skills")}>
                        <Icon name="md-cloud" style={commonStyles.menuIcon} />
                        <Text style={commonStyles.menuText}>Skills</Text>
                    </Button>
                    <Button transparent iconLeft onPress={() => this.props.redirectTo("/")}>
                        <Icon name="md-chatbubbles" style={commonStyles.menuIcon} />
                        <Text style={commonStyles.menuText}>Threads</Text>
                    </Button>
                    <Button transparent iconLeft onPress={this.props.deleteJWT}>
                        <Icon name="md-exit" style={commonStyles.menuIcon} />
                        <Text style={commonStyles.menuText}>Log Out</Text>
                    </Button>
                </List>
            </Content>
        );
    }
}