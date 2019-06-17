import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Font } from 'expo';
import { Location, Permissions } from 'expo';
import { AsyncStorage } from "react-native";
import MyButton from './components/classes/MyButton';
import { MapView } from 'expo';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      fontloaded: false,
      storage: 'info'
    };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.setPermissions = this.setPermissions.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.setData = this.setData.bind(this);
    this.getData = this.getData.bind(this);
    this.getAllData = this.getAllData.bind(this);
    this.componentWillMount();
  }
  componentWillMount = async () => {
    await Font.loadAsync({
      'myfont': require('./components/fonts/Roboto-Thin.ttf'),
    });
    this.setState({ fontloaded: true })
    this.setPermissions()
  }

  setPermissions = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
    }
  }

  getPosition = async () => {
    let pos = await Location.getCurrentPositionAsync({})
    alert(JSON.stringify(pos, null, 4))
  }

  setData = async () => {
    //await AsyncStorage.setItem('key1', 'value1');
    console.log("funkcja")
    await AsyncStorage.setItem('key' + Math.round(Math.random() * 100), 'value' + Math.random());
  }
  getData = async () => {
    let val = await AsyncStorage.getItem('key1');
    console.log(val);
    his.setState({
      storage: val
    })
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
        storage: store
      })
    });
  }

  render() {
    if (this.state.fontloaded) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', fontFamily: 'myfont', }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MyButton text="Save item" click={() => this.setData()} />
            <MyButton text="Retrieve item" click={() => this.getData()} />
            <MyButton text="Retrieve all items" click={() => this.getAllData()} />
          </View>
          <View style={{ backgroundColor: '#C0B9DD', flex: 1, alignContent: 'center' }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 50.111,
                longitude: 20.111,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: 50.111,
                  longitude: 20.111,
                }}
                title={"pos"}
                description={"opis"}
                pinColor={'#75c9c8'}
              />
            </MapView>
          </View>
        </View>
      );
    }
    else {
      return (
        <Text>Czcionka niezaładowana.</Text>
      );
    }
  }
}

