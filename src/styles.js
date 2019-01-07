import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    qwalaWebViewContainer: {
        flex: 1,
    },
    qwalaWebView: {
        flex: 1,
    },
    qwalaWebViewLoadingContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qwalaWebViewLoadingImage: {
        maxWidth: '50%',
        maxHeight: '50%',
    },
});
