import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DefaultScreen from './src/screens/DefaultScreen';
import AlertScreen from './src/screens/AlertScreen';
import LocationScreen from './src/screens/LocationScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Register: RegisterScreen,
    Login: LoginScreen
  }),
  mainFlow: createStackNavigator({
    Default: DefaultScreen,
    Alert: AlertScreen,
    Location: LocationScreen
  })  
});

// const navigator = createStackNavigator({
//   Default: DefaultScreen,
//   Alert: AlertScreen,
//   Location: LocationScreen,
// }, {
//   initialRouteName: 'Default',
//   defaultNavigationOptions: {
//     title: 'Volunteers'
//   }
// });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
      <App ref={(navigator) => { setNavigator(navigator) }} /> 
  );
};

