import {AsyncStorage} from 'react-native';

export function setColonie(colonie){
    return AsyncStorage.setItem('colonie',colonie);
}

export function getColonie(){
    return AsyncStorage.getItem('colonie');
}