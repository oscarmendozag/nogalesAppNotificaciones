//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { colors } from '../commons/colors';
import firebase from 'react-native-firebase';

// create a component
class Settings extends Component {

    apply_Green=()=>{
        //console.log(this.props.navigation);
        console.log(this.props.navigation.tabs);
        //this.props.navigation.setParams({tabBarColor:'red' ,Title: 'Green Activity', BackgroundColor : '#1B5E20', HeaderTintColor : '#fff'});
      }
    


    render() {
        return (
            <View style={styles.container}>
               <Button title='Hi' onPress={this.apply_Green}></Button>
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
