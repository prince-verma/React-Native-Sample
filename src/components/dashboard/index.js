import React from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {getResetAction, Api, Storage, USER_KEY, Button, showSnackbar} from '../../common';
import styles from '../../styles/styles.native';

import Authenticate from "../authComponent";
import SearchView from "./searchView";
import ListItem from "./listItem";

export default class Dashboard extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: "",
      data: [],
      fetchingData: false,
      username: ""
    };
  }

  logout = () => {
    Storage.remove(USER_KEY);
    this.props.navigation.dispatch(getResetAction("Login"));
  };

  onChange = async (value) => {
    if (value || value === "") {
      try {
        this.setState({fetchingData: true});
        let response = await Api.get(`https://swapi.co/api/planets/?search=${value.trim()}&format=json`);
        let results = response.results ? response.results : [];
        results = results.sort((a, b) => {
          let aPopulation = isNaN(a.population) ? 0 : a.population;
          let bPopulation = isNaN(b.population) ? 0 : b.population;
          return (bPopulation - aPopulation)
        });
        this.setState({fetchingData: false, data: results, selectedIndex: false});
      } catch (err) {
        this.setState({fetchingData: false});
      }
    }
  };

  async componentWillMount() {
    let {username} = this.state;
    try {
      username = await Storage.get(USER_KEY);
    } catch (err) {

    }
    this.setState({username}, async () => {
      await this.onChange("");
    });
  }

  getNameKey = item => item.name;
  onPressItem = selectedIndex => this.setState({selectedIndex});
  renderItem = ({item, index}) => {
    const {data} = this.state;
    return (
      <ListItem
        item={item}
        selected={this.state.selectedIndex === index}
        index={index}
        max={data.length}
        onPressItem={this.onPressItem}/>
    );
  };

  render() {
    const {selectedIndex, data, fetchingData, username} = this.state;

    return (
      <Authenticate navigation={this.props.navigation}>
        <View style={styles.f1}>
          <View style={[styles.header]}>
            <Button.Transparent text="Logout" onPress={this.logout}/>
          </View>
          <SearchView username={username} onChange={this.onChange}/>
          <View style={[styles.f1]}>
            <FlatList
              extraData={selectedIndex}
              data={data}
              keyExtractor={this.getNameKey}
              renderItem={this.renderItem}
            />
            {
              (!fetchingData && data.length === 0) ?
                <View style={[StyleSheet.absoluteFill, styles.center]}>
                  <Text>Nothing to show here.</Text>
                </View> : null
            }
            {fetchingData ? <ActivityIndicator color="#46407B" style={[StyleSheet.absoluteFill]}/> : null}
          </View>
        </View>
      </Authenticate>
    )
  }
}
