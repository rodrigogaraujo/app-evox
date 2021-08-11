import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {colors} from '../global';
import SignIn from '../pages/SignIn';
import Recover from '../pages/Recover';

const Auth = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: colors.secondary},
      }}>
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="Recover" component={Recover} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
