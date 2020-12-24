/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
import store from '../../store'
import { fetchOutfits } from '../../reducers/outfitSlice';
import { fetchWeather } from '../../reducers/weatherSlice';
import { OutfitsCarousell } from './OutfitsCarousell';

//import all the components we will need

export default class OutfitsTab extends Component {
    componentDidMount() {
        store.dispatch(fetchWeather)
            .then(() => store.dispatch(fetchOutfits))
    }

    render() {
        return (
            <OutfitsCarousell></OutfitsCarousell>
        );
    }
}

