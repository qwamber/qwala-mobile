import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    qwalaViewContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },
    qwalaViewInnerContainer: {
        marginTop: 200,
        width: '100%',
        padding: 0,
        margin: 0,
    },
    qwalaViewFont: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'Mont',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {
            width: 0,
            height: 4,
        },
        textShadowRadius: 4,
    },
    qwalaViewTitle: {
        marginTop: 20,
        marginBottom: 0,
        fontSize: 50,
    },
    qwalaViewSubtitle: {
        marginTop: -10,
        marginBottom: 0,
        fontSize: 20,
    },
    qwalaViewKoalaLogoContainer: {
        marginBottom: 0,
        height: '23%',
        width: '100%',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        padding: 3,
    },
    qwalaViewKoalaLogo: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    qwalaViewButtonContainer: {
        marginTop: 20,
        width: '100%',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        alignItems: 'center',
    },
    qwalaViewTextInputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    qwalaViewTextInput: {
        marginTop: 20,
        height: 40,
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        paddingHorizontal: 20,
        fontSize: 20,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
    },
    qwalaViewButtonContainer: {
        width: '100%',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
    },
    qwalaViewButton: {
        width: '40%',
        height: 50,
        marginTop: 20,
        paddingTop: 17,
        borderRadius: 6,
    },
    qwalaViewButtonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Mont',
    },
    qwalaViewError: {
        color: '#FFFFFF',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 20,
        textShadowColor: 'rgba(255, 0, 0, 0.5)',
        textShadowOffset: {
            width: 0,
            height: 1,
        },
        textShadowRadius: 1,
    }
});
