import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

const PlacesContext = createContext({});

const PlacesProvider = ({children}) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        setLoading(true);
        const [token, user] = await AsyncStorage.multiGet([
          '@cocalApp:token',
          '@cocalApp:user',
        ]);
        if (token[1] && user[1]) {
          api.defaults.headers.authorization = `Bearer ${token[1]}`;
        }

        const resp = await api.get('company');
        setCompanies(resp.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    getData();
  }, []);

  const getCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await api.get('company');
      setCompanies(resp.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, []);

  const addNewPlace = useCallback(
    (company) => {
      setCompanies([...companies, company]);
    },
    [companies],
  );

  const editPlace = useCallback(
    (company) => {
      const constOldCompanies = companies.filter(
        (cmp) => cmp.id !== company.id,
      );
      setCompanies([...constOldCompanies, company]);
    },
    [companies],
  );

  const removePlace = useCallback(
    (company) => {
      const constOldCompanies = companies.filter(
        (cmp) => cmp.id !== company.id,
      );
      setCompanies([...constOldCompanies]);
    },
    [companies],
  );

  return (
    <PlacesContext.Provider
      value={{
        companies,
        loading,
        addNewPlace,
        editPlace,
        removePlace,
        getCompanies,
      }}>
      {children}
    </PlacesContext.Provider>
  );
};

function usePlaces() {
  const context = useContext(PlacesContext);

  if (!context) {
    throw new Error('UseAuth must be used whitin an PlacesContext');
  }

  return context;
}

export {PlacesProvider, usePlaces};
