import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Modal, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Fontisto } from '@expo/vector-icons';
import { addProduct, removeProduct, closeProductModal, openProductModal, closeOutfitModal } from '../../reducers/productSlice';

import Colors from '../../constants/Colors';
import { addOutfit } from '../../reducers/outfitSlice';
import {clearSelected} from '../../reducers/productSlice';

export const OutfitModal = () => {
  const [rain, setRain] = useState(false);
  const products = useSelector((state) => state.productsState.products)
  const selected = useSelector((state) => state.productsState.selected)
  const outfitModalOpen = useSelector((state) => state.productsState.outfitModalOpen)
  const dispatch = useDispatch()

  const outfitImages = products.filter((item) => selected.includes(item.id)).map((image, index) => {
    return (
      <Image key={index} source={{ uri: image.localUri }} style={styles.image} />
    )
  })

  const getItemUriByCategory = (data, category) => {
    let elem = data.filter((item) => item.category === category);
    let picked = null;
    if (elem.length) {
      picked = (({ id, localUri }) => ({ id, localUri }))(elem[0]);
    }
    return picked;
  }

  const addToDatabase = () => {
    let data = products.filter((item) => selected.includes(item.id));
    let outfit = {
      shoeUri: getItemUriByCategory(data, 'shoe'),
      socksUri: getItemUriByCategory(data, 'socks'),
      tshirtUri: getItemUriByCategory(data, 'tshirt'),
      trouserUri: getItemUriByCategory(data, 'trouser'),
      hoodieUri: getItemUriByCategory(data, 'hoodie'),
      jacketUri: getItemUriByCategory(data, 'jacket'),
      rain: rain
    }
    Object.keys(outfit).forEach((key) => (outfit[key] == null) && delete outfit[key]);

    dispatch(addOutfit(outfit));
    dispatch(clearSelected());
    closeModal();
  }

  const closeModal = () => {
    dispatch(closeOutfitModal());
  }


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={outfitModalOpen}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Outfit</Text>
            <ScrollView>
              <View style={styles.imageContainer}>
                {outfitImages}
              </View>
            </ScrollView>
            <Fontisto name="rain" onPress={() => setRain(!rain)} style={[styles.rainIcon, rain ? styles.rainActive : null]} size={24} />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={{ ...styles.openButtonEmpty }}
              onPress={closeModal}>
                <Text style={styles.textStyleEmpty}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.openButton }}
              onPress={addToDatabase}>
              <View>
                <Text style={styles.textStyle}>Done</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    position: 'relative',
    top: -20,
    margin: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: 300,
    height: 550,
    display: 'flex',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: Colors.pink,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
    elevation: 2,
  },
  openButtonEmpty: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: Colors.pink,
    color: Colors.pink,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
    elevation: 2,
    opacity: 1,

  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 7
  },
  textStyleEmpty: {
    color: Colors.pink,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
  },
  label: {
    color: Colors.pink,
    fontSize: 20,
    paddingBottom: 10,
    textAlign: 'center'
  },
  image: {
    marginTop: 20,
    backgroundColor: 'red',
    width: 85,
    height: 80,
    margin: 5
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  modalButtons: {
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 1004
  },
  rainIcon: {
    position: 'relative',
    top: 0,
    paddingLeft: 10,
    color: Colors.lightGray
  },
  rainActive: {
    color: Colors.pink
  }
});