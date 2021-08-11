import styled, {css} from 'styled-components/native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputMask from 'react-native-text-input-mask';

import {colors, fonts} from '../../global';

export const Container = styled.View`
  width: 100%;
  align-items: center;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 0 16px;
  align-items: center;
  margin-bottom: 8px;
  min-height: 55px;

  border-bottom-width: 2px;
  border-bottom-color: ${colors.grey};
  ${(props) =>
    props.password &&
    css`
      padding-right: 5px;
    `};
  ${(props) =>
    props.isFocused &&
    css`
      border-bottom-color: ${colors.primary};
    `};
  ${(props) =>
    props.error &&
    css`
      border-bottom-color: ${colors.red};
    `};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.regular};
  color: ${colors.primary};
  ${(props) =>
    props.textAlign &&
    css`
      text-align: center;
    `};
`;

export const TextInputM = styled(TextInputMask)`
  flex: 1;
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.regular};
  color: ${colors.primary};
  ${(props) =>
    props.textAlign &&
    css`
      text-align: center;
    `};
`;

export const Icon = styled(SimpleLineIcon)`
  margin-right: 16px;
`;

export const ErrorText = styled.Text`
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.small};
  color: ${colors.error};
`;
