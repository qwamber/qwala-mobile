import { createStackNavigator, createAppContainer } from "react-navigation";
import React, { Component } from 'react';
import { Image } from 'react-native';
import ShortLinkListView from './ShortLinkListView.js';
import StatisticWebView from './StatisticWebView.js';

let StatisticNavigator = createStackNavigator({
    ListView: {
        screen: ShortLinkListView,
    },
    WebView: {
        screen: StatisticWebView,
    },
});

StatisticNavigator.navigationOptions = () => ({
    title: 'Statistics',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <Image
            source={require('./res/stats-icon.png')}
            style={{ width: 25, height: 25, tintColor, resizeMode: 'contain' }}
        />
    }
})

export default StatisticNavigator;
