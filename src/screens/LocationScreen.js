//import '../_MockLocation';
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Call from '../components/Call';
import Map from '../components/Tracker';
//import useLocation from '../hooks/useLocation';

const LocationScreen = ({ isFocused }) => {
    //const [errorMsg] = useLocation(isFocused);

    return (
       <View style={styles.container}>
         <Image style={styles.img} source={require('../img/pinkpal.png')} /> 
         <Map />
         <Call />
       </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:5,
        alignItems: 'center',
        
    },
    img: {
        height: 70,
        width: 100
    }
});

export default LocationScreen;

//{errorMsg ? <Text>Please enable location services</Text> : null}


