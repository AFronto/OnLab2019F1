import React from 'react';
import {
  View,
  StyleSheet
} from "react-native";
import { Router, Switch, Route } from './routing';
import LogIn from './LogIn';
import Home from './Home';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
});
const store = createStore(rootReducer);

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
