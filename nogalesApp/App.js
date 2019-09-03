/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Alert } from 'react-native';
import firebase, { Notification } from 'react-native-firebase';
import AppContainer from './src/navigation/MainNavigator';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showNotificationModal: true
    }
  }
  componentDidMount() {
    this.removeNotificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      // Works on both iOS and Android
      Alert.alert(
        'Bus en Camino',
        'El autobús está en camino refresque en la sección encontrar para ver dónde viene.',
        [
          { text: 'Entendido!', onPress: () => console.log('Ask me later pressed') }
        ],
        { cancelable: false },
      );

    });
  }

  componentWillUnmount() {
    this.removeNotificationListener();
  }
  render() {
    return (
      <AppContainer />
    );
  }
}

