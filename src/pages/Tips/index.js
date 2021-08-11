/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {Alert} from 'react-native';

import Loading from '../../components/Loading';
import Header from '../../components/Header';
import api from '../../services/api';
import Items from './Items';

import {Container, FlatListStyled, ViewScroll, Content} from './styles';

const Tips = (props) => {
  const {goBack} = props.navigation;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getItens = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('tips');
      if (response.data && response.data.length) {
        setData(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      Alert.alert('Ocorreu um erro.');
    }
  }, []);

  useEffect(() => {
    getItens();
  }, [getItens]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Header action={() => goBack()} icon="arrow-left" />
      <ViewScroll>
        <Content>
          <FlatListStyled
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => (
              <Items item={item} onPress={() => {}} key={item.id} />
            )}
            keyExtractor={(value) => value.id}
          />
        </Content>
      </ViewScroll>
    </Container>
  );
};

export default Tips;
