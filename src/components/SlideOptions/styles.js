import styled, {css} from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/SimpleLineIcons';
import {Dimensions} from 'react-native';
import {colors, fonts} from '../../global';

const {width} = Dimensions.get('window');

export const ItemContainerWidth = width - 120;
export const Container = styled.View`
  min-height: 51px;
  border-left-width: 0;
  border-right-width: 0;
  margin: 0 10px;
  padding: 5px 0;
  flex-direction: row;
`;

export const ViewList = styled.View`
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 0 15px 0;
  padding: 5px 0;
`;

export const Content = styled.View`
  flex-direction: row;
  min-height: 51px;
  align-items: center;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
`;

export const ItemContainer = styled.TouchableOpacity`
  flex: 1;
  min-height: 39px;
  justify-content: center;
  align-items: center;
  width: ${ItemContainerWidth}px;
`;

export const Item = styled.View`
  background-color: ${colors.primary};
  min-height: 39px;
  justify-content: center;
  align-items: center;
  width: ${width * 0.55}px;
  /* margin: 0 ${width * 0.2}px 0 0; */
  border-radius: 5px;
`;

export const Text = styled.Text`
  color: ${colors.white};
  text-align: center;
  width: ${width * 0.5}px;
  margin: 5px 0px;
  font-size: ${fonts.regular};
  font-family: ${fonts.fontFamilyRegular};
  padding: 12px;
`;

export const Button = styled.View`
  justify-content: center;
  align-items: center;
  width: 50px;

  ${(props) =>
    !props.visible &&
    css`
      opacity: 0;
    `}
`;

export const BackIcon = styled(Icon).attrs({
  name: 'arrow-back',
  size: 20,
})`
  color: ${colors.primary};
`;

export const CalendarIcon = styled(IconS).attrs({
  name: 'calendar',
  size: 20,
})`
  color: ${colors.white};
  position: absolute;
  left: 5%;
  top: 30%;
`;

export const NextIcon = styled(Icon).attrs({
  name: 'arrow-forward',
  size: 20,
})`
  color: ${colors.primary};
`;
