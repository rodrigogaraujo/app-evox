import styled from 'styled-components/native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';

import {colors, fonts} from '../../global';
const {width} = Dimensions.get('window');

const ImageStyle = styled.Image``;
export const Container = styled.View`
  flex: 1;
  background-color: ${colors.secondary};
  position: relative;
`;

export const Content = styled.View`
  flex: 1;
  padding: 30px 0;
  width: ${width}px;
  padding-bottom: 40px;
`;

export const MenuButton = styled.TouchableOpacity`
  z-index: 10000;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
`;

export const ContainerHeader = styled.View`
  width: 100%;
  background-color: ${colors.secondary};
  justify-content: center;
  padding: 30px 15px 30px 15px;
  justify-content: space-between;
  flex-direction: row;
  z-index: 3;
`;

export const ScrollViewStyled = styled.ScrollView`
  flex: 1;
  position: absolute;
  margin: auto;
  height: 100%;
  z-index: 2;
`;

export const Icon = styled(SimpleLineIcon)``;

export const IconFont = styled(FontAwesome)``;

export const HeaderProfile = styled.View`
  width: ${width}px;
  align-items: center;
  justify-content: center;
  padding: 0 0 40px 0;
  border-bottom-left-radius: 45px;
  border-bottom-right-radius: 45px;
  z-index: 999;
  background-color: ${colors.secondary};
`;

export const HeaderImage = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-color: ${colors.white};
`;

export const ImageUser = styled(ImageStyle).attrs({})`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

export const HeaderName = styled.Text`
  font-size: ${fonts.biggerTwo};
  margin-top: 24px;
  color: ${colors.white};
  font-family: ${fonts.fontFamilyBold};
  text-align: center;
`;

export const HeaderCity = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.osloGrey};
  font-family: ${fonts.fontFamilyRegular};
  text-align: center;
  margin-top: 8px;
`;

export const DetailsProfile = styled.View`
  flex-wrap: wrap;
  width: ${width}px;
  background: ${colors.white};
  top: ${({spacing}) => (spacing ? '26%' : '30%')};
  padding: 60px 20px 40px 20px;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 45px;
  border-bottom-right-radius: 45px;
`;

export const NoInfo = styled.Text`
  font-size: ${fonts.bigger};
  color: ${colors.secondary};
  font-family: ${fonts.fontFamilyRegular};
  text-align: center;
  width: 100%;
  margin-top: 10px;
`;

export const UserInfoProfile = styled.View`
  justify-content: center;
  padding-top: 30%;
  padding-left: 30px;
  padding-right: 30px;
`;

export const ItemProfile = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ItemButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const ItemText = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyBold};
`;

export const ItemTitle = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.osloGrey};
  font-family: ${fonts.fontFamilyRegular};
`;

export const ItemDetails = styled.View``;

export const ItemDetailsService = styled.View`
  width: 100%;
  margin-top: 24px;
`;

export const ItemTextService = styled.Text`
  font-size: ${fonts.bigger};
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyBold};
  width: 100%;
  text-align: center;
`;

export const ItemTitleService = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.osloGrey};
  font-family: ${fonts.fontFamilyRegular};
  width: 100%;
  text-align: center;
`;

export const ButtonAddService = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 15px 0;
  border-radius: 12px;
`;

export const ButtonAddServiceText = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.white};
  font-family: ${fonts.fontFamilyRegular};
  width: 100%;
  text-align: center;
`;

export const ModalSelection = styled.Modal``;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalCard = styled.View`
  background-color: ${colors.white};
  padding: 30px;
  border-radius: 12px;
`;

export const ModalTitle = styled.Text`
  font-size: ${fonts.small};
  color: ${colors.secondary};
  font-family: ${fonts.fontFamilyBold};
  width: 100%;
  text-align: center;
`;

export const ModalButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-top: 24px;
`;

export const ModalOption = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ModalButtonText = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.secondary};
  font-family: ${fonts.fontFamilyRegular};
  width: 100%;
  text-align: center;
`;
