import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import { useSelector, useDispatch, connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { SCREEN_WIDTH } from '../../constants/Dimensions';
import { fetchPrediction } from '../../reducers/predictionSlice';
import store from '../../store';
import OutfitPreview from '../outfits-tab/OutfitPreview';

export const PredictionScreen = () => {
  const prediction = useSelector((state) => state.prediction)
  const [temp, setTemp] = useState(15);

  const predict = () => {
    const weahter = {
      temp: temp,
      humidity: 50,
      pressure: 1011,
      wind_speed: 6,
      clouds: 75
    }
    store.dispatch(fetchPrediction(weahter))
  }

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Temperature</Text>
        </View>
        <View style={styles.inputSpinner}>
          <InputSpinner
            max={40}
            min={-20}
            step={1}
            value={temp}
            color={Colors.pink}
            skin={'clean'}
            append={<Text>°C</Text>}
          />
        </View>
      </View>


      {prediction.length ?
        <View>
          <OutfitPreview outfit={prediction[prediction.length - 1]} />
        </View>
        : null
      }

      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => predict()}>
          <View style={styles.worn}>
            <Text style={styles.wornText}>Predict</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    position: 'relative',
    display: 'flex',
    flex: 1,
  },
  inputSpinner: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 150,
    flex: 0.5,
  },
  label: {
    paddingLeft: 15,
    paddingTop: 30,
    flex: 1,
  },
  labelText: {
    fontSize: 18,
  },
  buttons: {
    paddingBottom: 75,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  worn: {
    borderRadius: 5,
    backgroundColor: Colors.pink,
    padding: 10,
    alignItems: 'center',
    width: 100,
  },
  wornText: {
    fontSize: 18,
    color: Colors.white
  },


})