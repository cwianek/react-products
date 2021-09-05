import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList, Modal, TouchableOpacity, Picker } from 'react-native';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWornsByDate } from '../../reducers/wornSlice';
import { useEffect } from 'react';
import OutfitPreview from '../outfits-tab/OutfitPreview';
import store from '../../store'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const items = {
  '2021-08-18': [{ outfitId: 9 }],
  '2021-08-19': [],
}

export const HistoryScreen = () => {
  const outfits = useSelector((state) => state.outfits)
  const wornsByDate = useSelector((state) => state.worns)

  useEffect(() => {
    store.dispatch(fetchWornsByDate);
  }, [])

  const renderItem = (item, firstItem) => {
    item.outfit = outfits.find((el) => el.id === item.outfitId);
    console.log(item)
    return (
      <View style={styles.existingDate}>
        <View style={styles.outfitPreview}>
          <OutfitPreview
            outfit={item.outfit}>
          </OutfitPreview>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.weatherIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${item.weather.weatherPreview.icon}@2x.png`
            }}>
          </Image>
          <Text style={styles.tempText}>
            {item.weather.temp} °C
          </Text>
        </View>
      </View >
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
    width: 100,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  existingDate: {
    backgroundColor: 'white',
    height: 300,
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
  },
  itemText: {
    color: 'blue',
    fontSize: 36,
  },
  weatherIcon: {
    width: 75,
    height: 75,
  },
  outfitPreview: {
    flex: 1,
    width: 100,
    right: 15,
    transform: [{scaleX: 0.9}, {scaleY: 0.9}]
  },
  imageContainer: {
    paddingRight: 15,
    flex: 0.3,
    alignItems: 'center',
  },
  tempText:{
    top: -15,
    color: Colors.rasinBlack
  }
});