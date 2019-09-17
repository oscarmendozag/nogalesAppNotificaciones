import { colonies } from '../commons/colonies';

const wordSearch = (word) => new Promise((resolve, reject) => {
    const newData = colonies.filter(item => {
        const itemData = `${item.name.toUpperCase()}`;
        const textData = word.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
    return resolve(newData);
});

export { wordSearch };