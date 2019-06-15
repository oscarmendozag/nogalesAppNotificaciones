//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';
import { getColonie } from '../commons';
import { Colonies } from './colonie';
import busIcon from '../assets/bus.png';
import { Spinner, Icon } from 'native-base';

// create a component
class Home extends Component {

    state = {
        busLocation: null,
        showInitialConfiguration: false,
        starting: true,
        colonie: '',
        fetching: false
    }

    onDocUpdate = (querySnapshot) => {
        const { latitud, longitud } = querySnapshot.data();
        this.setState({ busLocation: { latitude: latitud, longitude: longitud } });
    }

    componentDidMount() {
        //this.firebaseRef = firebase.firestore().collection('zones').doc('sMhGAj5dyvZ7pFRORl4t');
        //this.unsubscribe = this.firebaseRef.onSnapshot(this.onDocUpdate);
        this.startTracking();
    }

    startTracking() {
        getColonie().then(
            value => {
                alert(value);
                if (value === null) {
                    this.setState({ showInitialConfiguration: true });
                } else {
                    this.setState({ fetching: true });
                    this.collectionRef = firebase.firestore().collection('zones').where('colonies', 'array-contains', value).get().then(
                        collection => {
                            collection.forEach(
                                document => {
                                    this.unsubscribe = document.ref.onSnapshot(this.onDocUpdate);
                                    this.setState({ fetching: false })
                                }
                            )
                        }
                    ).catch(
                        err => {
                            this.setState({ fetching: false })
                        }
                    )
                }
            }
        ).finally(
            onfinally => {
                this.setState({ starting: false, fetching: false })
            }
        );
    }

    componentWillUnmount() {
        this.setState({ showInitialConfiguration: false })
        this.unsubscribe();
    }

    render() {
        if (this.state.starting) {
            return (
                <View style={styles.container}>
                    <Spinner></Spinner>
                    <Text>{this.state.fetching ? 'Buscando si ha salido autobús' : 'Comprobando configuración'} </Text>
                </View>
            )
        } else {
            if (this.state.showInitialConfiguration) {
                return <Modal visible={this.state.showInitialConfiguration}>
                    <View style={{ flex: 1 }}>
                        <Colonies onSetted={() => {
                            this.setState({ showInitialConfiguration: false });
                            this.startTracking();
                            alert('Ahora recibirás notificaciones.')
                        }}></Colonies>
                    </View>
                </Modal>

            }
            if (this.state.fetching) {
                return (
                    <View style={styles.container}>
                        <Spinner></Spinner>
                        <Text>Buscando si ha salido autobús</Text>
                    </View>
                )
            }
            if (!this.state.busLocation) {
                return <View style={{justifyContent: 'center', flex: 1, alignItems:'center'}}>
                    <Text>
                        Autobús no ha salido hacia su colonia, Consulte el calendario o en el apartado de notificaciones.
                    </Text>
                    <Icon name='ios-refresh' onPress={() => { this.startTracking();}}></Icon>
                </View>
            }
        }
        return (
            <View style={styles.container}>
                <MapView
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    ref={ref => this.map = ref}
                    initialRegion={{
                        latitude: 18.8157483,
                        longitude: -97.1640488,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}

                >
                    {this.state.busLocation ? <Marker image={busIcon} coordinate={this.state.busLocation}></Marker> : null}
                </MapView>
                <Button onPress={() => {
                    this.map.fitToCoordinates([this.state.busLocation])
                }} title='Ubícame'></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

//make this component available to the app
export { Home };
