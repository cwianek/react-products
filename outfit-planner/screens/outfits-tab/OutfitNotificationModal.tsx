import React, { Component, useRef, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Modal
} from 'react-native';
import { useSelector, useDispatch, connect } from 'react-redux';
import Colors from '../../constants/Colors';
import { closeModal, openModal } from '../../reducers/notificationSlice';
import OutfitPreview from './OutfitPreview';
import { removeOutfit, wearOutfit } from '../../reducers/outfitSlice';


export const OutfitNotificationModal = () => {
    const dispatch = useDispatch()
    const modalOpen = useSelector((state) => state.notification.modalOpen)
    const outfits = useSelector((state) => state.outfits)
    const [outfit, setOutfit] = useState(null);

    const close = () => {
        dispatch(closeModal());
    }

    const onYes = () => {
        dispatch(wearOutfit(outfit));
        close();
    }

    useEffect(() => {
        const outfit = outfits.filter((outfit) => !outfit.worn)[0];
        if (outfit) {
            setOutfit(outfit);
        } else {
            close();
        }
    }, [outfits])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalOpen}
            onRequestClose={closeModal}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Would you wear it today?</Text>
                    {outfit && <OutfitPreview outfit={outfit}></OutfitPreview>}
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <Button color={Colors.pink} onPress={close} title="No" />
                        </View>
                        <View style={styles.button}>
                            <Button color={Colors.pink} onPress={onYes} title="Yes" />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        borderRadius: 15,
        backgroundColor: Colors.white,
        flex: 1,
        width: 270,
        marginVertical: 120
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.pink,
        padding: 15,
        paddingBottom: 10,
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 30,
    },
    button: {
        width: 80,
        margin: 10
    }
});