// @flow
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';

import type { Style } from 'DoOfflineFirstApps/js/types';

type Props = {
    noShadow: boolean,
    onPress: () => void,
    text: string,
    style?: Style,
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

const colors = {
    background: '#FAFAFA',
    shadow: '#000000',
};
const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: colors.background,
        alignSelf: 'center',
    },
    shadow: {
        shadowRadius: 5,
        shadowColor: colors.shadow,
        shadowOffset: {
            height: 5,
            width: 2,
        },
        shadowOpacity: 0.1,
    },
});

export default Button;
