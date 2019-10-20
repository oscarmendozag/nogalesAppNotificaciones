//import liraries
import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Header } from '../components';
import { Icon } from 'native-base';
import { colors } from '../commons';

// create a component
class Tips extends Component {

    constructor(props) {
        super(props);
        this.three_r = [
            {
                id: '0',
                img: require('../assets/Rechaza.png'),
                description: 'Rechaza',
                more_info: 'Rechaza el consumo de desechables. Podemos pedir la comida para llevar en un traste que nosotros hayamos llevado.'
            },
            {
                id: '1',
                img: require('../assets/Composta.png'),
                description: 'Composta',
                more_info: 'Usar desechos orgánicos, que son los de materia vegetal o animal, como abono.'
            },
            {
                id: '3',
                img: require('../assets/Reduce.png'),
                description: 'Reduce',
                more_info: 'Reduce el consumo de desechables. Podemos comprar 1 botella de alguna bebida en lugar de 6.'
            },
            {
                id: '4',
                img: require('../assets/Reutiliza.png'),
                description: 'Reutiliza',
                more_info: 'Usemos el ingenio. Podemos reutilizar algo de nuestra basura y darle otra utilidad o la mayor utilidad posible.'
            },
            {
                id: '5',
                img: require('../assets/Recicla.png'),
                description: 'Recicla',
                more_info: 'Lleva tu basura que puede ser reciclada a lugares donde puedan transformarla para ser utilizada nuevamente.'
            }

        ];
        this.nogales_tips = [{
            id: '0',
            img: require('../assets/objetosp.png'),
            description: 'Objetos punzocortantes',
            more_info: 'Si su contenedor de basura tiene objetos que puedan cortar como botellas rotas, vidrios, clavos, pinchones o metales oxidados. Informa a nuestro servidor.'
        }, {
            id: '1',
            img: require('../assets/Riesgo_biologico.png'),
            description: 'Riesgo biológico',
            more_info: 'Evitar incluir desechos clinicos ya que estos representan un riesgo biologico que puede dar lugar a enfermedades.'
        }
        ];

        this.state = {
            modalVisible: false,
            selectedItem: { img: null, description: '', more_info: '', color: '#00f' }
        };
    }

    _selectItem(item) {
        this.setState({ selectedItem: item }, () => this.setState({ modalVisible: true }));
    }
    render() {
        return (
            <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
                <Header title='Tips'>
                </Header>
                <Modal transparent={true} onRequestClose={() => { this.setState({ modalVisible: false }) }} animationType={'slide'} visible={this.state.modalVisible}>
                    <View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,.5)', flex: 1, justifyContent: 'center' }}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 15 }}>
                            <View style={{ backgroundColor: colors.mainColor }}>
                                <Icon onPress={() => { this.setState({ modalVisible: false }) }} name={'ios-close'} style={{ alignSelf: 'flex-end', margin: 5, fontSize: 40, paddingHorizontal: 10, color: '#fff' }}>
                                </Icon>
                            </View>
                            <View style={{ backgroundColor: colors.mainColor, height: 85, alignItems: 'center', paddingTop: 40, marginBottom: 80 }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', height: '200%', width: '28%', borderRadius: 100 }}>
                                    <Image
                                        source={this.state.selectedItem.img}
                                        style={{ height: '100%', resizeMode: 'contain' }}
                                    ></Image>
                                </View>
                                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>{this.state.selectedItem.description}</Text>
                            </View>
                            <ScrollView style={{ padding: 10 }}>
                                <Text>{this.state.selectedItem.more_info}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <View style={{ padding: 10 }}>
                    <Text style={{ color: 'black', fontSize: 16, textAlign: 'justify' }}>
                        ¡Sabemos que lo hacemos bien, pero podríamos hacerlo mejor! <Text style={{ color: 'gray' }}>(Presiona sobre cada uno para saber más)</Text>
                    </Text>
                    <FlatList
                        horizontal={true}
                        data={this.three_r}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor = { item => item.id}
                        style={{ height: 200, paddingTop: 50 }}
                        renderItem={
                            ({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    this._selectItem(item);
                                }} style={{ marginHorizontal: 10, height: 100, elevation: 10, borderWidth: 0, borderRadius: 100, backgroundColor: '#fff', borderColor: 'gray', width: 105 }}>
                                    <Image style={{ height: 100, width: 105, resizeMode: 'stretch' }} source={item.img}>
                                    </Image>
                                </TouchableOpacity>
                            )
                        }
                    ></FlatList>

                    <Text style={{ color: 'black', fontSize: 16, textAlign: 'justify' }}>
                        ¡Cuídemos Nogales, también preocupemonos por el prestador de servicios!
                    </Text>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, textAlign: 'justify' }}>
                        Comentale al servidor si tu basura contiene: <Text style={{ color: 'gray', fontWeight: '100' }}>(Presiona sobre cada uno para saber más)</Text>
                    </Text>
                    <FlatList
                        horizontal={true}
                        data={this.nogales_tips}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor = { item => item.id}
                        style={{ paddingTop: 20 }}
                        renderItem={
                            ({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ selectedItem: item }, () => this.setState({ modalVisible: true }));
                                    }}
                                    style={{ marginBottom: 10, marginHorizontal: 10, elevation: 5, borderWidth: .2, borderRadius: 10, padding: 10, backgroundColor: '#fff', borderColor: 'gray', width: 125 }}>
                                    <Image style={{ height: 100, width: 105, resizeMode: 'stretch', marginBottom: 5 }} source={item.img}>
                                    </Image>
                                    <Text style={{ color: '#000', textAlign: 'center' }}>{item.description}</Text>
                                </TouchableOpacity>
                            )
                        }
                    ></FlatList>
                </View>
            </ScrollView>
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
export { Tips };
