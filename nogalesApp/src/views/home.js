//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';
import { getColonie, colors, isColonieUpdated, colonieUpdated } from '../commons';
import { Colonies } from './colonie';
import busIcon from '../assets/bus.png';
import { Spinner, Icon } from 'native-base';
import { Header } from '../components';
const latitudeDelta = 0.015;
const longitudeDelta = 0.0121;
// create a component
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            busLocation: null,
            showInitialConfiguration: false,
            starting: true,
            colonie: '',
            fetching: false,
            marginTop: 4,
        };
        this.mapLoaded = 0;
        this.changeTop = this.changeTop.bind(this);
    }

    onDocUpdate = (querySnapshot) => {
        const { latitud, longitud } = querySnapshot.data();
        if (latitud && longitud) {
            this.setState({ busLocation: { latitude: latitud, longitude: longitud, longitudeDelta, latitudeDelta } });
            return;
        }
        this.setState({ busLocation: null });
        return;
    }

    componentDidMount() {
        this.startTracking();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            isColonieUpdated().then(
                value => {
                    if (value === "1") {
                        colonieUpdated("0").then(val => { this.startTracking(); });
                    }

                }
            );
        });
    }

    changeTop() {
        this.setState({ marginTop: 0 })
    }
    startTracking() {
        this.setState({ fetching: true });
        getColonie().then(
            value => {
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
        this.focusListener();
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
                            Alert.alert('¡Listo!', 'Ahora recibirás notificaciones.', [{ text: 'Entendido.' }]);
                        }}></Colonies>
                    </View>
                </Modal>

            }
            if (this.state.fetching) {
                return (
                    <View style={styles.container}>
                        <Spinner></Spinner>
                        <Text>Buscando si ha su salido autobús.</Text>
                    </View>
                )
            }
            if (!this.state.busLocation) {
                return <View style={{ flex: 1, alignItems: 'center' }}>
                    <Header title='Autobús'>
                        <Icon style={{ color: '#fff', fontSize: 28 }} name='ios-refresh' onPress={() => { this.startTracking(); }}></Icon>
                    </Header>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
                        <Icon name='md-bus' style={{ color: 'gray', fontSize: 80 }}>
                        </Icon>
                        <Text style={{ fontSize: 16, textAlign: 'center' }}>
                            El servicio de recolección no ha salido hacia su colonia. Consulte la sección de horarios o en el apartado de notificaciones.
                        </Text>
                    </View>
                </View>
            }
        }

        return (
            <View style={[styles.container, { marginTop: this.state.marginTop }]}>
                <MapView
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    ref={ref => this.map = ref}
                    initialRegion={{
                        latitude: 18.8157483,
                        longitude: -97.1640488,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    {this.state.busLocation ? <Marker coordinate={this.state.busLocation} ><Image source={busIcon} style={{ height: 30, width: 30 }}/></Marker>  : null}

                    
                </MapView>
                <View style={{ position: 'absolute', top: 10, width: '100%', paddingHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ backgroundColor: colors.mainColor, padding: 5, elevation: 1, alignItems: 'center', flexDirection: 'row' }} onPress={() => {
                            this.map.animateToRegion(this.state.busLocation, 100);

                        }}>
                            <Icon style={{ color: '#fff' }} name='ios-bus' />
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ color: '#fff' }}>Localizar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
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
