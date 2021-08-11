import styled from 'styled-components';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {Checkbox} from 'react-native-paper';

import {colors, fonts} from '../../global';

export const Container = styled.ScrollView`
  background: ${colors.secondary};
  padding: 20px 30px 50px 30px;
  border-radius: 15px;
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
`;

export const ViewCep = styled.View``;
