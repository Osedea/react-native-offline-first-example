// @flow
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import type { ImageToUpload, ImageFromServer } from 'DoOfflineFirstApps/js/types';
import { isConnected } from 'DoOfflineFirstApps/js/services/network/selectors';
import Button from 'DoOfflineFirstApps/js/components/Button';
import colors from 'DoOfflineFirstApps/js/colors';

type Props = (ImageToUpload | ImageFromServer) & {
    isConnected: boolean,
    onLikePress: () => void,
    onPress?: () => void,
    queue?: boolean,
    upload?: boolean,
};

class CatImage extends Component<Props, Props, void> {
    static defaultProps = {
        errored: false,
        queue: false,
        processing: false,
        upload: false,
        likes: 0,
    };

    handleLike = () => {
        this.props.onLikePress(this.props.uuid, this.props.user);
    };

    render() {
        let likesMention = null;

        if (!this.props.upload && !this.props.processing && !this.props.errored) {
            likesMention =
                this.props.likes && this.props.likes.length
                    ? (
                        <Button
                            style={styles.like}
                            onPress={
                                this.props.isConnected ? this.handleLike : null
                            }
                            text={`${this.props.likes.length} ❤️`}
                        />
                    )
                    : (
                        <Button
                            style={styles.like}
                            onPress={
                                this.props.isConnected ? this.handleLike : null
                            }
                            text={`💔`}
                        />
                    );
        }

        const content = (
            <View
                style={[
                    styles.container,
                    this.props.processing ? styles.processing : null,
                ]}
            >
                <Image
                    source={{ uri: this.props.preview }}
                    resizeMode={'cover'}
                    style={[
                        styles.tile,
                        this.props.queue
                            ? styles.smallTile
                            : null,
                    ]}
                />
                {likesMention}
            </View>
        );

        if (this.props.onPress) {
            return (
                <TouchableOpacity onPress={this.props.onPress}>
                    {content}
                </TouchableOpacity>
            );
        } else {
            return content;
        }
    }
}

export default connect(
    createStructuredSelector({
        isConnected: isConnected(),
    })
)(CatImage);

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
        shadowColor: colors.shadow,
        shadowOpacity: 0.1,
        shadowOffset: {
            x: 0,
            y: 2,
        },
    },
    like: {
        padding: 10,
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: colors.background,
    },
    processing: {
        opacity: 0.4,
    },
    tile: {
        height: 200,
        width: Dimensions.get('window').width,
    },
    smallTile: {
        height: 50,
        width: 50,
    },
});
