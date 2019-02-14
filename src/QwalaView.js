import React, { Component } from 'react';
import { Text, Image, View, AsyncStorage, KeyboardAvoidingView, TouchableWithoutFeedback, ImageBackground, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles.js';

export default class QwalaView extends Component {
    static navigationOptions = {
        tabBarLabel: 'Shorten',
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return <Image
                source={require('./res/koala-icon.png')}
                style={{ width: 25, height: 25, tintColor, resizeMode: 'contain' }}
            />
        }
    };

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
        }).then(async (values) => {
            if (values[0] === 200) {
                try {
                    let savedShortLinkIDs = await AsyncStorage.getItem('@Qwala:savedShortLinkIDs');
                    let savedShortLinkIDsArray = savedShortLinkIDs ? JSON.parse(savedShortLinkIDs) : [];
                    let newSavedArray = savedShortLinkIDsArray.concat([
                        [values[1].shortLinkID, this.state.longLink]
                    ]);
                    await AsyncStorage.setItem('@Qwala:savedShortLinkIDs', JSON.stringify(newSavedArray));
                } catch (error) {
                }

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
