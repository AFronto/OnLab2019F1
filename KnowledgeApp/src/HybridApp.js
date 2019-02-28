import React from 'react';
import {
  View,
  StyleSheet,
  Platform
} from "react-native";
import { Router, Switch, Route } from './routing';
import LogIn from './screens/LogIn';
import Home from './screens/Home';
import Authentication from "./Authentication";

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  form: formReducer,
});
const store = createStore(rootReducer);

const serverUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';

Authentication.url = serverUrl + '/LogIn/Auth';

export default class HybridApp extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Router>
            <Switch>
              <Route exact path="/" render={props => <LogIn {...props} />} />
              <Route path="/home" render={props => <Home {...props} />} />
            </Switch>
          </Router>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  }
});
