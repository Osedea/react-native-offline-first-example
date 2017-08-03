import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    commentsLabel: {
        padding: 10,
    },
    tile: {
        height: 150,
        flex: 1,
    },
});

export default class CatImage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.props.uri }}
                    resizeMode={'cover'}
                    style={styles.tile}
                />
                <Text style={styles.commentsLabel}>
                    {this.props.comments.length}
                </Text>
            </View>
        );
    }
}
