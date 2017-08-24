// @flow
import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import type { Style } from 'DoOfflineFirstApps/js/types';

type Props = {
    style?: Style,
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

export default BasicContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
