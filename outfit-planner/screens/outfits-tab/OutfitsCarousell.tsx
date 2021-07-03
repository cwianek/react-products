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
    Button,
    TouchableOpacity
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { closeModal, openModal } from '../../reducers/notificationSlice';
import { logoutUser } from '../../reducers/sessionSlice';

import { OutfitNotificationModal } from './OutfitNotificationModal';
import NotificationsEmitterModule from 'expo-notifications/build/NotificationsEmitterModule';
import { DailyNotificationTrigger } from 'expo-notifications';
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

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

    const logout = () => {
        console.log("logout")
        dispatch(logoutUser())
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
            <Header
                leftComponent={{ icon: 'menu', color: 'white' }}
                centerComponent={{ text: 'Outfit planner', style: { color: 'white', fontSize: 20, fontFamily: 'light' } }}
                rightComponent={

                    <TouchableOpacity
                        onPress={() => logout()}
                        activeOpacity={0.2}>
                        <Icon name='logout' color='white' size={18} />
                    </TouchableOpacity>

                }
                containerStyle={{ height: 65, paddingBottom: 10, backgroundColor: Colors.pink, borderBottomWidth: 0 }}
            />
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