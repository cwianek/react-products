import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList, Modal, TouchableOpacity, Picker } from 'react-native';
import {AddProductModal} from './AddProductModal';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

import {OutfitModal} from './OutfitModal';

import store from '../../store'

import { fetchProducts } from '../../reducers/productSlice';
import {OpenOutfitModalButton} from './OpenModalButton';
import {ProductsList} from './ProductsList'

export default class ProductsTab extends Component {
  componentDidMount() {
    store.dispatch(fetchProducts)
  }

  render() {
    return (
      <View style={[styles.container]}>
        <AddProductModal/>
        <OutfitModal/>
        <ProductsList/>
        <OpenOutfitModalButton/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundGray,
    flex: 1,
  }
});