import React from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {getResetAction, Api, Storage, USER_KEY, Button} from '../../common';
import styles from '../../styles/styles.native';

import Authenticate from "../authComponent";
import SearchView from "./searchView";

export default class Dashboard extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: "",
      data: [],
      isFetching: false
    };
  }

  logout = () => {
    Storage.remove(USER_KEY);
    this.props.navigation.dispatch(getResetAction("Login"));
  };

  onChange = async value => {
    this.setState({isFetching: true});
    try {
      let response = await Api.get(`https://swapi.co/api/planets/?search=${value}&format=json`);
      this.setState({isFetching: false, data: response.results, selectedIndex: false});
    } catch (err) {
      this.setState({isFetching: false});
      console.error(err);
    }
  };

  async componentWillMount() {
    await this.onChange("");
  }

  keyExtractor = item => item.name;
  onPressItem = selectedIndex => this.setState({selectedIndex});
  renderItem = ({item, index}) => {
    return (
      <Text>Hello</Text>
    );
    //<ListItem item={item} selected={this.state.selectedIndex === index} index={index} onPressItem={this.onPressItem}/>
  };

  render() {
    const {selectedIndex, data, isFetching} = this.state;
    const {username} = this.props;

    return (
      <Authenticate navigation={this.props.navigation}>
        <View style={styles.header} key="search view">
          <Button.Transparent text="Logout" onPress={this.logout}/>
        </View>
        <View style={styles.f1}>
          <SearchView username={username} onChange={this.onChange}/>
          <View style={styles.container}>
            <FlatList
              extraData={selectedIndex}
              data={data}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
            {!isFetching &&
            data.length === 0 &&
            <View style={[StyleSheet.absoluteFill, styles.center]}>
              <Text>Nothing to show here.</Text>
            </View>}
            {isFetching && <ActivityIndicator style={StyleSheet.absoluteFill}/>}
          </View>
        </View>
      </Authenticate>
    )
  }
}
