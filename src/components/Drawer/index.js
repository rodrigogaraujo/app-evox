import React, {useCallback, useEffect, useState} from 'react';
import IconF from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native';
import {Switch} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import {colors} from '../../global';
import api from '../../services/api';
import {useAuth} from '../../hooks/Auth';

import {
  Container,
  Header,
  HeaderImage,
  HeaderImageView,
  HeaderTexts,
  HeaderTitle,
  Content,
  RowContent,
  ContentText,
  ContentTitle,
  ImageUser,
} from './styles';

const Drawer = ({state}) => {
  const navigation = state && state.navigation ? state.navigation : '';
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const {signOut, user, language, updateLanguage} = useAuth();

  const [imageUrl, setImageUrl] = useState(null);

  const handleLogout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const onToggleSwitch = async () => {
    if (isSwitchOn) {
      setIsSwitchOn(false);
      AsyncStorage.removeItem('@academyApp:language');
    } else {
      setIsSwitchOn(true);
      AsyncStorage.setItem('@academyApp:language', JSON.stringify(true));
    }
    updateLanguage();
  };

  useEffect(() => {
    if (language) {
      setIsSwitchOn(true);
    } else {
      setIsSwitchOn(false);
    }
  }, [language]);

  const getName = useCallback(() => {
    if (user && user.name && !user.name.split(' ').length) {
      return user.name;
    } else if (user && user.name && user.name.split(' ').length) {
      return user.name.split(' ')[0];
    }
    return '';
  }, [user]);

  return (
    <>
      <Container>
        {user ? (
          <>
            <Header>
              <HeaderImage>
                <HeaderImageView>
                  {user && user.image && imageUrl ? (
                    <ImageUser source={{uri: imageUrl.request._url}} />
                  ) : (
                    <IconF name="user" color={colors.grey} size={25} />
                  )}
                </HeaderImageView>
              </HeaderImage>
              <HeaderTexts>
                <HeaderTitle>{user && user.name ? getName() : ''}</HeaderTitle>
              </HeaderTexts>
            </Header>
            <ScrollView>
              <Content>
                <RowContent>
                  <IconF name="star" size={22} color={colors.primary} />
                  <ContentText>AcademyApp</ContentText>
                </RowContent>
                <ContentTitle>
                  {language ? 'MY ACCOUNT' : 'MEU CADASTRO'}
                </ContentTitle>
                <RowContent onPress={() => navigation.navigate('Profile')}>
                  <IconF name="user" size={23} color={colors.primary} />
                  <ContentText>
                    {language ? 'MY PROFILE' : 'MEU PERFIL'}
                  </ContentText>
                </RowContent>
                <ContentTitle>
                  {language ? 'TRANSLATE' : 'TRADUÇÃO'}
                </ContentTitle>
                <RowContent>
                  <ContentText>PT</ContentText>
                  <Switch
                    color={colors.primary}
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                  />
                  <ContentText>EN</ContentText>
                </RowContent>
                <ContentTitle>
                  {language ? 'OTHER OPTIONS' : 'OUTRAS OPÇÕES'}
                </ContentTitle>
                <RowContent onPress={handleLogout}>
                  <IconF name="log-out" size={23} color={colors.primary} />
                  <ContentText> {language ? 'OUT' : 'SAIR'}</ContentText>
                </RowContent>
              </Content>
            </ScrollView>
          </>
        ) : (
          <ScrollView>
            <Content style={{marginTop: 24}}>
              <RowContent onPress={() => navigation.navigate('SignIn')}>
                <IconF name="log-in" size={23} color={colors.primary} />
                <ContentText>LOGIN</ContentText>
              </RowContent>
              <RowContent>
                <ContentText>PT</ContentText>
                <Switch
                  color={colors.primary}
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                />
                <ContentText>EN</ContentText>
              </RowContent>
            </Content>
          </ScrollView>
        )}
      </Container>
    </>
  );
};

export default Drawer;
