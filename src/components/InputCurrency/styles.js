import styled, {css} from 'styled-components/native';
import CurrencyInput from 'react-native-currency-input';

import {colors, fonts} from '../../global';

export const Container = styled.View`
  width: 100%;
  align-items: center;
`;

export const Content = styled.View`
  width: 50%;
  flex-direction: row;
  padding: 0 16px;
  align-items: center;
  margin-bottom: 8px;
  height: 55px;

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

export const TextInput = styled(CurrencyInput)`
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

export const Text = styled.Text`
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.small};
  color: ${colors.osloGrey};
`;

export const ErrorText = styled.Text`
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.small};
  color: ${colors.error};
`;
