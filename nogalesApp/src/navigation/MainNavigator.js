import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Home, Settings, Track } from '../views';
import { Icon } from 'native-base';
import { Item } from './menuItem';
import {colors} from '../commons/colors';
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
                  style={{ color: tintColor, fontSize: focused ? 22: 20  }}
                />
            ),
            tabBarLabel: ({ tintColor }) => (
                <Item tintColor={tintColor} title={'Calendario'} />
            )
            
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions:{
            tabBarIcon: ({ tintColor, focused }) => (
                <Icon
                  name={'md-notifications'}
                  style={{ color: tintColor, fontSize: focused ? 22: 20  }}
                />
            ),
            tabBarLabel: ({ tintColor }) => (
                <Item tintColor={tintColor} title={'Notificaciones'} />
            )
        }
    }
},{
    tabBarOptions:{
        activeTintColor: colors.mainColor
    }
});


const AppContainer = createAppContainer(MainTabNavigator);


export default AppContainer;

