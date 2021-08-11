import React from 'react';

import {AuthProvider} from './Auth';
import {PlacesProvider} from './Places';

const AppProvider = ({children}) => {
  return (
    <AuthProvider>
      <PlacesProvider>{children}</PlacesProvider>
    </AuthProvider>
  );
};

export default AppProvider;
