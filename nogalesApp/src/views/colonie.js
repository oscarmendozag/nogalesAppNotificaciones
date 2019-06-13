//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colonies } from '../commons';
import { setTopic } from '../functions';
import { ListItem, Left, Body, Header, Title, Right } from 'native-base';
// create a component

class Colonies extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Header
                    style={{ backgroundColor: 'green' }}
                    androidStatusBarColor={'#fff'}>
                    <Left />
                    <Body>
                        <Title>Colonias</Title>
                    </Body>
                    <Right />
                </Header>
                <FlatList
                    data={colonies}
                    renderItem={({ item }) => {
                        return (
                            <ListItem
                                avatar
                                onPress={() => {
                                    setTopic(item.topic).then(
                                        this.props.onSetted
                                    ).catch(
                                        err => alert(err)
                                    )
                                }}
                            >
                                <Body>
                                    <Text>{item.name}</Text>
                                </Body>
                            </ListItem>
                        )
                    }}
                >
                </FlatList>
            </View >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export { Colonies };
