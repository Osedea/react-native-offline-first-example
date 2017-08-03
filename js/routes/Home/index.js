
import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BasicContainer from 'DoOfflineFirstApps/js/components/BasicContainer';
import Button from 'DoOfflineFirstApps/js/components/Button';
import { getImages } from 'DoOfflineFirstApps/js/services/Images/actions';
import { Image } from 'DoOfflineFirstApps/js/services/Images/types';

import CatImage from 'DoOfflineFirstApps/js/components/CatImage';

type Props = {
    getImages: Function,
    images: [Image],
};

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const goToAdd = () => navigation.navigate('ImageAdd');

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

    props: Props;

    handleGetMorePress = () => {
        this.props.getImages();
    };

    _extractKey = (item) => item.id;

    _renderItem = (item) => (
        <CatImage
            {...item}
        />
    );

    render() {
        return (
            <BasicContainer>
                {this.props.images.length
                    ? <FlatList
                        renderItem={this._renderItem}
                        keyExtractor={this._extractKey}
                        data={this.props.images}
                        footerComponent={(
                            <Button
                                onPress={this.handleGetMorePress}
                                text={'Get some more 😻 by pressing me!'}
                            />
                        )}
                    />
                    : <Button
                        onPress={this.handleGetMorePress}
                        text={'Get some 😺 by pressing me!'}
                    />
                }
            </BasicContainer>
        );
    }
}

const mapStateToProps = (state) => ({
    images: state.Images,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getImages,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
    rightHeaderText: {
        padding: 5,
        backgroundColor: 'transparent',
    },
});
