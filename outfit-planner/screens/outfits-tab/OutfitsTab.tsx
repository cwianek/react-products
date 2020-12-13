/*This is an Example of Grid View in React Native*/
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Colors from '../../constants/Colors';
import OutfitSelection from './OutfitSelection';

import store from '../../store'
import { fetchOutfits } from '../../reducers/outfitSlice';
import { fetchWeather } from '../../reducers/weatherSlice';
import { useSelector, useDispatch } from 'react-redux';

//import all the components we will need
import { removeOutfit, wearOutfit } from '../../reducers/outfitSlice';

const OutfitsCarousell = () => {
    const outfits = useSelector((state) => state.outfits)
    const dispatch = useDispatch()

    const deleteOutfit = (id) => {
        dispatch(removeOutfit(id));
    }

    const selectionDone = (outfit) => {
        console.log(outfit);
        dispatch(wearOutfit(outfit))
    }

    return (
        <View style={styles.container}>
            { outfits.length ? <OutfitSelection deleteOutfit={deleteOutfit} selectionDone={selectionDone} entries={outfits}></OutfitSelection> : null}
        </View>
    )
}

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

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundGray,
        justifyContent: 'center',
        flex: 1,
        paddingTop: 5,
    },
});
