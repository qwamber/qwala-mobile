import React, { Component } from 'react';
import { WebView, Image, View, Animated } from 'react-native';
import styles from './styles.js';

export default class QwalaWebView extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentWebViewFadeOpacity: new Animated.Value(0),
            currentImageFadeOpacity: new Animated.Value(1),
        };
    }

    render() {
        // The image prevents interaction with the `WebView`, so it needs to
        // be removed completely when the animation is done, not just set to
        // opacity 0.
        let loadingImageView;
        if (this.state.currentImageFadeOpacity > 0) {
            loadingImageView = (
                <View style={styles.qwalaWebViewLoadingContainer}>
                    <Animated.Image
                        source={require('./res/koala-logo.png')}
                        style={{
                            ...styles.qwalaWebViewLoadingImage,
                            opacity: this.state.currentImageFadeOpacity,
                        }}
                        resizeMode='contain'
                    />
                </View>
            );
        }

        return (
            <View style={styles.qwalaWebViewContainer}>
                <Animated.View
                    style={{
                        ...styles.qwalaWebViewContainer,
                        opacity: this.state.currentWebViewFadeOpacity
                    }}
                >
                    <WebView
                        source={{ uri: 'http://mobile.qwa.la' }}
                        style={styles.qwalaWebView}
                        scrollEnabled={false}
                        bounces={false}
                        scalesPageToFit={false}
                        onLoad={() => {
                            Animated.sequence([
                                Animated.timing(
                                    this.state.currentImageFadeOpacity,
                                    {
                                        toValue: 0,
                                        duration: 1000,
                                    },
                                ),
                                Animated.timing(
                                    this.state.currentWebViewFadeOpacity,
                                    {
                                        toValue: 1,
                                        duration: 1000,
                                    },
                                ),
                            ]).start();
                        }}
                    />
                </Animated.View>
                {loadingImageView}
            </View>
        );
    }
}
