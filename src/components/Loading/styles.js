import styled from 'styled-components/native';

import {colors, fonts} from '../../global';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.secondary};
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: ${fonts.bigger};
  color: ${colors.primary};
  font-family: ${fonts.fontFamilyRegular};
`;
