// @flow

import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import type { NavigationScreenDetails } from 'react-navigation/src/TypeDefinition';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import uuid from 'uuid/v4';

import { isConnected } from 'DoOfflineFirstApps/js/services/network/selectors';
import { addLocalImage, sendImage } from 'DoOfflineFirstApps/js/services/images/thunks';
import ScrollContainer from 'DoOfflineFirstApps/js/components/ScrollContainer';
import Button from 'DoOfflineFirstApps/js/components/Button';
import CatImage from 'DoOfflineFirstApps/js/components/CatImage';
import type { ImageToUpload } from 'DoOfflineFirstApps/js/types';
import colors from 'DoOfflineFirstApps/js/colors';

type Props = {
    navigation: NavigationScreenDetails,
    addLocalImage: () => void,
    isConnected: boolean,
    sendImage: () => void,
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

    handleAddCatPress = () => {
        ImagePicker.showImagePicker(this.pickerOptions, (response) => {
            if (response.error) {
                if (__DEV__) {
                    console.log(response.error);
                }
                this.setState({
                    error: 'Could not get your cat 😿, please try again.',
                });
            } else if (response.didCancel) {
                // Do nothing
            } else {
                const source = {
                    uuid: uuid(),
                    uploadedTryAt: new Date().getTime(),
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
        this.state.images.forEach((image: ImageToUpload) => {
            // Offline first! Let’s add our images locally first...
            this.props.addLocalImage({
                ...image,
                processing: true,
            });
            // ...then try to send them to the server
            this.props.sendImage({
                ...image,
                processing: true,
            });
        });

        // Optimistic UI, if there was no error, we have everything
        // in the Redux store somewhere, so we don't need to keep the User
        // waiting on this page
        this.props.navigation.goBack();
    };

    render() {
        return (
            <ScrollContainer>
                {this.state.images.length === 0
                    ? <Button
                        text={'Pick an image of 🐈'}
                        onPress={this.handleAddCatPress}
                    />
                    : <View style={styles.imagesList}>
                        {this.state.images.map((catImage: ImageToUpload) =>
                            (<CatImage
                                {...catImage}
                                key={catImage.uuid}
                                upload
                            />)
                        )}
                        <Button
                            text={'I have other cats! 😸'}
                            onPress={this.handleAddCatPress}
                        />
                        {this.props.isConnected
                            ? <Button
                                text={'Make my cats famous right now! 😼'}
                                onPress={this.handleSendCatsPress}
                            />
                            : <Button
                                text={'Make my cats famous ASAP! ⏱'}
                                onPress={this.handleSendCatsPress}
                            />
                        }
                    </View>
                }
                {this.state.error
                    ? <Text style={styles.error}>
                        {this.state.error}
                    </Text>
                    : null
                }
            </ScrollContainer>
        );
    }
}

const mapStateToProps = () => createStructuredSelector({
    isConnected: isConnected(),
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addLocalImage,
            sendImage,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ImageAdd);

const styles = StyleSheet.create({
    error: {
        padding: 10,
        color: colors.error,
    },
    imagesList: {
        flex: 1,
    },
});
