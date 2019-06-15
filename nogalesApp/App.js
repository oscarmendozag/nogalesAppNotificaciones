/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, PermissionsAndroid, View } from 'react-native';
import AppContainer from './src/navigation/MainNavigator';

export default class App extends Component {

  componentDidMount() {
    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': 'AndoridPermissionExample App Camera Permission',
            'message': 'AndoridPermissionExample App needs access to your camera '
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          alert("You can use the CAMERA");
        } else {
          alert("CAMERA permission denied");
        }
      } catch (err) {
        alert("err", err);
        console.warn(err)
      }
    }
    if (Platform.OS === 'android') {
      //Calling the permission function
      requestCameraPermission();
    } else {
      alert('IOS device found');
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <AppContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
