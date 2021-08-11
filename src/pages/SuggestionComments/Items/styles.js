import styled from 'styled-components';
import {colors, fonts} from '../../../global';

export const ViewStyled = styled.View`
  width: 100%;
  flex-direction: row;
  position: relative;
`;

export const ViewDescription = styled.View`
  background-color: ${colors.white_correct};
  padding: 15px;
  width: 100%;
  margin-bottom: 12px;
  border-radius: 12px;
  min-height: 100px;
`;

export const ViewDetails = styled.View`
  flex-direction: row;
  position: absolute;
  width: 100%;
  bottom: -22%;
  left: 4%;
  padding: 0 20px;
  align-items: center;
`;

export const Likes = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 10px 20px;
  border-radius: 12px;
`;

export const Comments = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 10px 20px;
  margin-left: auto;
  border-radius: 12px;
`;

export const TextLikes = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.white};
  font-family: ${fonts.fontFamilyRegular};
`;

export const TextDescription = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.osloGrey};
  font-family: ${fonts.fontFamilyRegular};
`;
