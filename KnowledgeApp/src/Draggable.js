import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Platform
} from "react-native";
import dotnetify from 'dotnetify/react-native';

if(Platform.OS !== 'web'){
  dotnetify.hubServerUrl = 'http://10.0.2.2:5000';
}else{
  dotnetify.hubServerUrl = 'http://localhost:5000';
}

class Draggable extends React.Component {
  constructor() {
    super();

    dotnetify.react.connect('HelloWorld', this);

    this.state = {
      pan: new Animated.ValueXY(),
      Greetings: '', 
      ServerTime: ''
    };
  }

  componentWillMount() {

    // Add a listener for the delta value change
    this._val = { x: 0, y: 0 }
    this.state.pan.addListener((value) => this._val = value);

    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y
        })
        this.state.pan.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ])
    });

    // // adjusting delta value
    // this.state.pan.setValue({ x: 0, y: 0 })
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.circle]}
      >
      <View>
        <Text>{this.state.Greetings}</Text>
        <Text>Server time is: {this.state.ServerTime}</Text>
      </View>
      </Animated.View>
    );
  }
}

let CIRCLE_RADIUS = 60;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: "red",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  }
});

export default Draggable;