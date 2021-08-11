import styled from 'styled-components/native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import {colors} from '../../global';

export const Container = styled.View`
  width: 100%;
  height: 55px;
  padding: 0 16px;
  border-bottom-width: 2px;
  border-bottom-color: ${colors.grey};
  border-radius: 15px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(SimpleLineIcon)`
  margin-right: 16px;
`;
