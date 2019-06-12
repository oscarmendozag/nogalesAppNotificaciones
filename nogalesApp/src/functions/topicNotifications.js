import firebase from 'react-native-firebase';
import { getColonie, setColonie } from '../commons';

export const setTopic = (colonie) => new Promise((resolve, reject) =>{
    getColonie().then(
        colonieSaved => {
            if (colonieSaved){
                firebase.messaging().unsubscribeFromTopic(colonieSaved);
            } 
            firebase.messaging().subscribeToTopic(colonie);
            setColonie(colonie);
            return resolve(true);
        }
    ).catch(
        error => reject(error)
    )
})