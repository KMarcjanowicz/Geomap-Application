import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyButton from './../classes/MyButton';
import { Font } from 'expo';
import { ActivityIndicator } from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false
        };
        this.Proceed = this.Proceed.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.setPermissions = this.setPermissions.bind(this);
        this.componentWillMount();
    }

    Proceed() {
        this.props.navigation.navigate("list")
    }

    componentWillMount = async () => {
        await Font.loadAsync({
            'myfont': require('./../fonts/Roboto-Thin.ttf'),
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

    render() {
        if (this.state.fontloaded) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', fontFamily: 'myfont', }}>
                    <View style={{ backgroundColor: '#C0B9DD', flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 60, alignSelf: 'center', fontFamily: 'myfont', color: 'white'}}>Geolocation Application</Text>
                        <Text style={{ fontSize: 45, alignSelf: 'center', fontFamily: 'myfont', color: 'white'}}>Find and save your position</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MyButton text="Proceed" click={() => this.Proceed()} />
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {
                        <ActivityIndicator size="large" color="#80A1D4" />
                    }
                </View>
            );
        }
    }
}
