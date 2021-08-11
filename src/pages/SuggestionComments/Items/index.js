import React from 'react';
import {format, parseISO} from 'date-fns';

import {ViewStyled, ViewDescription, TextDescription} from './styles';

const Items = ({item}) => {
  return (
    <ViewStyled>
      <ViewDescription>
        <TextDescription>
          {item && item.user && item.user.name ? `${item.user.name}'- '` : ''}
          {format(parseISO(item.created_at), 'dd/MM/yyyy HH:mm')}
        </TextDescription>

        <TextDescription>{item.description}</TextDescription>
      </ViewDescription>
    </ViewStyled>
  );
};

export default Items;
