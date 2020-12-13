import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList, Modal, TouchableOpacity, Picker } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import store from '../../store'
import { addProduct, removeProduct, closeProductModal, openProductModal, closeOutfitModal } from '../../reducers/productSlice';
import { useSelector, useDispatch, connect } from 'react-redux';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const CATEGORIES =
  ['shoe', 'hoodie', 'trouser', 'tshirt', 'jacket', 'socks'];

export const AddProductModal = () => {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [uri, setUri] = useState('');
  const productModalOpen = useSelector((state) => state.productsState.productModalOpen)

  const dispatch = useDispatch()

  const categories = CATEGORIES.map((val, idx) => {
    return (
      <Picker.Item key={idx} label={val} value={val} />
    )
  })

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setUri(result.uri);
    }
  };

  const addItem = () => {
    let item = {
      category, uri
    }
    addToDatabase(item);
    closeModal();
  }

  const closeModal = () => {
    console.log("close modal")
    setUri('');
    dispatch(closeProductModal());
  }

  const addToDatabase = async (item) => {
    var splitUri = item.uri.split('/')
    let localUri = FileSystem.documentDirectory + splitUri[splitUri.length - 1];
    localUri = 'file:' + localUri.substring(7)
    dispatch(addProduct({ category: item.category, localUri }))
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={productModalOpen}
      onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.picker}>
              <Picker
                mode='dropdown'
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              >
                {categories}
              </Picker>
            </View>

            <Text style={styles.label}>Image</Text>
            {uri ?
              <Image source={{ uri }} style={styles.image} />
              :
              <TouchableOpacity
                style={styles.imageSelection}
                onPress={pickImage}>
                <Text style={styles.selectImageText}>Press to select image</Text>
              </TouchableOpacity>
            }
          </View>

          <View style={styles.modalButtons}>
            <TouchableHighlight
              style={{ ...styles.openButtonEmpty }}
              onPress={closeModal}>
              <Text style={styles.textStyleEmpty}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton }}
              onPress={addItem}>
              <Text style={styles.textStyle}>Done</Text>
            </TouchableHighlight>
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
    paddingHorizontal: 35,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: 250,
    height: 450,
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
    justifyContent: 'center',
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
    alignItems: 'center',
    margin: 10,
    elevation: 2,

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
  picker: {
    borderRadius: 20,
    borderColor: Colors.pink,
    width: '100%',
    marginBottom: 30,
    borderBottomColor: Colors.pink,
    borderBottomWidth: 1
  },
  image: {
    marginTop: 20,
    backgroundColor: 'red',
    height: 100
  },
  itemImage: {
    height: '100%',
  },
  imageSelection: {
    width: '100%',
    height: 150,
    borderColor: Colors.pink,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectImageText: {
    color: Colors.pink
  },
  modalButtons: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
})
  ;