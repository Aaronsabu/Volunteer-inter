import React, {useState, useEffect} from 'react';
import { StatusBar, View, Text, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import {Input, Button} from 'react-native-elements';
import { auth } from '../firebase/config';
import NavLink from '../components/NavLinks';
import { navigate } from '../navigationRef';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigate('Default');
        console.log("Success");
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  LoginScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };
  

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/pinkpal.png')}
        style={{width: 300, height: 150}}
      />
      <View style={styles.inputContainer}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChangeText={text => { setEmail(text) }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          label="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={password => { setPassword(password) }}
          onSubmitEditing={signIn}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Button containerStyle={styles.button} title="Login" onPress={signIn} />

      <NavLink 
        text="Don't have an account? Sign up instead"
        routeName="Register"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    width: 200,
    marginTop: 30,
  },
  inputContainer: {
    width: 300,
  },
});

export default LoginScreen;