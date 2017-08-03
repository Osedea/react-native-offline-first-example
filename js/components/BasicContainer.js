import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

type Props = {
    style?: StyleSheet.Styles | Array<StyleSheet.Styles>,
};

const BasicContainer = (props: Props) => (
    <View
        {...props}
        style={[
            styles.container,
            props.style,
        ]}
    />
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

export default BasicContainer;
