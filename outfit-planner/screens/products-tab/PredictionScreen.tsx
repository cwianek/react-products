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
  const weather = useSelector((state) => state.weather)

  const [temp, setTemp] = useState(weather.temp);
  const [humidity, setHumidity] = useState(weather.humidity);
  const [pressure, setPressure] = useState(weather.pressure);
  const [wind_speed, setWindSpeed] = useState(weather.wind_speed);
  const [clouds, setClouds] = useState(weather.clouds);


  const predict = () => {
    const weahter = {
      temp: temp,
      humidity: humidity,
      pressure: pressure,
      wind_speed: wind_speed,
      clouds: clouds
    }
    store.dispatch(fetchPrediction(weahter))
  }

  const onIncrease = () => {
    setTemp(temp + 1)
  }

  const onDecrease = () => {
    setTemp(temp - 1)
  }

  const onChange = (num) => {
    setTemp(num)
  }

  const onIncreaseClouds = () => {
    setClouds(clouds + 1)
  }

  const onDecreaseClouds = () => {
    setClouds(clouds - 1)
  }

  const onCloudsChange = (num) => {
    setClouds(num)
  }

  const onIncreasePressure = () => {
    setPressure(pressure + 1)
  }

  const onDecreasePressure = () => {
    setPressure(pressure - 1)
  }

  const onPressureChange = (num) => {
    setPressure(num)
  }

  const onIncreaseWindSpeed = () => {
    setWindSpeed(wind_speed + 1)
  }

  const onDecreaseWindSpeed = () => {
    setWindSpeed(wind_speed - 1)
  }

  const onWindSpeedChange = (num) => {
    setWindSpeed(num)
  }

  const onIncreaseHumidity = () => {
    setHumidity(humidity + 1)
  }

  const onDecreaseHumidity = () => {
    setHumidity(humidity - 1)
  }

  const onHumidityChange = (num) => {
    setHumidity(num)
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
            value={temp}
            color={Colors.pink}
            skin={'clean'}
            height={35}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onChange={onChange}
            append={<Text>°C</Text>}
          />
        </View>
      </View>

      <View style={styles.input}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Clouds</Text>
        </View>
        <View style={styles.inputSpinner}>
          <InputSpinner
            max={100}
            min={0}
            value={clouds}
            color={Colors.pink}
            onIncrease={onIncreaseClouds}
            onDecrease={onDecreaseClouds}
            onChange={onCloudsChange}
            skin={'clean'}
            height={35}
            append={<Text>%</Text>}
          />
        </View>
      </View>

      <View style={styles.input}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Humidity</Text>
        </View>
        <View style={styles.inputSpinner}>
          <InputSpinner
            max={100}
            min={0}
            value={humidity}
            color={Colors.pink}
            skin={'clean'}
            height={35}
            onIncrease={onIncreaseHumidity}
            onDecrease={onDecreaseHumidity}
            onChange={onHumidityChange}
            append={<Text>%</Text>}
          />
        </View>
      </View>

      <View style={styles.input}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Pressure</Text>
        </View>
        <View style={styles.inputSpinner}>
          <InputSpinner
            max={1200}
            min={800}
            value={pressure}
            color={Colors.pink}
            skin={'clean'}
            height={35}
            onIncrease={onIncreasePressure}
            onDecrease={onDecreasePressure}
            onChange={onPressureChange}
            append={<Text>hPa</Text>}
          />
        </View>
      </View>

      <View style={styles.input}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Wind speed</Text>
        </View>
        <View style={styles.inputSpinner}>
          <InputSpinner
            max={50}
            min={0}
            value={wind_speed}
            color={Colors.pink}
            skin={'clean'}
            height={35}
            onIncrease={onIncreaseWindSpeed}
            onDecrease={onDecreaseWindSpeed}
            onChange={onWindSpeedChange}
            append={<Text>m/s</Text>}
          />
        </View>
      </View>


      {prediction.length ?
        <View style={styles.outfitPrevies}>
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
    paddingBottom: 15,
  },
  inputSpinner: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 125,
    flex: 0.5,
  },
  label: {
    paddingLeft: 15,
    paddingTop: 30,
    flex: 1,
  },
  labelText: {
    position: 'relative',
    top: -7,
    fontSize: 18,
  },
  buttons: {
    position: 'absolute',
    bottom: 25,
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
  outfitPrevies: {
    position: 'relative',
    top: 15,
    left: 45,
    paddingBottom: 0,
  }


})