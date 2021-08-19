import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList, Modal, TouchableOpacity, Picker } from 'react-native';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWornsByDate } from '../../reducers/wornSlice';
import { useEffect } from 'react';
import OutfitPreview from '../outfits-tab/OutfitPreview';
import store from '../../store'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const items = {
  '2021-08-18': [{ outfitId: 9 }],
  '2021-08-19': [],
}

export const HistoryScreen = () => {
  const outfits = useSelector((state) => state.outfits)
  const wornsByDate = useSelector((state) => state.worns)

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null)

  const onChange = (event, selectedDate) => {
  };

  useEffect(() => {
    store.dispatch(fetchWornsByDate);
  }, [])

  const renderItem = (item, firstItem) => {
    item.outfit = outfits.find((el) => el.id === item.outfitId);
    return (
      <View style={styles.existingDate}>
        <OutfitPreview outfit={item.outfit}></OutfitPreview>
      </View>
    )
  }

  const renderEmptyDay = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.itemText}>No outfits that day</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container]}>
      {wornsByDate && <Agenda
        items={wornsByDate}
        selected={new Date()}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDay}
      />}
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
  emptyDate: {
    flex: 1,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  existingDate: {
    backgroundColor: 'white',
    height: 325,
    position: 'relative'
  },
  itemText: {
    fontSize: 16,
  }
});