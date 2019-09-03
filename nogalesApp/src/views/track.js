//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Icon } from 'native-base';
import { Colonies } from './colonie';
import { Header } from '../components';

// create a component
class Track extends Component {

    state = {
        showColonies: false
    }
    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Header title='Horarios'>
                    <Icon style={{color:'#fff'}} name='ios-settings' onPress={() => {
                        this.setState({ showColonies: true })
                    }} />
                </Header>

                <Modal
                    onRequestClose={() => {
                        this.setState({ showColonies: false })
                    }}
                    visible={this.state.showColonies}>
                    <View style={{ flex: 1 }}>
                        <Colonies close={()=> {
                            this.setState({showColonies: false})
                        }} isEditing={true} onSetted={() => {
                            alert('Ha sido cambiado');
                            this.setState({ showColonies: false })
                        }} />
                    </View>
                </Modal>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export { Track };
