import styled from 'styled-components/native';

import {colors, fonts} from '../../global';

const ImageStyle = styled.Image``;

export const Container = styled.View`
  padding-top: 40px;
  flex: 1;
  background-color: ${colors.secondary};
`;

export const Content = styled.View`
  flex: 1;
  padding: 30px;
`;

export const TextError = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.error};
  font-family: ${fonts.fontFamilyRegular};
`;

export const Logo = styled(ImageStyle).attrs({
  source: require('../../assets/logowhite.png'),
  resizeMode: 'contain',
})`
  width: 100%;
  height: 100px;
  margin-bottom: 80px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 12px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.grey};
  font-family: ${fonts.fontFamilyRegular};
  width: 100%;
  text-align: center;
`;

export const CreateAccount = styled.TouchableOpacity`
  margin-top: 50px;
  margin-bottom: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CreateAccountText = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.grey};
  font-family: ${fonts.fontFamilyRegular};
  margin-left: 16px;
`;
