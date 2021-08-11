import React from 'react';

import {colors} from '../../global';
import {Container, ButtonText, Icon} from './styles';

const Button = ({children, icon, active = true, ...rest}) => {
  return (
    <Container active={active} {...rest}>
      {icon && <Icon name={icon} size={20} color={colors.secondary} />}
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
