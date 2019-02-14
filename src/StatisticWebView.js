import React, { Component } from 'react';
import { Text, Image, WebView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles.js';

export default class StatisticWebView extends Component {
    static navigationOptions = {
        title: 'Statistics',
        headerTintColor: '#644AB2',
        headerTitleStyle: {
            color: '#000000'
        }
    };

    render() {
        return (
            <WebView
                source={{uri: 'https://qwa.la/@' + this.props.navigation.getParam('shortLinkID')}}
                renderLoading={() => (
                    <Text style={styles.webViewMessage}>
                        Loading...
                    </Text>
                )}
                renderError={() => (
                    <Text style={styles.webViewMessage}>
                        Statistics cannot be loaded at this time. Please check
                        your internet connection and try again.
                    </Text>
                )}
            />
        );
    }
}
