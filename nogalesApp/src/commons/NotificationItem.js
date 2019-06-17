//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Left, Body, Right, Text } from 'native-base';

// create a component
const NotificationItem = (props) => {
    console.log(props.showDate);
    const item = props.item;
    const showHeader = props.showDate;
    if (showHeader) {
        console.log('Hi')
        return <View>
            <ListItem itemDivider><Text style={{ alignSelf: 'center' }}>{item.createdAt}</Text></ListItem>
            <SimpleNotificationItem item ={item}/>
        </View>
    }
    return <SimpleNotificationItem item ={item}/>
};


const SimpleNotificationItem = (props) => {
    const item = props.item;
    return <ListItem avatar>
        <Left>
            <Text></Text>
        </Left>
        <Body>
            <Text>{item.name}</Text>
        </Body>
        <Right>
            <Text note>{item.hour}</Text>
        </Right>
    </ListItem>
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export { NotificationItem };
