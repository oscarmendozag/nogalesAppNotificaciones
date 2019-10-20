//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Left, Body, Right, Text, Icon } from 'native-base';

// create a component
const NotificationItem = (props) => {
    console.log(props.showDate);
    const item = props.item;
    const showHeader = props.showDate;
    if (showHeader) {
        return <View>
            <ListItem itemDivider><Text style={{ alignSelf: 'center' }}>{item.createdAt}</Text></ListItem>
            <SimpleNotificationItem item={item} />
        </View>
    }
    return <SimpleNotificationItem item={item} />
};

function getIcon(type) {
    switch (type) {
        case 1:
            return { name: 'md-bus', color: 'green', description: 'El camión está en camino'};
        case 2:
            return { name: 'md-bus', color: 'red', description:'El camión ha cancelado su ruta.'};
        case 3:
            return { name: 'md-build', color: 'gray', description:'El camión está en reparación, no podrá hacer la ruta.'};
        case 4:
            return { name: 'ios-trash', color:'gray', description: 'El camión está en relleno sanitario, no podrá hacer la ruta.'};
        default:
                return { name: 'md-bus', color: 'red', description:'Motivo desconocido'};
    }
}
const SimpleNotificationItem = (props) => {
    const item = props.item;
    const icon = getIcon(item.type);
    return <ListItem avatar>
        <Left>
            <Icon name={icon.name} color={icon.color} style={{ color: icon.color, fontSize: 25 }} />
        </Left>
        <Body>
            <Text>{icon.description}</Text>
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
