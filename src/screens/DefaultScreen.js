import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../firebase/config";
import { navigate } from '../navigationRef';

const DefaultScreen = ({ navigation }) => {

    const signOutUser = () => {
        auth.signOut().then(() => {
          navigate("Login");
        });
      };

    return <View style={styles.container}>
        <TouchableOpacity onPress={signOutUser}>
          <Ionicons name="person" size={26} color="#d41568" />
        </TouchableOpacity>
        <Image style={styles.img} source={require('../img/pinkpal.png')} />
        <Text style={styles.txt}>Thank you for being a PinkPal volunteer.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Alert')}>
            <Text style={styles.Buttontext}>Press</Text>
        </TouchableOpacity>
               
    </View>
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 8,
        marginTop: 5
    },
    img: {
        marginLeft: 25,
        marginTop: 15
    },
    txt: {
        color: '#d41568',
        fontSize: 18,
        textAlign: 'center'
    },
    Buttontext: {
        color: '#d41568',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 30
    }
});

export default DefaultScreen;