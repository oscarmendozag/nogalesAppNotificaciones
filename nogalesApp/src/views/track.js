//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, FlatList } from 'react-native';
import { Icon, Spinner } from 'native-base';
import { Colonies } from './colonie';
import { Header } from '../components';
import { getColonie } from '../commons';
import { getOne } from '../functions';

// create a component
class Track extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showColonies: false,
            colonie: null,
        }
    }

    componentDidMount() {
        this.updateColonie();
    }

    updateColonie() {
        getColonie().then(
            topic => {
                getOne(topic).then(
                    val => {
                        this.setState({ colonie: val });
                    }
                );
            }
        );
    }
    render() {
        if (!this.state.colonie) {
            return <View>
                <Spinner>

                </Spinner>
            </View>
        };

        return (
            <View style={styles.container}>
                <Header title='Horarios'>
                    <Icon style={{ color: '#fff' }} name='ios-settings' onPress={() => {
                        this.setState({ showColonies: true })
                    }} />
                </Header>

                <Modal
                    onRequestClose={() => {
                        this.setState({ showColonies: false })
                    }}
                    visible={this.state.showColonies}>
                    <View style={{ flex: 1 }}>
                        <Colonies close={() => {
                            this.setState({ showColonies: false })
                        }} isEditing={true} onSetted={() => {
                            this.setState({ showColonies: false });
                            this.updateColonie();
                        }} />
                    </View>
                </Modal>

                <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 16, color: '#000' }}>El autobús pasaría por la colonia {this.state.colonie.name} en el siguiente horario: </Text>
                    <Text>(Este horario podría verse afectado por casos extraordinarios, esté atento a las notificaciones)</Text>
                </View>
                <FlatList
                    data={this.state.colonie.dates}
                    style={{ flex: 2, padding: 10, marginBottom: 1 }}
                    keyExtractor = {({item, index}) => 'key'+index }
                    renderItem={({ item }) => <View style={{ borderWidth: .5, backgroundColor: '#fff', borderRadius: 5, borderColor: '#000', elevation: 2, marginVertical: 10, padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View>
                                <Text style={{ alignSelf: 'center', color: '#000', fontWeight: 'bold', fontSize: 16 }}>{item.hour}</Text>
                                <Text>{item.hour === 'Matutino' ? '8:00 am -12:00 pm' : '2:00 pm - 8:00 pm'}</Text>
                            </View>
                            <Text style={{ alignSelf: 'center', color: '#000', fontSize: 16 }}>{item.day}</Text>
                        </View>
                    </View>}
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
export { Track };
