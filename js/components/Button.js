// @flow
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';

import type { Style } from 'DoOfflineFirstApps/js/types';
import colors from 'DoOfflineFirstApps/js/colors';

type Props = {
    children?: ReactElement<*>,
    noBorder: boolean,
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
            props.noBorder ? null : styles.border,
            props.style,
        ]}
        underlayColor={'#F0F0F0'}
    >
        {props.text
            ? <Text>{props.text}</Text>
            : props.children
        }
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: colors.white,
        alignSelf: 'center',
    },
    border: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: colors.lightOrange,
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
