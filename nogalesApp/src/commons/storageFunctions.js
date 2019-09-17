import {AsyncStorage} from 'react-native';

export function setColonie(colonie){
    return AsyncStorage.setItem('colonie',colonie);
}

export function getColonie(){
    return AsyncStorage.getItem('colonie');
}

export function colonieUpdated(flag){
    return AsyncStorage.setItem('isColonieUpdated', flag);
}

export function isColonieUpdated(){
    return AsyncStorage.getItem('isColonieUpdated');
}