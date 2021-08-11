import styled from 'styled-components/native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import {colors, fonts} from '../../global';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  padding: 30px 15px 120px 15px;
  background-color: ${colors.primary};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  flex-direction: row;
`;

export const MenuButton = styled.TouchableOpacity`
  width: 50px;
`;

export const TextStyled = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.white};
  font-family: ${fonts.fontFamilyRegular};
`;

export const Icon = styled(SimpleLineIcon)``;
