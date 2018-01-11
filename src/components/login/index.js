import React from 'react';
import {
  Text,
  View,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/styles.native';
import {Input, Api, Storage, USER_KEY, showSnackbar, getResetAction, Button} from '../../common';

//Luke Skywalker, 19BBY
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "", password: "",
      isLoading: false
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

    if (!username) {
      return showSnackbar("Please provide username.");
    }
    if (!password) {
      return showSnackbar("Please provide password.");
    }

    this.setState({isLoading: true});
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
            this.setState({isLoading: false, isLoggedIn});
          });
        } else {
          showSnackbar("Invalid username or password.");
          this.setState({isLoading: false});
        }
      }).catch(error => {
        this.setState({isLoading: false});
      });
  };

  render() {
    const {isLoading} = this.state;
    const commonInputProps = {
      borderBottomColor: '#FFF',
      inputStyle: styles.cWhite,
      placeholderTextColor: 'rgba(255,255,255,0.5)',
      onSubmitEditing: this.onLogin
    };
    const loginButtonStyle = [styles.circle50, styles.bgWhite, {elevation: 10, alignSelf: 'flex-end'}];

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[{flex: 1}, styles.bgApp, styles.ph20]}>

          <View style={[styles.pv20]}>
            <Text style={[styles.cWhite, styles.font24]}>Welcome</Text>
          </View>

          <Text style={[styles.cWhite]}>Your email</Text>
          <Input
            {...commonInputProps}
            placeholder={'Username'}
            icon={{name: "person", color: '#FFF', size: 24}}
            onChangeText={(text) => {
              this.onChange("username", text);
            }}/>

          <Text style={[styles.cWhite, styles.mt10]}>Your password</Text>
          <Input
            {...commonInputProps}
            secureTextEntry
            placeholder={'Password'}
            inputStyle={[styles.cWhite]}
            icon={{name: "vpn-key", color: '#FFF', size: 24}}
            onChangeText={(text) => {
              this.onChange("password", text);
            }}/>

          <View style={[styles.mv10]}>
            <Button.Transparent text={"Forgot Password?"}/>
          </View>

          {
            !isLoading ?
              <TouchableOpacity
                activeOpacity={0.7}
                style={loginButtonStyle}
                onPress={this.onLogin}>
                <Icon name="chevron-right" size={30} color="#46407B"/>
              </TouchableOpacity>
              : null
          }
          {isLoading ? <ActivityIndicator color="#FFF" style={StyleSheet.absoluteFill}/> : null}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
