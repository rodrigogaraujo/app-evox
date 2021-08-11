import styled, {css} from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import {colors, fonts} from '../../global';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background-color: ${colors.primary};
  border-radius: 15px;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  ${(props) =>
    !props.active &&
    css`
      opacity: 0.5;
    `}
`;

export const ButtonText = styled.Text`
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.bigger};
  color: ${colors.secondary};
`;

export const Icon = styled(SimpleLineIcon)`
  position: absolute;
  top: 30%;
  left: 16px;
`;
