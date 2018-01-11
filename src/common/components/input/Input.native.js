import React, {Component} from 'react';
import {Text, View, TextInput, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 45,
      width: 300,
      borderBottomHeight: 1,
      animatedBorderHeight: 2,
      borderBottomColor: 'grey',
      value: new Animated.Value(0),
      animationDuration: props.animationDuration ? props.animationDuration : 250
    };
  }

  componentWillMount() {
    this.state.value.setValue(0.0001);
  }

  _onFocus = () => {
    this.state.value.setValue(0.0001);
    Animated.timing(
      this.state.value,
      {
        toValue: this.props.width || this.state.width,
        duration:this.state.animationDuration
      }
    ).start();
    this.props.onFocus && this.props.onFocus();
  };

  _onBLur = () => {
    this.state.value.setValue(this.props.width || this.state.width);
    Animated.timing(
      this.state.value,
      {
        toValue: 0.0001,
        duration:this.state.animationDuration
      }
    ).start();
    this.props.onBlur && this.props.onBlur();
  };

  render() {
    let width = this.props.icon ? (this.props.width || this.state.width) - (this.props.icon.size || 24) : this.props.width || this.state.width
    let height = this.props.height || this.state.height;

    return (
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {
            this.props.icon ?
              <Icon
                name={this.props.icon.name}
                size={this.props.icon.size || 24}
                color={this.props.icon.color || '#F6F6F6'}/>
              : null
          }
          <TextInput
            {...this.props}
            underlineColorAndroid={'transparent'}
            style={[{
              height: height,
              width: width
            }, this.props.inputStyle && this.props.inputStyle]}
            onFocus={this._onFocus}
            onBlur={this._onBLur}
          />
        </View>
        <View style={{
          width: this.props.width || this.state.width,
          height: this.props.borderBottomHeight || this.state.borderBottomHeight,
          backgroundColor: this.props.borderBottomColor || this.state.borderBottomColor,
          position: 'absolute', bottom: 0,
        }}/>
        <Animated.View style={{
          width: 1,
          height: this.props.animatedBorderHeight || this.state.animatedBorderHeight,
          position: 'absolute', bottom: 0,
          backgroundColor: this.props.borderBottomColor || this.state.borderBottomColor,
          transform: [{scaleX: this.state.value}]
        }}/>
      </View>
    );
  }
}

