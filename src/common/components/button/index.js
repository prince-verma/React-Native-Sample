import {Text, View} from 'react-native';
import {Button} from 'native-base';
import styles from "../../../styles/styles.native";


export default {
  Transparent: (props) => {
    let {text, onPress, ...otherProps} = props;
    return (
      <Button transparent onPress={onPress} {...otherProps}>
        <Text style={[styles.cWhite, styles.font16, styles.bold]}>{text}</Text>
      </Button>
    )
  }
}