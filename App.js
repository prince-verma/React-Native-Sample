import React, {Component} from 'react';
import {View, AppRegistry, StatusBar} from 'react-native';
import Index from './src/index.native';
import Snackbar from '@prince8verma/react-native-snackbar';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#48487B"/>
        <Index/>
        <Snackbar id={"Root_App"}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
