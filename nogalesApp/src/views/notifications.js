//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { colors } from '../commons/colors';
import firebase, { notifications } from 'react-native-firebase';
import { getColonie, NotificationItem } from '../commons';
import { Icon, ListItem, Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

// create a component
class Notifications extends Component {

    constructor() {
        super();
        this.state = {
            colonie: '',
            localNotifications: null
        }
        this.renderTimes = 0;
    }
    componentDidMount() {
        getColonie().then(
            value => {
                if (value) {
                    this.setState({ colonie: value });
                    this.searchNotifications();
                }
            }
        )
    }

    toLocalDate(timestamp) {
        return new Date(timestamp);
    }

    searchNotifications() {
        var notificationsLocal = []
        firebase.firestore().collection('notifications').where('colonies', 'array-contains', this.state.colonie).orderBy('createdAt', 'desc').limit(10).get().then(
            notifications => {
                notifications.docs.map(
                    doc => {
                        const { name, createdAt } = doc.data();
                        const date = this.toLocalDate(createdAt);
                        notificationsLocal.push({ name, createdAt: date.toLocaleDateString(), hour: date.toLocaleTimeString() })
                    }
                );
                this.setState({ localNotifications: notificationsLocal })
            }
        )
    }

    render() {
        if (!this.state.colonie) {
            return <Spinner />
        }
        if (!this.state.localNotifications) {
            return <Text>Fetching notifications</Text>
        }
        this.first = '';
        var show = false;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { this.searchNotifications() }} style={{ backgroundColor: '#000', padding: 5, borderRadius: 2, elevation: 2, marginTop: 10 }}>
                    <Icon style={{ color: '#fff' }} name='ios-refresh'>
                    </Icon>
                </TouchableOpacity>
                <FlatList
                    data={this.state.localNotifications}
                    renderItem={
                        ({ item }) => {
                            show = this.first === item.createdAt ? false : (this.first = item.createdAt, true);
                            return<NotificationItem showDate = {show} item ={item}/>
                        }
                    }
                ></FlatList>
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
