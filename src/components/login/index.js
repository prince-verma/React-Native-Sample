import React from 'react';
import {Text, View, Keyboard, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles.native';
import {Input, Api, Storage, USER_KEY, showSnackbar, getResetAction, Button} from '../../common';

//Luke Skywalker, 19BBY
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "", password: ""
    }
  }

  static navigationOptions = {
    header: null
  };

  onChange = (key, value) => this.state[key] = value;

  onLogin = () => {
    const {navigation} = this.props;
    let {username, password} = this.state;
    username = username ? username.trim() : "";
    password = password ? password.trim() : "";
    // this.setState({isFetching: true});

    if (!username) {
      return showSnackbar("Please provide username.");
    }
    if (!password) {
      return showSnackbar("Please provide password.");
    }

    return Api.get(`https://swapi.co/api/people/?search=${username}&format=json`)
      .then(responseJson => responseJson.results)
      .then(result => {
        result = result.filter(user => {
          return user.name === username && user.birth_year === password;
        });
        if (result.length === 1) {
          let isLoggedIn = true;

          Storage.set(USER_KEY, result[0].name).then(() => {
            navigation.dispatch(getResetAction("Dashboard"));
          }).catch((err) => {
            isLoggedIn = false;
            this.setState({isFetching: false, isLoggedIn});
          });
        } else {
          this.setState({isFetching: false});
        }
      }).catch(error => {
        this.setState({isFetching: false});
        console.error(error);
      });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[{flex: 1}, styles.bgApp, styles.ph20]}>

          <View style={[styles.pv20]}>
            <Text style={[styles.cWhite, styles.font24]}>Welcome</Text>
          </View>

          <Text style={[styles.cWhite]}>Your email</Text>
          <Input borderBottomColor={'#FFF'} inputStyle={styles.cWhite}
                 placeholder={'username'} placeholderTextColor={'rgba(255,255,255,0.5)'}
                 icon={{name: "person", color: '#FFF', size: 24}}
                 onChangeText={(text) => {
                   this.onChange("username", text);
                 }}/>

          <Text style={[styles.cWhite]}>Your password</Text>
          <Input borderBottomColor={'#FFF'} secureTextEntry={true}
                 ref='password'
                 placeholder={'Password'} placeholderTextColor={'rgba(255,255,255,0.5)'}
                 inputStyle={[styles.cWhite]}
                 icon={{name: "vpn-key", color: '#FFF', size: 24}}
                 onChangeText={(text) => {
                   this.onChange("password", text);
                 }}/>

          <View style={[styles.mv10]}>
            <Button.Transparent text={"Forgot Password?"}/>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.circle50, styles.bgWhite, {elevation: 10, alignSelf: 'flex-end'}]}
            onPress={this.onLogin}>
            <Icon name="chevron-right" size={30} color="#46407B"/>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
