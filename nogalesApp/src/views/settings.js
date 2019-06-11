//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import {colors} from '../commons/colors';
import firebase from 'react-native-firebase';

// create a component
class Settings extends Component {

    componentDidMount() {
        this.removeNotificationListener = firebase.notifications().onNotification((notification)=> {
          // Process your notification as required
          alert(notification.body)
        });
    }
    
      
    componentWillUnmount(){
            this.removeNotificationListener();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=> colors.mainColor = 'blue'}>
                    <Text>Settings</Text>
                </TouchableOpacity>
                <Button  onPress={() => {
                    firebase.messaging().subscribeToTopic('NOGALES');
                    }} title="buttonSubscribe">
                </Button>
                <Button title='Permission' onPress={() => {
                    try {
                    firebase.messaging().requestPermission();
                    // User has authorised
                    } catch (error) {
                    // User has rejected permissions
                    alert(error);
                    }

      }}> </Button>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export { Settings };
