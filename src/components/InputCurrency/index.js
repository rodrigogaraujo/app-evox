import React, {useState, useCallback} from 'react';

import {colors} from '../../global';
import {Container, TextInput, Content, ErrorText, Text} from './styles';

const Input = ({
  icon,
  password,
  error,
  mask = null,
  textAlign = null,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container isFocused={isFocused} error={error}>
      <Content>
        <Text>Valor: </Text>
        <TextInput
          {...rest}
          textAlign={textAlign}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholderTextColor={colors.grey}
        />
      </Content>

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default Input;
