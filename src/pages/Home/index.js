/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {Dimensions} from 'react-native';
import HTML from 'react-native-render-html';
import YoutubePlayer from 'react-native-youtube-iframe';

import Loading from '../../components/Loading';
import Header from '../../components/Header';
import {useAuth} from '../../hooks/Auth';
import api from '../../services/api';
import {colors} from '../../global';

import {
  Container,
  Content,
  ScrollViewStyled,
  InviteUser,
  InviteUserText,
  Icon,
  ButtonIcon,
  ViewView,
  ViewDescription,
  ViewScroll,
  ViewButtons,
  ButtonOne,
  TextButton,
} from './styles';

const Home = (props) => {
  const {toggleDrawer} = props.navigation;
  const navigation = useNavigation();
  const {user, language} = useAuth();
  const {width} = Dimensions.get('window');
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await api.get('settings');
        if (response.data && response.data.length) {
          setItem(response.data[0]);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        Alert.alert('Ocorreu um erro.');
      }
    }
    loadData();
  }, []);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  try {
    return loading || !item ? (
      <Loading />
    ) : (
      <Container>
        <Header action={() => toggleDrawer()} icon="menu" />
        <ViewScroll>
          <ScrollViewStyled contentContainerStyle={{flexGrow: 1}}>
            <Content>
              {showMessage && user && (
                <InviteUser
                  onPress={() => {
                    navigation.navigate('Profile');
                  }}>
                  <InviteUserText>
                    {language ? 'Welcome' : 'Seja bem vindo(a)'} {user.name}
                  </InviteUserText>
                  <ButtonIcon onPress={() => setShowMessage(false)}>
                    <Icon name="close" size={20} color={colors.secondary} />
                  </ButtonIcon>
                </InviteUser>
              )}
              {!user && item ? (
                <ViewView>
                  <YoutubePlayer
                    videoId={item.url_video} // The YouTube video ID
                    height={200}
                    play={playing}
                    onChangeState={onStateChange}
                  />
                </ViewView>
              ) : null}
              {!user && item ? (
                <ViewDescription>
                  <HTML
                    source={{html: item.description}}
                    contentWidth={width - 50}
                  />
                </ViewDescription>
              ) : null}
              {user ? (
                <ViewButtons>
                  <ButtonOne onPress={() => navigation.navigate('Tips')}>
                    <Icon name="list" size={40} color={colors.white} />
                    <TextButton>
                      {language ? 'Guidance' : 'Orientações'}
                    </TextButton>
                  </ButtonOne>
                  <ButtonOne onPress={() => navigation.navigate('Classes')}>
                    <Icon
                      name="screen-desktop"
                      size={40}
                      color={colors.white}
                    />
                    <TextButton>{language ? 'Classes' : 'Aulas'}</TextButton>
                  </ButtonOne>
                  <ButtonOne onPress={() => navigation.navigate('Suggestions')}>
                    <Icon name="people" size={40} color={colors.white} />
                    <TextButton>
                      {language ? 'Suggestions' : 'Sugestões'}
                    </TextButton>
                  </ButtonOne>
                </ViewButtons>
              ) : null}
            </Content>
          </ScrollViewStyled>
        </ViewScroll>
      </Container>
    );
  } catch (err) {
    console.log(err);
  }
};

export default Home;
