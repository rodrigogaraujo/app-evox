import React from 'react';
import Modal from 'react-native-modal';
import {colors} from '../../global';

import {Container, Icon, MenuButton, Title} from './styles';

const ModalInfo = ({isModalVisible, setModalVisible, text}) => {
  return (
    <Modal isVisible={isModalVisible}>
      <Container contentContainerStyle={{paddingBottom: 40}}>
        <MenuButton onPress={() => setModalVisible(false)}>
          <Icon name="close" size={25} color={colors.primary} />
        </MenuButton>
        <Title>{text}</Title>
      </Container>
    </Modal>
  );
};

export default ModalInfo;
