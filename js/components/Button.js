// @flow

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';

type Props = {
    noShadow: boolean,
    onPress: Function,
    text: string,
    style?: StyleSheet.Styles | Array<StyleSheet.Styles>,
};

const Button = (props: Props) => (
    <TouchableHighlight
        onPress={props.onPress}
        style={[
            styles.button,
            props.noShadow ? null : styles.shadow,
            props.style,
        ]}
        underlayColor={'#F0F0F0'}
    >
        <Text>{props.text}</Text>
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FAFAFA',
    },
    shadow: {
        shadowRadius: 5,
        shadowColor: '#000000',
        shadowOffset: {
            height: 5,
            width: 2,
        },
        shadowOpacity: 0.1,
    },
});

export default Button;
