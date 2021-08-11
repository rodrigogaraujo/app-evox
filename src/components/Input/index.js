import React, {useState, useEffect, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';

import {colors} from '../../global';
import {
  Container,
  TextInput,
  Content,
  Icon,
  ErrorText,
  TextInputM,
} from './styles';

const Input = ({
  icon,
  password,
  error,
  mask = null,
  textAlign = null,
  ...rest
}) => {
  const [passwordView, setPasswordView] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    setPasswordView(password);
  }, [password]);

  return (
    <Container password={password} isFocused={isFocused} error={error}>
      <Content>
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={isFocused ? colors.primary : colors.grey}
          />
        )}
        {!mask ? (
          <TextInput
            {...rest}
            textAlign={textAlign}
            secureTextEntry={passwordView}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholderTextColor={colors.grey}
          />
        ) : (
          <TextInputM
            textAlign={textAlign}
            {...rest}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            mask={mask}
            placeholderTextColor={colors.grey}
          />
        )}

        {password && (
          <TouchableOpacity onPress={() => setPasswordView(!passwordView)}>
            <Icon
              passwordView={passwordView}
              name="eye"
              size={20}
              color={passwordView ? colors.grey : colors.primary}
            />
          </TouchableOpacity>
        )}
      </Content>

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default Input;
