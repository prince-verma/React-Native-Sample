import React from "react";
import {View} from "react-native";
import {showSnackbar, Input} from '../../common'
import styles from '../../styles/styles.native';

export default class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.count = 0;
    this.interval = undefined;
  }

  shouldComponentUpdate() {
    return false;
  }

  onChangeText = value => {
    if (this.count >= 15 && this.props.username !== "Luke Skywalker") {
      showSnackbar("You can not make more then 15 searches in a minute");
      return;
    }
    this.interval && clearTimeout(this.interval);
    this.interval = setTimeout(() => {
      this.interval = undefined;
      this.count++;
      this.props.onChange(value);
      setTimeout(() => {
        this.count = 0;
      }, 60 * 1000);
    }, 250);
  };

  render() {
    return (
      <View style={[styles.mb15]}>
        <Input
          borderBottomColor={'#48487B'}
          placeholder={'search'} placeholderTextColor={'rgba(72,72,123,0.5)'}
          inputStyle={[styles.cAppDark]}
          icon={{name: "search", color: '#48487B', size: 24}}
          onChangeText={this.onChangeText()}/>
      </View>
    );
  }
}