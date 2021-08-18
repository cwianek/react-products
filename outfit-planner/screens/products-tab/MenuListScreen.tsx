import React from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { SCREEN_WIDTH } from '../../constants/Dimensions';
import { Button, Input } from 'react-native-elements';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons'

// import StarRating from 'react-native-star-rating';

const TEXT_COLOR = Colors.black;
const SECOND_COLOR = Colors.pink;


const CATEGORIES = [{ name: 'Products', icon: 'pricetag', screen: 'ProductsList' }, { name: 'Statistics', icon: 'stats-chart' }]


export default class MenuListScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    openScreen(category) {
        this.props.navigation.navigate(category.screen)
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {
                    CATEGORIES.map((category, i) => (
                        <TouchableOpacity style={styles.item} onPress={() => this.openScreen(category)} key={i} >
                            <Card containerStyle={styles.containerCard}>
                                <View style={styles.iconContainer}>
                                    <Icon color={Colors.pink} name={category.icon} size={50}></Icon>
                                </View>
                                <Text style={styles.recipeTitle}>{category.name}</Text>
                            </Card>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        )
    }
}

const styles = {
    container: {
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 25,
    },
    item: {
        alignItems: 'center',
        padding: 0,
        margin: 0,
        borderWidth: 0,
        borderRadius: 10,
        width: SCREEN_WIDTH / 2 - 30,
        minHeight: 150,
        backgroundColor: '#f5f5f5f5'
    },
    containerCard: {
        borderWidth: 0,
        elevation: 0,
        backgroundColor: '#f5f5f5f5',
    }, iconContainer: {
        alignItems: 'center',
    },
    bgImage: {
        borderRadius: 8,
        width: SCREEN_WIDTH / 2 - 25,
        height: 90,
    },
    wrapper: {
        alignItems: 'center',
        flex: 1
    }, recipeTitle: {
        paddingTop: 25,
        marginLeft: 2,
        color: TEXT_COLOR,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'light'
    }, recipeDescription: {
        marginLeft: 2,
        color: TEXT_COLOR,
        fontSize: 13,
        fontFamily: 'light'
    }, stars: {
        marginLeft: 2,
        width: 50
    }
}