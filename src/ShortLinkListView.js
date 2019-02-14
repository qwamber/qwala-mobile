import React, { Component } from 'react';
import { Text, Image, View, AsyncStorage, FlatList, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import qwala from 'qwala';
import styles from './styles.js';

export default class ShortLinkListView extends Component {
    static navigationOptions = {
        title: 'Statistics',
    };

    constructor(props) {
        super(props);
        this.state = {
            shortLinkIDs: [],
            loading: true,
        };
    }

    async componentDidMount() {
        await this.reloadList();

        this.props.navigation.addListener('didFocus', () => {
            this.reloadList();
        });
    }

    async reloadList() {
        try {
            let savedShortLinkIDs = await AsyncStorage.getItem('@Qwala:savedShortLinkIDs');
            let savedShortLinkIDsArray = savedShortLinkIDs ? JSON.parse(savedShortLinkIDs) : [];
            this.setState({
                shortLinkIDs: savedShortLinkIDsArray.reverse(),
                loading: false,
            });
        } catch (error) {
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.shortLinkListDescription}>
                    Choose the link to see statistics for.
                </Text>
                {
                    this.state.loading
                        ? this.getLoadingMessage()
                        : (
                            (this.state.shortLinkIDs.length > 0)
                                ? this.getFlatList()
                                : this.getEmptyMessage()
                        )
                }
            </View>
        );
    }

    getFlatList() {
        return (
            <FlatList
                style={styles.shortLinkList}
                data={this.state.shortLinkIDs}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            onPress={() => { this.onPressLink(item[0]); }}
                            style={styles.shortLinkListCell}
                        >
                            <View>
                                <Text style={styles.shortLinkListTitle}>qwa.la/{item[0]}</Text>
                                <Text style={styles.shortLinkListText}>{item[1]}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }

    getLoadingMessage() {
        return (
            <Text style={styles.shortLinkListMessage}>
                Loading links...
            </Text>
        )
    }

    getEmptyMessage() {
        return (
            <Text style={styles.shortLinkListMessage}>
                You haven't shortened any links yet! Go to the "Shorten" page
                to shorten some.
            </Text>
        )
    }

    onPressLink(shortLinkID) {
        this.props.navigation.push('WebView', { shortLinkID });
    }
}
