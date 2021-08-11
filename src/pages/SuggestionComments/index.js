/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {Alert} from 'react-native';

import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Modal from '../../components/ModalSuggestion';
import api from '../../services/api';
import {colors} from '../../global';
import Items from './Items';
import {useAuth} from '../../hooks/Auth';

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
  const {suggestion} = props.route.params;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const getItens = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`suggestions/${suggestion}`);
      if (response.data) {
        setData(response.data);
        console.log(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      Alert.alert('Ocorreu um erro.');
    }
  }, [suggestion]);

  useEffect(() => {
    getItens();
  }, [getItens, suggestion]);

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
              {language ? 'New comment' : 'Novo comentário'}
            </TextButton>
          </ButtonOne>
          <FlatListStyled
            showsVerticalScrollIndicator={false}
            data={data && data.comments ? data.comments : []}
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
        comment={true}
        suggestionId={suggestion}
      />
    </Container>
  );
};

export default Suggestions;
