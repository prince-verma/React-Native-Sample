import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import styles from '../../styles/styles.native';

export default class RenderRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (this.props.selected !== nextProps.selected);
  }

  onPressItem = () => {
    const {onPressItem, index} = this.props;
    onPressItem(index);
  };

  render() {
    const {item, selected, index, max} = this.props;
    const factor = ((max - index) / 10) + 0.2;
    const rowStyle = [{
      padding: 10,
      margin: 3,
      elevation: 1,
      borderRadius: 15,
      backgroundColor: `rgba(72,72,155, ${factor})`
    }];
    const rowInfoContainer = [styles.mh10, {
      padding: 15, borderRadius: 15,
      backgroundColor: `rgba(72,72,123, ${factor})`
    }];
    const headingStyle = [styles.cGrey, styles.bold];

    return (
      <View>
        <TouchableOpacity onPress={this.onPressItem} style={rowStyle}>
          <View style={styles.f1}>
            <Text style={headingStyle}>{item.name}</Text>
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
          </View>
        </TouchableOpacity>
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