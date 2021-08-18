import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
});