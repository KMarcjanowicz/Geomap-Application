import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';

class MyButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <TouchableOpacity onPress={this.props.click} style={{ backgroundColor: "#80A1D4", padding: 10, alignContent: 'center', borderRadius: 50, marginBottom: 20, width: 300}}><Text style={{ color: 'white',  fontSize: 20, alignSelf: 'center'}}> {this.props.text} </Text></TouchableOpacity>
        );
    }
}

MyButton.propTypes = {
    text: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired,
};

export default MyButton