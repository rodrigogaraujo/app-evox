import styled from 'styled-components/native';

import {colors, fonts} from '../../global';

const ImageStyle = styled.Image``;

export const Container = styled.View`
  background-color: ${colors.secondary};
  flex: 1;
  padding: 0 12px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${colors.white_correct};
  background-color: ${colors.secondary};
`;

export const HeaderImage = styled.View`
  flex-basis: 30%;
`;

export const HeaderImageView = styled.View`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  border-width: 2px;
  border-color: ${colors.white_correct};
  margin-left: 10px;
`;

export const ImageUser = styled(ImageStyle).attrs({})`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const HeaderTexts = styled.View`
  flex-basis: 75%;
`;

export const HeaderTitle = styled.Text`
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.regular};
  color: ${colors.primary};
`;

export const Content = styled.View`
  margin-top: 12px;
  margin-left: 12px;
  width: 100%;
  padding-bottom: 180px;
`;

export const RowContent = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  flex-direction: row;
  margin-bottom: 12px;
  margin-top: 8px;
`;

export const ContentTitle = styled.Text`
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.regular};
  color: ${colors.white_correct};
  margin: 8px 0;
`;

export const ContentText = styled.Text`
  font-family: ${fonts.fontFamilyRegular};
  font-size: ${fonts.regular};
  color: ${colors.primary};
  margin-left: 12px;
`;
