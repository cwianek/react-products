import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList, Modal, TouchableOpacity, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Layout from "../../constants/Layout";
import { AntDesign } from '@expo/vector-icons';
import { openOutfitModal, openProductModal, selectProduct } from '../../reducers/productSlice';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import React, { Component } from 'react';


export const OpenOutfitModalButton = () => {
  const selected = useSelector((state) => state.productsState.selected);
  const dispatch = useDispatch()

  const openModal = () =>{
    selected.length ? dispatch(openOutfitModal()) : dispatch(openProductModal)
  }

  return (
    <TouchableOpacity
      style={[styles.addItemStyle, selected.length ? styles.selectedAddItemStyle : null]}
      onPress={openModal}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  addItemStyle: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: Colors.rasinBlack,
    color: Colors.pink,
    width: 50,
    height: 50,
    borderRadius: 50,
    elevation: 2,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  selectedAddItemStyle:{
    backgroundColor: Colors.pink
  },
  buttonText: {
    fontSize: Fonts.headerFontSize,
    color: Colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});