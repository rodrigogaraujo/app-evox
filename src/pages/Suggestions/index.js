/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {Alert} from 'react-native';

import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Modal from '../../components/ModalSuggestion';
import api from '../../services/api';
import {colors} from '../../global';
import {useAuth} from '../../hooks/Auth';
import Items from './Items';

import {
  Container,
  FlatListStyled,
  ViewScroll,
  Content,
  ButtonOne,
  Icon,
  TextButton,
} from './styles';

const Suggestions = (props) => {
  const {language} = useAuth();
  const {goBack} = props.navigation;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const getItens = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('suggestions-status');
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
          <ButtonOne onPress={() => setModalVisible(true)}>
            <Icon name="speech" size={25} color={colors.white} />
            <TextButton>
              {' '}
              {language ? 'New suggestion' : 'Nova sugestão'}
            </TextButton>
          </ButtonOne>
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
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        getItens={getItens}
      />
    </Container>
  );
};

export default Suggestions;
