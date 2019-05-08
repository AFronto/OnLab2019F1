import React, { Component } from 'react';
import commonStyles from '../components/commonStyles';
import { Text, Spinner, View, List, ListItem, Button, Icon, Fab} from "native-base";
import { ListView } from 'react-native';

export default class SkillView extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            loading: true,
            error: '',
            skills: ""
        };
        console.log("akarmi");
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.skills];
        var name = newData[rowId].name;
        newData.splice(rowId, 1);
        this.setState({ skills: newData });
        this.props.deleteSkill(name);
    }

    render() {
        return (
            this.state.loading ?
                <Spinner color='#5067ff' />
                :
                <View style={{ flex: 1 }}>
                    <Text style={commonStyles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                    <List
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        dataSource={this.ds.cloneWithRows(this.state.skills)}
                        renderRow={skill =>
                            <ListItem style={{ backgroundColor: '#131726', justifyContent: 'center' }}>
                                <Text style={commonStyles.menuText}> {skill.name} </Text>
                            </ListItem>}
                        renderLeftHiddenRow={skill =>
                            <Button full onPress={() => alert(skill.description)}>
                                <Icon active name="information-circle" />
                            </Button>}
                        renderRightHiddenRow={(skill, secId, rowId, rowMap) =>
                            <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                <Icon active name="trash" />
                            </Button>}
                    />
                    <Fab
                        onPress={this.props.redirectToCreate}
                        style={{ backgroundColor: '#5067FF' }}>
                        <Icon name="md-add" />
                    </Fab>
                </View>
        );
    }
}