import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import styles from '../../styles/styles.native';

export default class ListItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (this.props.selected !== nextProps.selected);
  }

  onPressItem = () => {
    const {onPressItem, index} = this.props;
    onPressItem(index);
  };

  render() {
    const {item, selected, index, max} = this.props;
    let factor = ((max - index) / 10) + 0.2;
    let rowStyle = [{
      padding: 10,
      margin: 3,
      elevation: 1,
      borderRadius: 15,
      backgroundColor: `rgba(72,72,155, ${factor})`
    }];
    const rowInfoContainer = [{
      padding: 5, borderBottomLeftRadius: 15, borderBottomRightRadius: 15,
      backgroundColor: `rgba(72,72,123, ${factor})`
    }];
    return (
      <View>
        <TouchableOpacity onPress={this.onPressItem} style={rowStyle}>
          <Text style={[styles.cGrey, styles.bold, selected && styles.mb5]}>{item.name}</Text>
          {
            selected ?
              <View style={rowInfoContainer}>
                <RowComponent item={item} keyValue="population"/>
                <RowComponent item={item} keyValue="climate"/>
                <RowComponent item={item} keyValue="diameter"/>
                <RowComponent item={item} keyValue="gravity"/>
                <RowComponent item={item} keyValue="rotation_period"/>
                <RowComponent item={item} keyValue="surface_water"/>
                <RowComponent item={item} keyValue="terrain"/>
              </View> : null
          }
        </TouchableOpacity>
        <View style={styles.clear}/>
      </View>
    );
  }
}

function RowComponent({item, keyValue}) {
  let val = keyValue.charAt(0).toUpperCase() + keyValue.substr(1).toLowerCase();
  return (
    <Text style={[styles.mb5]}>
      <Text style={[styles.cGrey, styles.bold]}>{val}: </Text>
      <Text style={[styles.cGrey]}> {item[keyValue]}</Text>
    </Text>
  );
}