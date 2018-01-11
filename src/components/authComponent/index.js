import React from 'react';
import {StyleSheet, ActivityIndicator} from "react-native";
import {Storage, USER_KEY} from '../../common'
import Login from "../login";

export default class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false, username: ""
    }
  }

  async componentWillMount() {
    let {isLogin, username} = this.state;
    try {
      username = await Storage.get(USER_KEY);
      isLogin = !!username;
    } catch (err) {
      isLogin = false;
    }
    this.setState({isLogin, username});
  }

  render() {
    let {isLogin, username} = this.state;

    if (!isLogin && username === "") {
      return <ActivityIndicator color="#46407B" style={[StyleSheet.absoluteFill]}/>
    }
    if (!isLogin) {
      return <Login navigation={this.props.navigation}/>
    }

    return (this.props.children)
  }
}
