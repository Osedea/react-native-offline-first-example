// @flow
import React, { Component } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { withNetworkConnectivity } from 'react-native-offline';

import Button from 'DoOfflineFirstApps/js/components/Button';

type Props = {
    isConnected: boolean,
    likes?: number,
    onLikePress: () => void,
    onPress?: () => void,
    preview: string,
    processing?: boolean,
    upload?: boolean,
};

class CatImage extends Component<Props, Props, void> {
    static defaultProps = {
        processing: false,
        upload: false,
        likes: [],
    };

    handleLike = () => {
        this.props.onLikePress(this.props.uuid);
    };

    render() {
        let likesMention = null;

        if (!this.props.upload && !this.props.processing) {
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
        } else if (this.props.processing) {
            likesMention = (
                <View style={styles.like}>
                    <ActivityIndicator />
                </View>
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
                    style={styles.tile}
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

export default withNetworkConnectivity()(CatImage);

const colors = {
    border: '#CCCCCC',
    background: '#FFFFFF',
    shadow: '#000000',
};
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
});
