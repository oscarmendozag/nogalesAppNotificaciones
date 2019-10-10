//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { colors } from '../commons/colors';
import firebase, { notifications } from 'react-native-firebase';
import { getColonie, NotificationItem } from '../commons';
import { Icon, ListItem, Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Header } from '../components';


// create a component
class Notifications extends Component {

    constructor() {
        super();
        this.state = {
            colonie: '',
            localNotifications: []
        }
        this.renderTimes = 0;
    }
    componentDidMount() {
        this.getNotifications();

    }

    toLocalDate(timestamp) {
        return new Date(timestamp);
    }

    getNotifications() {
        getColonie().then(
            value => {
                if (value) {
                    this.setState({ colonie: value });
                    this.searchNotifications();
                }
            }
        )
    }
    searchNotifications() {
        var notificationsLocal = []
        firebase.firestore().collection('notifications').where('colonies', 'array-contains', this.state.colonie).orderBy('createdAt', 'desc').limit(10).get().then(
            notifications => {
                notifications.docs.map(
                    doc => {
                        const { type, createdAt } = doc.data();
                        const date = this.toLocalDate(createdAt);
                        notificationsLocal.push({ name: type === 1 ? 'Autobús en camino a su colonia.' : 'Servicio para el horario esperado, suspendido.', type, createdAt: date.toLocaleDateString(), hour: date.toLocaleTimeString() })
                    }
                );
                this.setState({ localNotifications: notificationsLocal })
            }
        )
    }

    render() {
        if (!this.state.colonie || !this.state.localNotifications) {
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Spinner />
                <Text>{!this.state.colonie ? 'Buscando en configuraciones' : 'Buscando notificaciones'}</Text>
            </View>
        }
        this.first = '';
        var show = false;
        return (
            <View style={styles.container}>
                <Header title='Notificaciones'>
                    <TouchableOpacity onPress={() => { this.getNotifications() }} >
                        <Icon style={{ color: '#fff', fontSize: 28 }} name='ios-refresh'>
                        </Icon>
                    </TouchableOpacity>
                </Header>
                {this.state.localNotifications.length === 0 ? <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                    <Icon style={{fontSize: 100, color:'gray'}} name='md-notifications'></Icon>
                    <Text>Aún no hay notificaciones para mostrar.</Text></View> :<FlatList
                    style={{ flex: 1 }}
                    data={this.state.localNotifications}
                    renderItem={
                        ({ item }) => {
                            show = this.first === item.createdAt ? false : (this.first = item.createdAt, true);
                            return <NotificationItem showDate={show} item={item} />
                        }
                    }
                ></FlatList>}
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
export { Notifications };
