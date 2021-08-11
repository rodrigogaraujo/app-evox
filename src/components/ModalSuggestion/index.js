import React, {useCallback, useState} from 'react';
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';

import {colors} from '../../global';
import api from '../../services/api';
import {useAuth} from '../../hooks/Auth';
import Input from '../Input';

import {
  Container,
  Icon,
  MenuButton,
  Title,
  ButtonStyled,
  ButtonTextStyledTwo,
  ViewStyled,
} from './styles';

const ModalLoad = ({
  isModalVisible,
  setModalVisible,
  getItens,
  comment = false,
  suggestionId,
}) => {
  const {user, language} = useAuth();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const handleClose = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  const handleSave = useCallback(async () => {
    if (!suggestion) {
      return;
    }
    setLoading(true);
    if (comment) {
      await api.post('comments-suggestions', {
        description: suggestion,
        suggestion_id: suggestionId,
      });
    } else {
      await api.post('suggestions', {
        description: suggestion,
        user_id: user.id,
      });
    }
    setShowAlert(true);
    setLoading(false);
  }, [suggestion, user, comment, suggestionId]);

  return (
    <Modal isVisible={isModalVisible}>
      {loading ? (
        <ViewStyled>
          <Title>{language ? 'Wait, loading' : 'Aguarde, carregando..'}</Title>
        </ViewStyled>
      ) : (
        <Container contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
          <MenuButton onPress={handleClose}>
            <Icon name="close" size={25} color={colors.primary} />
          </MenuButton>
          <Input
            multiline={true}
            numberOfLines={4}
            placeholder={
              comment
                ? `${
                    language
                      ? 'Type your comment here'
                      : 'Digite seu comentário aqui'
                  }`
                : `${
                    language
                      ? 'Type your suggestion here'
                      : 'Digite sua sugestão aqui'
                  }`
            }
            onChangeText={(e) => setSuggestion(e)}
          />
          <ButtonStyled onPress={handleSave}>
            <ButtonTextStyledTwo>Enviar</ButtonTextStyledTwo>
          </ButtonStyled>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title={
              comment
                ? `${language ? 'Comment submitted' : 'Comentário enviado'}`
                : `${language ? 'Suggestion sent' : 'Sugestão enviada'}`
            }
            message={
              comment
                ? `${
                    language
                      ? 'Your comment has been sent to our database for moderation'
                      : 'Seu comentário foi enviado para nosso banco de dados, para nossa moderação'
                  }`
                : `${
                    language
                      ? 'Your suggestion has been sent to our database, for our moderation.'
                      : 'Sua sugestão foi enviada para nosso banco de dados, para nossa moderação.'
                  }`
            }
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            confirmText="Ok"
            confirmButtonColor={colors.primary}
            onConfirmPressed={() => {
              getItens();
              setShowAlert(false);
              handleClose();
            }}
          />
        </Container>
      )}
    </Modal>
  );
};

export default ModalLoad;
