import React, {useEffect, useState, useRef} from 'react';
import 'react-native-gesture-handler';
import {View, StatusBar, Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';

import AppProvider from './hooks';
import Routes from './routes';
import {colors} from './global';
import {Logo} from './styles';

// import { Container } from './styles';
const App = () => {
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
    }).start();
  }, [fadeAnim]);

  if (loading) {
    return (
      <Animated.View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.secondary,
          opacity: fadeAnim,
        }}>
        <Logo />
      </Animated.View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <AppProvider>
        <Provider>
          <View style={{flex: 1, backgroundColor: colors.secondary}}>
            <Routes />
          </View>
        </Provider>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
