/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View, AppRegistry, StatusBar} from 'react-native';
import Index from './src/index.native';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#48487B"/>
        <Index/>
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
