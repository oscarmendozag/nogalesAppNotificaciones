import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Home, Settings, Track } from '../views';
import { Item } from './menuItem';
import {colors} from '../commons/colors';

import React from 'react';

const MainTabNavigator = createBottomTabNavigator({
    Home:{
        screen: Home,
        navigationOptions:{
            tabBarLabel: ({ tintColor }) => (
                <Item tintColor={tintColor} title={'Rutas'} />
            )
        }
    },
    Track: {
        screen: Track,
        navigationOptions:{
            tabBarLabel: ({ tintColor }) => (
                <Item tintColor={tintColor} title={'Encontrar'} />
            )
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions:{
            tabBarLabel: ({ tintColor }) => (
                <Item tintColor={tintColor} title={'Ajustes'} />
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

