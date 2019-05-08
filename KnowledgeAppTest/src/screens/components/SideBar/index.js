import React, { Component } from 'react';
import { Platform } from "react-native";
import SideBarView from './SideBarView';
import {withRouter} from '../../HomeScreen/routing';

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    redirectTo = (text) => {
        this.props.history.push(text);
        if (Platform.OS === 'android'){
            this.props.closeDrawer();
        }
    }

    render() {
        return (
            <SideBarView redirectTo={this.redirectTo} deleteJWT={this.props.deleteJWT}/>
        );
    }
}

export default withRouter(SideBar);