import React, { Component } from 'react';
import { Text, Image, View, KeyboardAvoidingView, TouchableWithoutFeedback, ImageBackground, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import qwala from 'qwala';
import styles from './styles.js';

export default class QwalaView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            longLink: '',
            error: '',
            isPressed: false,
            isShortened: false,
        };
    }

    render() {
        return (
            <ImageBackground
                style={styles.qwalaViewContainer}
                source={require('./res/background-image.png')}
            >
                <KeyboardAvoidingView
                    behavior="position"
                    style={styles.qwalaViewInnerContainer}
                >
                    <View style={styles.qwalaViewKoalaLogoContainer}>
                        <Image
                            source={require('./res/koala-logo-white.png')}
                            style={styles.qwalaViewKoalaLogo}
                        />
                    </View>
                    <Text style={[styles.qwalaViewFont, styles.qwalaViewTitle]}>
                        Qwa.la
                    </Text>
                    <Text style={[styles.qwalaViewFont, styles.qwalaViewSubtitle]}>
                        link shortening done right
                    </Text>
                    <View style={styles.qwalaViewTextInputContainer}>
                        <TextInput
                            autoCapitalize='none'
                            autoComplete='off'
                            autoCorrect={false}
                            keyboardType="url"
                            placeholder="Enter your link. . ."
                            style={styles.qwalaViewTextInput}
                            onChangeText={(longLink) => {
                                this.setState({
                                    longLink,
                                    error: '',
                                    isShortened: false,
                                });
                            }}
                            value={this.state.longLink}
                        />
                    </View>
                    {this.state.isShortened ? null : this.getButtonContainer()}
                    <Text style={styles.qwalaViewError}>
                        {this.state.error}
                    </Text>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }

    getButtonContainer() {
        return (
            <View style={styles.qwalaViewButtonContainer}>
                <TouchableWithoutFeedback
                    onPressIn={() => { this.onButtonPressIn(); }}
                    onPressOut={() => { this.onButtonPressOut(); }}
                    onPress={() => { this.onButtonPress(); }}
                >
                    <LinearGradient
                        style={styles.qwalaViewButton}
                        colors={
                            this.state.isPressed ? ['#26A74A', '#1CE277'] : ['#1CE277', '#26A74A']
                        }
                    >
                        <Text style={styles.qwalaViewButtonText}>
                            Shorten!
                        </Text>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    onButtonPressIn() {
        this.setState({ isPressed: true });
    }

    onButtonPressOut() {
        this.setState({ isPressed: false });
    }

    onButtonPress() {
        if (!this.state.longLink) {
            return;
        }


        fetch('https://qwa.la/api/shorten/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                longLink: this.state.longLink,
            }),
        }).then((res) => {
            return Promise.all([res.status, res.json()]);
        }).then((values) => {
            if (values[0] === 200) {
                this.setState({
                    longLink: 'https://qwa.la/' + values[1].shortLinkID,
                    error: '',
                    isShortened: true,
                });
            } else {
                this.setState({
                    error: values[1].error,
                    isShortened: false,
                });
            }
        }).catch((error) => {
            console.log('3', error);
            this.setState({
                error: 'An unexpected error occurred. Please check your connection and try again.',
                isShortened: false,
            });
        });
    }
}
