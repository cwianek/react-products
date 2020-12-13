import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';


export default class Cloth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.imageContainer, this.props.style]}>
        <Image source={{ uri: this.props.source }} style={[styles.image, styles[this.props.category]]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  shoe: {
    width: 105,
    height: 60,
  },
  trouser: {
    width: 70,
    height: 125,
  },
  socks: {
    width: 30,
    height: 60,
  },
  jacket: {
    width: 90,
    height: 110,
  },
  tshirt: {
    width: 80,
    height: 100,
  },
  hoodie: {
    width: 80,
    height: 100,
  },
  imageContainer: {
    margin: 5
  }
})
  ;