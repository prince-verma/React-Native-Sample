import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'native-base';
import {Storage, USER_KEY} from '../../common';

import Authenticate from "../authComponent";
import {NavigationActions} from "react-navigation";

export default class Dashboard extends React.Component {
  static navigationOptions = {
    header : null
  };

  constructor(props) {
    super(props);
  }

  logout = () => {
    Storage.remove(USER_KEY);
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Login'})]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <Authenticate navigation={this.props.navigation}>
        <View><Text>hello</Text></View>
        <Button onPress={this.logout}><Text>Logout</Text></Button>
      </Authenticate>
    )
  }
}
