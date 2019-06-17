import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyButton from './../classes/MyButton';
import { Location } from 'expo';

export default class List extends Component {
    static navigationOptions = {
        //header: null,
        title: "Location List",
        headerStyle: {
            backgroundColor: "#F7F4EA",
        },
        headerTitleStyle: {
            fontSize: 30,
            fontFamily: 'myfont',
            fontWeight: "200"
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            list: '',
            iterator: 0,
        };
        this.getAllData = this.getAllData.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.setData = this.setData.bind(this);
        this.savePosition = this.savePosition.bind(this);

        this.getAllData();
    }

    getAllData = async () => {
        let keys = await AsyncStorage.getAllKeys();
        console.log("keys", keys)
        let stores = await AsyncStorage.multiGet(keys);
        console.log("stores", stores)
        let maps = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            console.log(key, value)
            this.setState({
            })
        });
    }

    getPosition = async () => {
        let pos = await Location.getCurrentPositionAsync({});
        return JSON.stringify(pos, null, 4);
    }

    setData = async (x) => {    
        await AsyncStorage.setItem('position' + this.state.iterator, x);
        this.getAllData();
    }

    savePosition(){
        var pos = this.getPosition();
        this.setData(pos);
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', fontFamily: 'myfont', }}>
                <View style={{ height: 100, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                    <MyButton text="Save your position" click={() => this.savePosition()} />
                    <MyButton text="Delete Data" click={() => this.delData()} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                </View>
            </View>
        );
    }
}
