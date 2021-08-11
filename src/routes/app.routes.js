import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {colors} from '../global';

import DrawerContent from '../components/Drawer';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import Recover from '../pages/Recover';
import Classes from '../pages/Classes';
import Suggestions from '../pages/Suggestions';
import SuggestionComments from '../pages/SuggestionComments';
import Tips from '../pages/Tips';
import Tip from '../pages/Tip';

const App = createStackNavigator();
let state = null;

const StackRoutes = (props) => {
  useEffect(() => {
    state = props;
  }, [props]);
  return (
    <App.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: colors.white},
        headerShown: false,
      }}
      // initialRouteName="WebView"
    >
      <App.Screen name="Home" component={Home} />
      <App.Screen name="Profile" component={Profile} />
      <App.Screen name="SignIn" component={SignIn} />
      <App.Screen name="Recover" component={Recover} />
      <App.Screen name="Classes" component={Classes} />
      <App.Screen name="Suggestions" component={Suggestions} />
      <App.Screen name="SuggestionComments" component={SuggestionComments} />
      <App.Screen name="Tips" component={Tips} />
      <App.Screen name="Tip" component={Tip} />
    </App.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      drawerContent={() => <DrawerContent state={state} />}>
      <Drawer.Screen name="Start" component={StackRoutes} />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
