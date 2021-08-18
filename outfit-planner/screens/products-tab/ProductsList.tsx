import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList, Modal, TouchableOpacity, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Layout from "../../constants/Layout";
import { AntDesign } from '@expo/vector-icons';
import {deselectProduct, removeProduct, selectProduct} from '../../reducers/productSlice';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import React, { Component, useEffect } from 'react';


export const ProductsList = () => {
  const products = useSelector((state) => state.productsState.products)
  const selected = useSelector((state) => state.productsState.selected)
  const productModalOpen = useSelector((state) => state.productsState.productModalOpen)
  const outfitModalOpen = useSelector((state) => state.productsState.outfitModalOpen)
  
  const dispatch = useDispatch()
  const newData = modifyData(products);

  const deleteOutfit = (id) => {
    dispatch(removeProduct(id));
  }

  const onSelectProduct = (id) => {
    const isSelected = selected.includes(id);
    console.log("isSelected", isSelected)
    isSelected ? dispatch(deselectProduct(id)) : dispatch(selectProduct(id));
  }

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const renderItem = (item, index) => {
    console.log("ITEM", item);
    if (item[0].type == "header") {
      return (
        <View key={index} style={styles.header}>
          <Text style={styles.text}> {capitalize(item[0].name)} </Text>
        </View>
      )
    }

    const columns = item.map((val, idx) => {
      return (
        <View key={val.id} style={[styles.item, selected.includes(val.id) ? styles.selectedItem : null]}>
          <TouchableOpacity
            style={[styles.itemRemove, selected.includes(val.id) ? styles.selectedItemRemove : null]}
            onPress={() => {
              deleteOutfit(val.id);
            }}>
            <AntDesign name='close' size={25} style={styles.itemRemoveText}></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => { onSelectProduct(val.id) }}>
            <Image source={{ uri: val.localUri }} style={[styles.itemImage, styles[val.category]]} />
          </TouchableOpacity>
        </View>
      )
    });
    return (
      <View key={index} style={{ width: Layout.window.width, flexDirection: 'row', marginBottom: 10 }}>
        {columns}
      </View>
    )
  }

  return (
    <FlatList
      style={[outfitModalOpen || productModalOpen ? styles.dimmed : null]}
      data={newData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => renderItem(item, index)}
    />
  )
}

const modifyData = (data) => {
  const numColumns = 2;
  const arr = [];
  var row = [];
  var freeSlots = 0;
  data.sort(compare);
  data.forEach((val, index) => {
    var addHeader = index === 0 || val.category !== data[index - 1].category;
    if (addHeader) {
      if (row.length) {
        arr.push(row);
        freeSlots += numColumns - row.length;
      }
      arr.push([{ type: 'header', name: val.category }]);
      row = [val];
      return;
    }
    if (index !== 0 && (index + freeSlots + 1) % numColumns === 0) {
      row.push(val);
      arr.push(row);
      freeSlots += numColumns - row.length;
      row = [];
      return;
    }
    row.push(val);
  });
  if (row.length) {
    arr.push(row);
  }
  return arr;
}

const compare = (a, b) => {
  if (a.category < b.category) {
    return -1;
  }
  if (a.category > b.category) {
    return 1;
  }
  return 0;
}


const styles = StyleSheet.create({
  dimmed: {
    flex: 1,
    opacity: 0.1,
  },
  item: {
    color: Colors.black,
    width: Layout.window.width / 2 - 25,
    backgroundColor: Colors.white,
    elevation: 2,
    marginLeft: 15,
    padding: 10,
    borderRadius: 8,
  },
  selectedItem: {
    padding: 8,
    borderWidth: 2,
    borderColor: Colors.pink
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    //borderBottomWidth: 2,
    borderBottomColor: Colors.pink,
    backgroundColor: Colors.backgroundGray,

    marginBottom: 10,
    marginHorizontal: 5,
  },
  text: {
    fontSize: Fonts.fontSize,
    color: Colors.quickSilver,

  },
  itemImage: {
    height: 80,
  },
  itemRemoveText: {
    fontSize: 15,
    color: Colors.quickSilver
  },
  itemRemove: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  selectedItemRemove: {
    top: -2,
    right: -2,
  },
  shoe: {
    height: 80,
  },
  hoodie: {
    height: 150
  },
  jacket: {
    height: 150
  },
  trouser: {
    height: 200
  },
  socks: {
    height: 120
  },
  tshirt: {
    height: 150
  },
})
  ;