import styled from 'styled-components/native';

const ImageStyle = styled.Image``;

export const Logo = styled(ImageStyle).attrs({
  source: require('./assets/logowhite.png'),
  resizeMode: 'contain',
})`
  width: 100%;
  height: 100px;
  margin-bottom: 100px;
`;
