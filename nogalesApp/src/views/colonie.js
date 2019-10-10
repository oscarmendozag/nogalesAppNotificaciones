//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { colonies } from '../commons';
import { setTopic, wordSearch } from '../functions';
import { ListItem, Icon, Body, Title, Right } from 'native-base';
import { Header } from '../components';
// create a component

class Colonies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colonies: colonies,
            textInputSearch: ''
        }
    }

    componentDidMount() {
    }

    search() {
        let word = this.state.textInputSearch;
        if (word === '') {
            this.setState({ colonies: colonies });
            return;
        }
        wordSearch(word).then(
            res => {
                this.setState({ colonies: res });
            }
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    title='Seleccione su colonia'>
                    {this.props.isEditing ? <Icon onPress={this.props.close} name='md-close' style={{ color: '#fff' }}></Icon> : null}
                </Header>
                <TextInput
                    onChangeText={text => {
                        this.setState({ textInputSearch: text });
                        this.search();
                    }}
                    placeholder='Ingrese nombre de colonia'
                    style={{ borderBottomColor: '#000', borderBottomWidth: 1, marginHorizontal: 10, borderWidth: 1, borderRadius: 10, marginTop: 5 }}
                ></TextInput>
                <FlatList
                    data={this.state.colonies}
                    //extraData={this.state.colonies}
                    renderItem={({ item }) => {
                        return (
                            <ListItem
                                avatar
                                onPress={() => {
                                    Alert.alert(
                                        'Confirmación',
                                        `¿Desea seleccionar ${item.name} como su colonia predeterminada?`,
                                        [
                                            {
                                                text: 'Sí', onPress: () => {
                                                    setTopic(item.topic).then(
                                                        this.props.onSetted
                                                    ).catch(
                                                        err => alert(err)
                                                    )
                                                    Alert.alert('Éxito', 'Ha sido cambiado.', [{ text: 'Entendido' }]);
                                                }
                                            },
                                            { text: 'No', onPress: () => console.log('Ask me later pressed') }
                                        ],
                                        { cancelable: false },
                                    );
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
