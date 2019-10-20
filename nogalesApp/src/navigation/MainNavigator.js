import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Home, Notifications, Track, Tips, InfoScreen } from '../views';
import { Icon } from 'native-base';
import { Item } from './menuItem';
import React from 'react';

const MainTabNavigator = createBottomTabNavigator({
    Home:{
        screen: Home,
        navigationOptions:{
            tabBarLabel: ({ tintColor }) => (
                <Item tintColor={tintColor} title={'Encontrar'} />
            ),
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                  name={'md-bus'}
                  style={{ color: tintColor, fontSize: focused ? 22: 20  }}
                />
            ),
        }
    },
    Track: {
        screen: Track,
        navigationOptions:{
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                  name={'md-calendar'}
                  style={{ color: tintColor, fontSize: focused ? 24: 22  }}
                />
            ),
            tabBarLabel: ({ tintColor }) => (
                <Item tintColor={tintColor} title={'Horarios'} />
            )
            
        }
    },
    Notifications: {
        screen: Notifications,
        navigationOptions:{
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                  name={'md-notifications'}
                  style={{ color: tintColor, fontSize: focused ? 22: 20  }}
                />
            ),
            tabBarLabel: ({ tintColor }) => (
                <Item tintColor={tintColor} title={'Alertas'} />
            )
        }
    },
    Tips:{
        screen: Tips,
        navigationOptions:{
            tabBarIcon: ({tintColor, focused}) => (
                <Icon
                    name={'ios-bulb'}
                    style={{ color: tintColor, fontSize: focused ? 22: 20 }}
                />
            ),
            tabBarLabel: ({tintColor}) => (
                <Item tintColor={tintColor} title={'Tips'}/>
            )
        }
    },
    Information:{
        screen: InfoScreen,
        navigationOptions:{
            tabBarIcon: ({tintColor, focused}) => (
                <Icon
                    name={'md-information-circle'}
                    style={{ color: tintColor, fontSize: focused ? 22: 20 }}
                />
            ),
            tabBarLabel: ({tintColor}) => (
                <Item tintColor={tintColor} title={'Info'}/>
            )
        }
    }
},{
    tabBarOptions:{
        style:{
            backgroundColor:'#38393a'
        },
        activeTintColor: '#02aa5b',
        inactiveTintColor: 'gray',
    }
});


const AppContainer = createAppContainer(MainTabNavigator);


export default AppContainer;

