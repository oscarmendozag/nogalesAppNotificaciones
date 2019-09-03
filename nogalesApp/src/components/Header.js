//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// create a component
const Header = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                {props.title}
            </Text>
            <View>
                {props.children}
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: '#38393a',
        elevation: 1,
        paddingHorizontal: 10,
        width: '100%'
    },
    textStyle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

//make this component available to the app
export {Header};
