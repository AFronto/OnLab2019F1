import React from "react";
import { Content, Text, List, Button, Icon, ListItem } from "native-base";
import commonStyles from '../commonStyles';

export default class SideBarView extends React.Component {
    render() {
        return (
            <Content style={{ backgroundColor: "#1A1D2E", flexBasis: "auto", flexGrow: 0, width: "13%" }}>
                <List>
                    <Button transparent block iconLeft onPress={() => this.props.redirectTo("/profile")}>
                        <Icon name="md-contact" style={commonStyles.menuIcon} />
                        <Text style={commonStyles.menuText}>Profile</Text>
                    </Button>
                    <Button transparent block iconLeft onPress={() => this.props.redirectTo("/")}>
                        <Icon name="md-cloud" style={commonStyles.menuIcon} />
                        <Text style={commonStyles.menuText}>Skills</Text>
                    </Button>                    
                    <Button transparent block iconLeft onPress={() => this.props.redirectTo("/threads")}>
                        <Icon name="md-bookmark" style={commonStyles.menuIcon} />
                        <Text style={commonStyles.menuText}>Threads</Text>
                    </Button>
                    <Button transparent block iconLeft onPress={this.props.deleteJWT}>
                        <Icon name="md-exit" style={commonStyles.menuIcon}/>
                        <Text style={commonStyles.menuText}>Log Out</Text>
                    </Button>
                </List>
            </Content>
        );
    }
}