import React from 'react';
import { View,Text, StyleSheet } from 'react-native';


const Item = (props) => (
    <View style={styles.container}>
        <Text style={{fontSize: 10, color: props.tintColor }} >{props.title}</Text>
    </View>
);

const AdoptionTabItem = (props) => (
    <View style={styles.container}>
        <Text style={{fontSize: 16, color: props.tintColor }} >{props.title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        //justifyContent: 'center',
        paddingBottom: 5,
    }
});

export {Item, AdoptionTabItem};