import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Modal, ScrollView } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

import OutfitItem from './OutfitPreview';

import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class OutfitSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: props.entries.length? props.entries.length - 1 : 0,
    }
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={[styles.slide]} key={index}>
        <TouchableHighlight
          style={[styles.itemRemove]}
          onPress={() => {
            var len = this.props.entries.length;
            if (len - 1 === index) {
              this.setState({ activeSlide: this.props.entries.length - 2 })
              this._carousel.triggerRenderingHack();
            }
            this.props.deleteOutfit(item.id);
          }}>
          <AntDesign name='close' size={25} style={styles.itemRemoveText}></AntDesign>
        </TouchableHighlight>
        {item.rain && <Fontisto name="rain" style={styles.rainIcon} size={24} />}
        <OutfitItem outfit={item}></OutfitItem>
        <Text style={styles.id}>{item.id}</Text>
      </View>
    );
  }

  selectionDone = () => {
    const outfit = this.props.entries[this.state.activeSlide]
    this.props.selectionDone(outfit);
  }

  snapToItem = async (index) => {
    this.setState({ activeSlide: index })
  }

  render() {
    const isSelected = this.props.entries[this.state.activeSlide] && this.props.entries[this.state.activeSlide].worn;
    return (
      <View style={[{ flex: 1 }]}>
        <View style={[styles.carouselContainer, isSelected ? styles.selected : null]}>
          <Carousel
            layout={'stack'}
            ref={(c) => { this._carousel = c; }}
            data={this.props.entries}
            firstItem={this.state.activeSlide}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.snapToItem(index)}
            sliderWidth={Layout.window.width}
            itemWidth={Layout.window.width - 95}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttons} onPress={() => this.selectionDone()}>
            {this.props.entries[this.state.activeSlide] ? this.props.entries[this.state.activeSlide].worn ?
              <View style={styles.worn}>
                <Text style={styles.wornText}>take off</Text>
              </View>
              // <AntDesign name="checkcircle" size={32} color={Colors.pink} />
              :
              // <AntDesign name="checkcircleo" size={32} color={Colors.pink} />
              <View style={styles.wear}>
                <Text style={styles.wearText}>wear</Text>
              </View>
              : null}
          </TouchableOpacity>
        </View>
      </View >
    );

  }
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingTop: 20,
    height: 380,
    justifyContent: 'center',
  },
  carouselContainer: {
    flex: 0.85,
    paddingTop: 80,
    backgroundColor: Colors.backgroundGray
  },
  itemRemoveText: {
    fontSize: 15,
    color: Colors.quickSilver
  },
  itemRemove: {
    top: 5,
    width: 30,
    height: 30,
    position: "absolute",
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  id: {
    fontSize: 10,
    position: 'absolute',
    bottom: 5,
    right: 5,
    color: Colors.lightGray
  },
  selected: {},
  rainIcon:{
    paddingLeft: 15,
    color: Colors.lightGray,
    position: 'relative',
    bottom: 5
  },
  wearText: {
    fontSize: 18,
    color: Colors.pink
  },
  wornText: {
    fontSize: 18,
    color: Colors.white
  },
  worn: {
    borderRadius: 5,
    backgroundColor: Colors.pink,
    padding: 10,
    alignItems: 'center',
    width: 100,
  },
  wear: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    alignItems: 'center',
    color: Colors.pink,
    padding: 10,
    width: 100,
  },
  buttonsContainer:{
    alignItems: 'center',
    elevation: 1,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  }
});