import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const AuthContext = createContext({});

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whitin an AuthProvider');
  }

  return context;
}

export const AuthProvider = ({children}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(false);
  const [languageData, setLanguageData] = useState(false);

  const loadStoragedData = useCallback(async () => {
    const [token, user, language] = await AsyncStorage.multiGet([
      '@academyTestApp:token',
      '@academyTestApp:user',
      '@academyTestApp:language',
    ]);
    if (token[1] && user[1] && language[1]) {
      api.defaults.headers.authorization = `Bearer ${token[1]}`;
      setData({token: token[1], user: JSON.parse(user[1])});
      setLanguageData(true);
    }
    if (token[1] && user[1]) {
      api.defaults.headers.authorization = `Bearer ${token[1]}`;
      setData({token: token[1], user: JSON.parse(user[1])});
      setLanguageData(false);
    }
    if (language[1]) {
      setLanguageData(true);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadStoragedData();
  }, [loadStoragedData]);

  useEffect(() => {
    if (data.user && !data.user.name) {
      setProfile(false);
    } else {
      setProfile(true);
    }
  }, [data]);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@academyTestApp:token',
      '@academyTestApp:user',
      '@academyTestApp:language',
    ]);
    setData({});
  }, []);

  const updateLanguage = useCallback(async () => {
    const [language] = await AsyncStorage.multiGet([
      '@academyTestApp:language',
    ]);

    if (language[1]) {
      setLanguageData(true);
    } else {
      setLanguageData(false);
    }

    setLoading(false);
  }, []);

  const updateUser = useCallback(
    async (user) => {
      if (user.password === '' || user.password === null) {
        delete user.password;
      }
      const response = await api.put(`/users/${data.user.id}`, {
        ...user,
      });
      setData({user: {...response.data}, token: data.token});
      await AsyncStorage.multiSet([
        ['@academyTestApp:user', JSON.stringify(response.data)],
      ]);
    },
    [data],
  );
  const setUser = useCallback(
    async (user) => {
      setData({user, token: data.token});
      await AsyncStorage.multiSet([
        ['@academyTestApp:user', JSON.stringify(user)],
      ]);
    },
    [data],
  );

  const signIn = useCallback(async ({email, password}) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const {token, user} = response.data;

    api.defaults.headers.authorization = `Bearer ${token.token}`;

    await AsyncStorage.multiSet([
      ['@academyTestApp:token', token.token],
      ['@academyTestApp:user', JSON.stringify(user)],
    ]);
    setData({token, user});
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        profile,
        signIn,
        signOut,
        loading,
        setUser,
        updateUser,
        token: data.token,
        language: languageData,
        updateLanguage,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
