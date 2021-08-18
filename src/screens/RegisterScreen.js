import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import NavLink from '../components/NavLinks';
import globalStyles from '../style/globalStyles';
import { auth } from '../firebase/config';
import {userCred} from '../firebase/config';
import { navigate } from '../navigationRef';

const RegisterScreen = () => {
  const [credentials, setcredentials] = useState({
    name: '',
    number: '',
    aadhaar:'',
    email: ''
  });

  //console.log("Aadhaar number is " +credentials.aadhaar);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let userId;

  console.log("id : "+userId)

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        userId = authUser.user.uid;
        console.log("ID IS "+userId);
        authUser.user.updateProfile({
          displayName: credentials.name
        });
        //handleUserCreated(authUser.user.uid);
      })
      .catch((error) => alert(error.message));
      navigate("Default");
  };
  console.log("Unique id is " +userId);
  
  return (
    <SafeAreaView style={globalStyles.androidSafeArea}>
     
      <Text h3 style={styles.txt}>
        Create a PinkPal-Volunteer account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={credentials.name}
          onChangeText={text => setcredentials({...credentials,name: text})}
        />
        <Input
          placeholder="Mobile Number"
          autoFocus
          keyboardType="number-pad"
          value={credentials.number}
          onChangeText={text => setcredentials({...credentials,number: text})}
        />
        <Input
          placeholder="Aadhaar Number"
          autoFocus
          keyboardType="number-pad"
          value={credentials.aadhaar}
          onChangeText={text => setcredentials({...credentials,aadhaar: text})}
        />
        <Input
          placeholder="Email"
          type="email"
          value={credentials.email}
          onChangeText={text => {
            setcredentials({...credentials,email: text});
            setEmail(text);
            }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={text => setPassword(text)}
          onSubmitEditing={register}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Button
       raised
       containerStyle={styles.button}
       title="Register"
       onPress={() =>{ register();
        userCred(credentials);
        }}
      />

      <NavLink 
        text="Already have an account? Login instead!"
        routeName="Login"
      />
    </SafeAreaView>
  );
};

RegisterScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  txt: {
    marginBottom: 50,
    
  },
  button: {
    width: 200,
    marginTop: 30,
  },
  inputContainer: {
    width: 300,
  },
});

export default RegisterScreen