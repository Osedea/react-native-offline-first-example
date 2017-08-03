// @flow

import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import type { NavigationScreenDetails } from 'react-navigation/src/TypeDefinition';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addImages } from 'DoOfflineFirstApps/js/services/Images/actions';
import BasicContainer from 'DoOfflineFirstApps/js/components/BasicContainer';
import Button from 'DoOfflineFirstApps/js/components/Button';

type Props = {
    navigation: NavigationScreenDetails,
    addImages: Function,
};

class ImageAdd extends Component {
    static navigationOptions = {
        title: 'Add a cat',
    };

    state = {
        images: [],
        error: null,
    };

    props: Props;

    pickerOptions = {
        title: 'Select A Picture of Cat',
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
                this.setState({ error: 'Could not get your cat 😿, please try again.' });
            } else if (response.didCancel) {
                // Do nothing
            } else {
                const source = { uri: response.uri };
                const clonedImages = [...this.state.images];

                clonedImages.push(source);

                this.setState({ images: clonedImages });
            }
        });
        this.setState({ error: null });
    };

    handleSendCatsPress = () => {
        this.props.addImages(this.state.images);
        // .then(() => {
        //     this.props.navigation.goBack();
        // })
        // .catch((error) => {
        //     if (__DEV__) {
        //         console.log(error);
        //     }
        //     this.setState({ error: 'Could not upload your cats 😿' });
        // });
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
                        {this.state.images.map((catImage) => (
                            <Image
                                style={styles.cat}
                                key={catImage.uri}
                                source={catImage}
                                resizeMode={'cover'}
                            />
                        ))}
                        <Button
                            text={'I have other cats! 😸'}
                            onPress={this.handleAddCatPress}
                        />
                        <Button
                            text={'Make my cats famous! 😼'}
                            onPress={this.handleSendCatsPress}
                        />
                    </View>
                }
                {this.state.error
                    ? <Text style={styles.error}>{this.state.error}</Text>
                    : null
                }
            </BasicContainer>
        );
    }
}

const styles = StyleSheet.create({
    error: {
        padding: 10,
        color: '#BB0000',
    },
    cat: {
        width: Dimensions.get('window').width - 20,
        height: 160,
        marginTop: 10,
    },
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addImages,
}, dispatch);

export default connect(
    () => ({}),
    mapDispatchToProps,
)(ImageAdd);
