//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colonies } from '../commons';
import { setTopic } from '../functions';

// create a component

class Colonies extends Component {

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={colonies}
                    renderItem = {({item}) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setTopic(item.topic).then(
                                    this.props.onSetted
                                ).catch(
                                    err => alert(err)
                                )
                            }}>
                                <Text>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                >
                </FlatList>
            </View>
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
