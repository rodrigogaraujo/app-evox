import styled from 'styled-components';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {Checkbox} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {colors, fonts} from '../../global';

const ImageStyle = styled.Image``;

export const ImageUser = styled(ImageStyle).attrs({})`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

export const Container = styled.ScrollView`
  background: ${colors.secondary};
  padding: 20px 30px 50px 30px;
  border-radius: 15px;
`;

export const ViewStyled = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  max-height: 150px;
`;

export const MenuButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
`;

export const Icon = styled(SimpleLineIcon)``;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 8px 0;
  padding-left: 8px;
`;

export const CheckBoxStyled = styled(Checkbox)``;

export const TextCheckbox = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.grey};
  font-family: ${fonts.fontFamilyRegular};
  margin-left: 14px;
`;

export const ButtonStyled = styled.TouchableOpacity`
  width: 100%;
  padding: 14px 0;
  background-color: ${colors.primary};
  border-radius: 12px;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyBold};
  width: 100%;
  text-align: center;
  margin: 14px 0 8px 0;
`;

export const ButtonTextStyled = styled.Text`
  color: ${colors.white};
  width: 100%;
  text-align: center;
  font-family: ${fonts.fontFamilyBold};
  margin-top: 24px;
  margin-bottom: 12px;
`;

export const ButtonTextStyledTwo = styled.Text`
  color: ${colors.white};
  width: 100%;
  text-align: center;
  font-family: ${fonts.fontFamilyBold};
`;

export const ViewImage = styled.View`
  align-items: center;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  align-items: center;
`;

export const IconFont = styled(FontAwesome)``;

export const ModalSelection = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalCard = styled.View`
  background-color: ${colors.white};
  padding: 30px;
  border-radius: 12px;
`;

export const ModalTitle = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.secondary};
  font-family: ${fonts.fontFamilyBold};
  width: 100%;
  text-align: center;
`;

export const ModalButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-top: 24px;
`;

export const ModalOption = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ModalButtonText = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.secondary};
  font-family: ${fonts.fontFamilyRegular};
  width: 100%;
  text-align: center;
`;
