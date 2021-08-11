import styled from 'styled-components/native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

import {colors, fonts} from '../../global';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.secondary};
  position: relative;
`;

export const Content = styled.View`
  flex: 1;
  padding: 15px;
  margin-top: 10px;
  width: ${width}px;
  background: ${colors.secondary};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding-bottom: 90px;
`;

export const ViewView = styled.View`
  width: 100%;
  min-height: 200px;
  position: relative;
  margin-top: 12px;
`;

export const InviteUser = styled.TouchableOpacity`
  background-color: ${colors.white};
  padding: 15px;
  width: 100%;
  border-radius: 12px;
  position: relative;
  flex-direction: row;
  margin-bottom: 12px;
`;

export const ViewDescription = styled.View`
  background-color: ${colors.white_correct};
  padding: 15px;
  width: 100%;
  border-radius: 12px;
  margin-top: 24px;
`;

export const InviteUserText = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.secondary};
  font-family: ${fonts.fontFamilyRegular};
  width: 90%;
  text-align: center;
`;

export const DateText = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.secondary};
  font-family: ${fonts.fontFamilyRegular};
  width: 90%;
  text-align: center;
`;

export const ViewScroll = styled.View`
  flex: 1;
  top: 11%;
  position: absolute;
  height: 100%;
`;

export const ViewComment = styled.View`
  width: 100%;
  padding: 10px;
  border-width: 2px;
  border-color: ${colors.primary};
  margin-top: 12px;
  border-radius: 6px;
`;

export const ScrollViewStyled = styled.ScrollView`
  flex: 1;
`;

export const ButtonIcon = styled.TouchableOpacity`
  position: absolute;
  top: 25%;
  right: 3%;
`;

export const Icon = styled(SimpleLineIcon)``;

export const CardAddPlace = styled.View``;

export const CreatePlaceButton = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  margin-bottom: 24px;
`;

export const CreatePlaceButtonText = styled.Text`
  color: ${colors.white};
  font-size: ${fonts.regular};
  font-family: ${fonts.fontFamilyRegular};
`;

export const ViewButtons = styled.View`
  flex-direction: row;
  margin-top: 50%;
  justify-content: space-between;
`;

export const ButtonOne = styled.TouchableOpacity`
  flex-basis: 48%;
  width: 48%;
  background-color: ${colors.primary};
  border-radius: 12px;
  padding: 15px;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  color: ${colors.white};
  font-size: ${fonts.regular};
  margin-top: 12px;
  font-family: ${fonts.fontFamilyRegular};
`;
