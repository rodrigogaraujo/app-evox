import React from 'react';
import {ActivityIndicator} from 'react-native';

import {colors} from '../../global';
import {useAuth} from '../../hooks/Auth';

import {Container, Text} from './styles';

export default function Loading({video = false}) {
  const {language} = useAuth();
  return (
    <Container>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text>
        {language ? 'Loading' : 'Carregando'} {video ? 'video' : ''}...
      </Text>
    </Container>
  );
}
