//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import firebase from 'react-native-firebase';
import { getColonie } from '../commons';
import { Colonies } from './colonie';

// create a component
class Home extends Component {

    state = {
        busLocation: null,
        showInitialConfiguration: false,
        starting: true 
    }

    onDocUpdate = (querySnapshot) => {
        const { currentPosition } = querySnapshot.data();
        const latitude = currentPosition._latitude;
        const longitude = currentPosition._longitude;
        this.setState({ busLocation: { latitude, longitude } });
    }

    componentDidMount() {
        //this.firebaseRef = firebase.firestore().collection('zones').doc('sMhGAj5dyvZ7pFRORl4t');
        //this.unsubscribe = this.firebaseRef.onSnapshot(this.onDocUpdate);
        getColonie().then(
            value =>{
                if (value === null){
                    this.setState({showInitialConfiguration: true});
                }
            }
        ).finally(
            onfinally => {
                this.setState({starting: false})
            }
        )
    }

    componentWillUnmount() {
        //this.unsubscribe();
    }

    render() {
        if( this.state.starting) {
            return (
                <Text>Hi</Text>
            )
        } else{
            if (this.state.showInitialConfiguration){
                return <Modal visible = {this.state.showInitialConfiguration}>
                    <View style={{flex:1}}>
                        <Colonies onSetted={() => {
                            this.setState({showInitialConfiguration: false})
                        }}></Colonies>
                    </View>
                </Modal>
                 
            }
        }
        return (
            <View style={styles.container}>
                <MapView
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    //18.8157483,-97.1640488
                    initialRegion={{
                        latitude: 18.8157483,
                        longitude: -97.1640488,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    {this.state.busLocation ? <Marker coordinate={this.state.busLocation}></Marker> : null}
                </MapView>
                <Button title='Ubícame'></Button>
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
