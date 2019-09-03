//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { colonies } from '../commons';
import { setTopic } from '../functions';
import { ListItem, Icon, Body, Title, Right } from 'native-base';
import {Header} from '../components';
// create a component

class Colonies extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.state={
            colonies : [],
            textInputSearch: ''
        }
    }

    search(){
        alert(this.state.textInputSearch);
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    title='Seleccione su colonia'>
                        {this.props.isEditing ?  <Icon onPress={this.props.close} name='md-close' style={{color:'#fff'}}></Icon> : null}
                </Header>
                <TextInput
                    onEndEditing={()=> this.search()}
                    onChangeText= {text => {
                        this.setState({textInputSearch: text})
                    }}
                    placeholder='Ingrese nombre de colonia'
                    style={{borderBottomColor:'#000', borderBottomWidth: 1, marginHorizontal: 10, borderWidth: 1, borderRadius: 10, marginTop: 5}}
                ></TextInput>
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
