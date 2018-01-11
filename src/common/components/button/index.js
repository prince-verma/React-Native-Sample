import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../../../styles/styles.native";

export default {
  Transparent: (props) => {
    let {text = "", onPress, icon = "", iconSize = 24, ...otherProps} = props;
    let textBoxStyle = [styles.cWhite, styles.font16, styles.bold, styles.mh10];
    let iconStyle = [styles.cWhite, styles.bold];
    return (
      <Button transparent onPress={onPress} {...otherProps}>
        <Text style={textBoxStyle}>{text}</Text>
        {icon ? <Icon name={icon} size={24} style={iconStyle}/> : null}
      </Button>
    )
  }
}