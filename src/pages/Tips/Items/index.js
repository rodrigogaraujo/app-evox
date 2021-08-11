import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {ViewStyled, ViewView} from './styles';

const Items = ({item}) => {
  const navigation = useNavigation();

  return (
    <ViewStyled onPress={() => navigation.navigate('Tip', {tip: item})}>
      <ViewView>{item.name}</ViewView>
    </ViewStyled>
  );
};

export default Items;
