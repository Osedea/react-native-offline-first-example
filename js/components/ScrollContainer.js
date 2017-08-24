// @flow
import React from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';

import type { Style } from 'DoOfflineFirstApps/js/types';

type Props = {
    style?: Style,
};

const ScrollContainer = (props: Props) => (
    <ScrollView
        {...props}
        style={[
            styles.container,
            props.style,
        ]}
    />
);

export default ScrollContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
