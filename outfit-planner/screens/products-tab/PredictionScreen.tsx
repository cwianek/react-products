import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import InputSpinner from "react-native-input-spinner";
import { useSelector, useDispatch, connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { SCREEN_WIDTH } from '../../constants/Dimensions';
import { fetchPrediction } from '../../reducers/predictionSlice';
import store from '../../store';
import OutfitPreview from '../outfits-tab/OutfitPreview';
import PredictionService from '../../services/prediction';
import ImageViewer from 'react-native-image-zoom-viewer';
import { FontAwesome5 } from '@expo/vector-icons';

export const PredictionScreen = () => {
  const prediction = useSelector((state) => state.prediction)
  const weather = useSelector((state) => state.weather)
  const token = useSelector((state) => state.session.user.token)
  const outfits = useSelector((state) => state.outfits)

  const [temp, setTemp] = useState(weather.temp);
  const [humidity, setHumidity] = useState(weather.humidity);
  const [wind_speed, setWindSpeed] = useState(weather.wind_speed);
  const [predictedOutfit, setPredictedOutfit] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [displayImage, setDisplayImage] = useState(false);

  const [clouds, setClouds] = useState(weather.clouds);
  const [pressure, setPressure] = useState(weather.pressure);

  const predict = async () => {
    const weahter = {
      temp: temp,
      humidity: humidity,
      wind_speed: wind_speed,
      //pressure: pressure,
      //clouds: clouds
    }
    //store.dispatch(fetchPrediction(weahter))
    const response = await PredictionService.plotPrediction(weahter, token);
    const outfit = outfits.find(el => el.id === response.outfitId);
    setPredictedOutfit(outfit);
    setImageData(response.data);
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

  const preview = () => {
    setDisplayImage(true)
  }

  const pressOut = () => {
    console.log("press out")
    setDisplayImage(false)
  }

  const renderHeader = () => {
    return (
      <View style={styles.modalHeader}>
        <Text style={styles.imageWrapper}>Prediction data</Text>

        <TouchableOpacity onPress={() => pressOut()}>
          <View style={styles.close}>
            <FontAwesome5 size={20} name="times" color={Colors.pink} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={[styles.container, displayImage ? styles.dimmed : null]}>
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


      {predictedOutfit ?
        <View style={styles.outfitPrevies}>
          <OutfitPreview outfit={predictedOutfit} />
        </View>
        : null
      }

      <Modal
        style={styles.modalContent}
        animationType="slide"
        transparent={true}
        visible={displayImage}
        onRequestClose={pressOut}>
        <View style={styles.modalContainer}>
          <ImageViewer
            backgroundColor={'white'}
            style={styles.imageViewer}
            renderHeader={() => renderHeader()}
            imageUrls={[
              {
                url: "data:image/png;base64," + imageData,
                props: {
                  resizeMode: 'contain'
                }
              }
            ]}

          />
        </View>
      </Modal>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => predict()}>
          <View style={styles.worn}>
            <Text style={styles.wornText}>Predict</Text>
          </View>
        </TouchableOpacity>

        {imageData ?
          <TouchableOpacity onPress={preview} >
            <View style={styles.preview}>
              <Text style={styles.previewText}>Preview</Text>
            </View>
          </TouchableOpacity>
          : null}

      </View>

    </View >
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
    color: Colors.rasinBlack
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 70,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 50,
    left: 45,
    paddingBottom: 0,
  },
  imageWrapper: {
    paddingLeft: 10,
    paddingTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.pink
  },
  preview: {
    paddingHorizontal: 15
  },
  previewText: {
    fontSize: 16,
    color: Colors.pink
  },
  modalContainer: {
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH - 20,
    position: 'absolute',
    top: 150,
    opacity: 0.8,
    left: 10,
    elevation: 2,
    backgroundColor: Colors.lightGray
  },
  close: {
    paddingTop: 7,
    paddingHorizontal: 15,
  },
  closeText: {
    fontSize: 25,
    color: Colors.pink
  },
  modalContent: {
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dimmed: {
    opacity: 0.1
  },
  imageViewer: {
  }


})