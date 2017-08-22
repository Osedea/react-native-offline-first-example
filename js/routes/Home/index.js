// @flow
import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ConnectivityRenderer } from 'react-native-offline';

import BasicContainer from 'DoOfflineFirstApps/js/components/BasicContainer';
import Button from 'DoOfflineFirstApps/js/components/Button';
import { getImages, toggleLike } from 'DoOfflineFirstApps/js/services/Images/actions';
import { selectImages, selectErroredImages } from 'DoOfflineFirstApps/js/services/Images/selectors';
import type { CatImage as CatImageType, Navigation } from 'DoOfflineFirstApps/js/types';

import CatImage from 'DoOfflineFirstApps/js/components/CatImage';

type Props = {
    getImages: () => void,
    images: [CatImageType],
    erroredImages: [CatImageType],
    onLikePress: () => void,
};

class HomeScreen extends Component<void, Props, void> {
    static navigationOptions = ({
        navigation,
    }: {
        navigation: Navigation,
    }): ReactElement<*> => {
        const goToAdd = (): void => navigation.navigate('ImageAdd');

        return {
            title: 'Cats',
            headerRight: (
                <Button
                    onPress={goToAdd}
                    text={'Add a 🐈'}
                    style={styles.rightHeaderText}
                    noShadow
                />
            ),
        };
    };

    static defaultProps = {
        images: [],
    };

    handleGetMorePress = () => {
        this.props.getImages();
    };

    handleErroredImagesPress = () => {
        this.props.navigation.navigate('ErroredImages');
    };

    createCatImagePressHandler = (catImage: CatImageType) => () => {
        this.props.navigation.navigate('ImageDetail', catImage);
    };

    _extractKey = (item: CatImageType): string => item.uri;

    _renderItem = ({ item }: { item: CatImageType }): ReactElement<*> => (
        <CatImage
            {...item}
            onPress={this.createCatImagePressHandler(item)}
            onLikePress={this.props.onLikePress}
        />
    );

    render() {
        return (
            <BasicContainer>
                <FlatList
                    renderItem={this._renderItem}
                    keyExtractor={this._extractKey}
                    data={this.props.images}
                    headerComponent={
                        this.props.erroredImages
                        && this.props.erroredImages.length
                            ? <Button
                                onPress={this.handleErroredImagesPress}
                                text={'Some images failed to upload 😿'}
                            />
                            : null
                    }
                    ListEmptyComponent={(
                        <ConnectivityRenderer>
                            {(isConnected: boolean) => (
                                isConnected
                                    ? (
                                        <Button
                                            onPress={this.handleGetMorePress}
                                            text={'Get some 😺 by pressing me!'}
                                        />
                                    )
                                    : (
                                        <Text>
                                            {`You're offline! 🙀 Get back online to get some goodness!`}
                                        </Text>
                                    )
                            )}
                        </ConnectivityRenderer>
                    )}
                    footerComponent={this.props.images.length
                        ? <Button
                            onPress={this.handleGetMorePress}
                            text={'Get some more 😻 by pressing me!'}
                        />
                        : null
                    }
                />
            </BasicContainer>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    images: selectImages(),
    erroredImages: selectErroredImages(),
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getImages,
            onLikePress: toggleLike,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const colors = { background: 'transparent' };
const styles = StyleSheet.create({
    rightHeaderText: {
        padding: 5,
        backgroundColor: colors.background,
    },
});
