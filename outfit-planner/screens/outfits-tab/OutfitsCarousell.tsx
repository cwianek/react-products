import { removeOutfit, wearOutfit } from '../../reducers/outfitSlice';
import OutfitItem from './OutfitItem';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import React, { Component, useRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { closeModal, openModal } from '../../reducers/notificationSlice';
import { OutfitNotificationModal } from './OutfitNotificationModal';
import NotificationsEmitterModule from 'expo-notifications/build/NotificationsEmitterModule';
import { DailyNotificationTrigger } from 'expo-notifications';

export const OutfitsCarousell = () => {
    const outfits = useSelector((state) => state.outfits)
    const dispatch = useDispatch()

    const [notification, setNotification] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');

    const lastNotificationResponse = Notifications.useLastNotificationResponse();

    const deleteOutfit = (id) => {
        dispatch(removeOutfit(id));
    }

    const selectionDone = (outfit) => {
        dispatch(wearOutfit(outfit))
    }

    useEffect(() => {
        //registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        console.log("Last notification response", lastNotificationResponse);
        if (lastNotificationResponse && lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER) {
            handleNotificationTapped();
        }

    }, [lastNotificationResponse]);

    const handleNotificationTapped = () => {
        dispatch(openModal());
    }

    return (
        <View style={styles.container}>
            { outfits.length ? <OutfitItem deleteOutfit={deleteOutfit} selectionDone={selectionDone} entries={outfits}></OutfitItem> : null}
            <OutfitNotificationModal></OutfitNotificationModal>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundGray,
        justifyContent: 'center',
        flex: 1,
        paddingTop: 5,
    },
});