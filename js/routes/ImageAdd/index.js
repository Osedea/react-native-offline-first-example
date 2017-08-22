// @flow

import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import type { NavigationScreenDetails } from 'react-navigation/src/TypeDefinition';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withNetworkConnectivity } from 'react-native-offline';

import { addImages } from 'DoOfflineFirstApps/js/services/Images/actions';
import { selectPendingImages } from 'DoOfflineFirstApps/js/services/Images/selectors';
import BasicContainer from 'DoOfflineFirstApps/js/components/BasicContainer';
import Button from 'DoOfflineFirstApps/js/components/Button';
import CatImage from 'DoOfflineFirstApps/js/components/CatImage';
import type { ImageToUpload } from 'DoOfflineFirstApps/js/types';

type Props = {
    navigation: NavigationScreenDetails,
    addImages: () => void,
    pendingImages: Array<ImageToUpload>,
    isConnected: boolean,
};
type State = {
    images: Array<ImageToUpload>,
    error: Error,
};

class ImageAdd extends Component<Props, Props, State> {
    static navigationOptions = {
        title: 'Add a cat',
    };

    static defaultProps = {
        pendingImages: [],
    };

    state = {
        images: [],
    };

    pickerOptions = {
        title: 'Select A Picture of Cat',
        maxWidth: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').width * 9 / 16, // 16:9 ratio
        quality: 0.8,
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    createPendingImagePressHandler = (image: ImageToUpload) => () => {
        // Cancel it
        console.log('Cancelling', image); // Not possible for now...
    };

    handleAddCatPress = () => {
        ImagePicker.showImagePicker(this.pickerOptions, (response) => {
            if (response.error) {
                if (__DEV__) {
                    console.log(response.error);
                }
                this.setState({ error: 'Could not get your cat 😿, please try again.' });
            } else if (response.didCancel) {
                // Do nothing
            } else {
                const source = {
                    ...response,
                    preview: `data:image/jpeg;base64,${response.data}`,
                };
                const clonedImages = [...this.state.images];

                clonedImages.push(source);

                this.setState({ images: clonedImages });
            }
        });
        this.setState({ error: null });
    };

    handleSendCatsPress = () => {
        this.props.addImages(this.state.images.map((image: ImageToUpload) => ({
            ...image,
            processing: true,
        })));
        this.props.navigation.goBack();
    };

    render() {
        return (
            <BasicContainer>
                {this.state.images.length === 0
                    ? <Button
                        text={'Pick an image of 🐈'}
                        onPress={this.handleAddCatPress}
                    />
                    : <View style={styles.imagesList}>
                        {this.state.images.map((catImage: ImageToUpload) => (
                            <CatImage
                                {...catImage}
                                key={catImage.uri}
                                upload
                            />
                        ))}
                        <Button
                            text={'I have other cats! 😸'}
                            onPress={this.handleAddCatPress}
                        />
                        {this.props.isConnected
                            ? (
                                <Button
                                    text={'Make my cats famous right now! 😼'}
                                    onPress={this.handleSendCatsPress}
                                />
                            )
                            : (
                                <Button
                                    text={'Make my cats famous ASAP! ⏱'}
                                    onPress={this.handleSendCatsPress}
                                />
                            )
                        }
                    </View>
                }
                {this.props.pendingImages.length
                    ? <View style={styles.pending}>
                        <Text style={styles.label}>{'Pending uploads'}</Text>
                        {this.props.pendingImages.map((catImage: ImageToUpload) => (
                            <CatImage
                                {...catImage}
                                key={catImage.uri}
                                onPress={this.createPendingImagePressHandler(catImage)}
                                upload
                            />
                        ))}
                    </View>
                    : null
                }
                {this.state.error
                    ? <Text style={styles.error}>{this.state.error}</Text>
                    : null
                }
            </BasicContainer>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    pendingImages: selectPendingImages(),
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    addImages,
}, dispatch);

export default withNetworkConnectivity()(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(ImageAdd)
);

const colors = {
    error: '#BB0000',
};
const styles = StyleSheet.create({
    error: {
        padding: 10,
        color: colors.error,
    },
    imagesList: {
        flex: 1,
    },
    pending: {
        marginTop: 10,
    },
    label: {
        padding: 10,
    },
});
