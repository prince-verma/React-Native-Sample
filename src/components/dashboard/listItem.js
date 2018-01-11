import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import styles from '../../styles/styles.native';

function RowValue({item, value}) {
  let val = value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
  return (
    <Text style={[styles.mb5]}>
      <Text style={[styles.cGrey, styles.bold]}>{val}: </Text>
      <Text style={[styles.cGrey]}> {item[value]}</Text>
    </Text>
  );
}

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
                <RowValue item={item} value="population"/>
                <RowValue item={item} value="climate"/>
                <RowValue item={item} value="diameter"/>
                <RowValue item={item} value="gravity"/>
                <RowValue item={item} value="rotation_period"/>
                <RowValue item={item} value="surface_water"/>
                <RowValue item={item} value="terrain"/>
              </View> : null
          }
        </TouchableOpacity>
        <View style={styles.clear}/>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  row: {
    padding: 10,
    margin: 3,
    backgroundColor: "#fff",
    elevation: 1
  },
  rowHeading: {
    fontWeight: "bold"
  },

  rowInfo: {
    marginBottom: 5
  }
});
