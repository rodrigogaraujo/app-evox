import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import AppRoutes from './app.routes';

import {useAuth} from '../hooks/Auth';

const Routes = () => {
  const {loading} = useAuth();
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AppRoutes />;
};

export default Routes;
