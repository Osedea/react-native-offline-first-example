// @flow
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
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
    big?: boolean,
    errored?: boolean,
    isConnected: boolean,
    onLikePress: () => void,
    onPress?: () => void,
    onReportPress: () => void,
    removeImage: () => void,
    queue?: boolean,
    upload?: boolean,
};

class CatImage extends Component<Props, Props, void> {
    static defaultProps = {
        big: false,
        errored: false,
        queue: false,
        processing: false,
        upload: false,
        likes: 0,
    };

    handleLike = () => {
        this.props.onLikePress(this.props.uuid, this.props.user);
    };

    handleReport = () => {
        this.props.onReportPress(this.props.uuid);
        setTimeout(() => this.props.removeImage(this.props.uuid), 2000);
    };

    render() {
        if (this.props.reported) {
            return (
                <View style={styles.reported}>
                    <Text style={styles.reportedText}>
                        {'This image has been reported'}
                    </Text>
                </View>
            );
        }

        let likes = null;
        let report = null;

        // if (!this.props.upload && !this.props.processing && !this.props.errored) {
        //     likes =
        //         this.props.likes && this.props.likes.length
        //             ? (
        //                 <Button
        //                     style={styles.like}
        //                     onPress={
        //                         this.props.isConnected ? this.handleLike : null
        //                     }
        //                     text={`${this.props.likes.length} ❤️`}
        //                 />
        //             )
        //             : (
        //                 <Button
        //                     style={styles.like}
        //                     onPress={
        //                         this.props.isConnected ? this.handleLike : null
        //                     }
        //                     text={`💔`}
        //                 />
        //             );
        // }
        if (!this.props.upload && !this.props.processing && !this.props.errored && this.props.isConnected) {
            report = (
                <Button
                    style={[
                        styles.report,
                    ]}
                    onPress={this.handleReport}
                    text={`🚩`}
                />
            );
        }

        const content = (
            <View
                style={[
                    styles.container,
                    this.props.processing ? styles.processing : null,
                    this.props.errored ? styles.errored : null,
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
                        this.props.big
                            ? styles.bigTile
                            : null,
                    ]}
                />
                {likes}
                {report}
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
        position: 'absolute',
        bottom: 5,
        right: 5,
        padding: 10,
        backgroundColor: colors.background,
    },
    report: {
        position: 'absolute',
        top: 0,
        right: 5,
        backgroundColor: colors.transparent,
        borderWidth: 0,
    },
    processing: {
        opacity: 0.4,
    },
    errored: {
        borderWidth: 1,
        borderColor: colors.error,
    },
    tile: {
        height: 200,
        width: Dimensions.get('window').width,
    },
    smallTile: {
        height: 50,
        width: 50,
    },
    bigTile: {
        height: Dimensions.get('window').height - 140,
    },
    reported: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.lightOrange,
    },
    reportedText: {
        textAlign: 'center',
    },
});
