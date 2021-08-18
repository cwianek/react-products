import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList, Modal, TouchableOpacity, Picker } from 'react-native';
import Colors from '../../constants/Colors';
import store from '../../store'
import { fetchProducts } from '../../reducers/productSlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-inline-calendar';

const items = {
  '2021-08-18':{
    items: ['a', 'b']
  }
}

export const HistoryScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
  };

  const getDate = () => {
    let tempDate = date.toDateString();
    return tempDate;
  }

  const renderItem = (item) => {
    return (
      <View><Text>kek</Text></View>
    )
  }

  return (
    <View style={[styles.container]}>
     <Calendar
          items={items}
          weekStartsOn={1}
          maxMonthsToScroll={1}
          minMonthsToScroll={12}
          weekMode
          selectedDate={new Date()}
          scrollable
          disableWeekToggle
          itemRenderer={renderItem}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundGray,
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 5,
    padding: 10,
  },
});