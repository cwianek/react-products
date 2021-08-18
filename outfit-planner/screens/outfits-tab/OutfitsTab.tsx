/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
import store from '../../store'
import { fetchOutfits } from '../../reducers/outfitSlice';
import { fetchWeather } from '../../reducers/weatherSlice';
import { OutfitsCarousell } from './OutfitsCarousell';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../constants/Colors'

import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';
import { logoutUser } from '../../reducers/sessionSlice';


export default function OutfitsTab({ navigation }) {
    const [count, setCount] = React.useState(0);
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutUser())
        navigation.navigate("Auth")
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ paddingRight: 20 }}
                    onPress={logout}>
                    <Icon name='logout' color={Colors.black} size={18} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    useEffect(() => {
        store.dispatch(fetchWeather)
            .then(() => store.dispatch(fetchOutfits))
    })

    return <OutfitsCarousell></OutfitsCarousell>;
}