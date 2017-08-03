import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    container: {}
});

export default class ImageDetailScreen extends Component {
    static navigationOptions = {
        title: 'See a cat',
    };

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}
