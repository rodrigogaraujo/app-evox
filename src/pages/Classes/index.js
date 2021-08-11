/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert, Dimensions} from 'react-native';
import HTML from 'react-native-render-html';
import {format, parseISO} from 'date-fns';
import YoutubePlayer from 'react-native-youtube-iframe';

import Loading from '../../components/Loading';
import Header from '../../components/Header';
import SlideOptions from '../../components/SlideOptions';
import {useAuth} from '../../hooks/Auth';
import api from '../../services/api';

import {
  Container,
  Content,
  ScrollViewStyled,
  ViewScroll,
  ViewView,
  ViewDescription,
  ViewComment,
  InviteUserText,
  DateText,
} from './styles';

const Classes = () => {
  const navigation = useNavigation();
  const {user, language} = useAuth();
  const {width} = Dimensions.get('window');
  const [loading, setLoading] = useState(false);
  const [resetState, setResetState] = useState(false);
  const [classes, setClasses] = useState([]);
  const [classe, setClasse] = useState();
  const [playing, setPlaying] = useState(false);

  const getItens = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`classes?genrer=${user.genrer}`);
      const classesData = response.data;
      let val = [];
      classesData.map((clas) => {
        if (clas.status) {
          val.push(clas);
        }
      });
      if (response.data && response.data.length) {
        setClasses(val);
        setClasse({item: response.data[0]});
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Ocorreu um erro.');
    }
  }, [user]);

  const classeSelected = useCallback((item) => {
    setClasse(item);
  }, []);

  useEffect(() => {
    getItens();
  }, [getItens]);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  try {
    return loading ? (
      <Loading />
    ) : (
      <Container>
        <Header
          action={() => {
            try {
              setClasse(null);
              navigation.goBack();
            } catch (err) {
              console.log(err);
            }
          }}
          icon="arrow-left"
        />
        <ViewScroll>
          <ScrollViewStyled contentContainerStyle={{flexGrow: 1}}>
            <Content>
              <SlideOptions
                selected={classe}
                items={classes.map((v) => ({
                  title: `${v.day}`,
                  item: v,
                }))}
                callback={classeSelected}
                setResetState={setResetState}
                resetState={resetState}
              />
              {classe && classe.item ? (
                <ViewView>
                  <YoutubePlayer
                    videoId={classe.item.url_video} // The YouTube video ID
                    height={200}
                    play={playing}
                    allowWebViewZoom={false}
                    playList={false}
                    onChangeState={onStateChange}
                  />
                </ViewView>
              ) : null}
              {classe && classe.item ? (
                <ViewDescription>
                  <InviteUserText>
                    {language ? 'Training details' : 'Detalhes do treino'}
                  </InviteUserText>
                  <HTML
                    source={{html: classe.item.description}}
                    contentWidth={width - 50}
                  />
                </ViewDescription>
              ) : null}

              {classe && classe.item && classe.item.url_video_two ? (
                <ViewView>
                  <YoutubePlayer
                    videoId={classe.item.url_video_two} // The YouTube video ID
                    height={200}
                    play={playing}
                    onChangeState={onStateChange}
                  />
                </ViewView>
              ) : null}
              {classe && classe.item && classe.item.description_two ? (
                <ViewDescription>
                  <InviteUserText>
                    {language
                      ? 'Training details - video 02'
                      : 'Detalhes do treino - video 02'}
                  </InviteUserText>
                  <HTML
                    source={{html: classe.item.description_two}}
                    contentWidth={width - 50}
                  />
                </ViewDescription>
              ) : null}

              {classe && classe.item && classe.item.url_video_three ? (
                <ViewView>
                  <YoutubePlayer
                    videoId={classe.item.url_video_three} // The YouTube video ID
                    height={200}
                    play={playing}
                    onChangeState={onStateChange}
                  />
                </ViewView>
              ) : null}
              {classe && classe.item && classe.item.description_three ? (
                <ViewDescription>
                  <InviteUserText>
                    {language
                      ? 'Training details - video 03'
                      : 'Detalhes do treino - video 03'}
                  </InviteUserText>
                  <HTML
                    source={{html: classe.item.description_three}}
                    contentWidth={width - 50}
                  />
                </ViewDescription>
              ) : null}

              {classe && classe.item && classe.item.url_video_four ? (
                <ViewView>
                  <YoutubePlayer
                    videoId={classe.item.url_video_four} // The YouTube video ID
                    height={200}
                    play={playing}
                    onChangeState={onStateChange}
                  />
                </ViewView>
              ) : null}
              {classe && classe.item && classe.item.description_four ? (
                <ViewDescription>
                  <InviteUserText>
                    {language
                      ? 'Training details - video 04'
                      : 'Detalhes do treino - vídeo 04'}
                  </InviteUserText>
                  <HTML
                    source={{html: classe.item.description_four}}
                    contentWidth={width - 50}
                  />
                </ViewDescription>
              ) : null}

              {classe && classe.item && classe.item.url_video_five ? (
                <ViewView>
                  <YoutubePlayer
                    videoId={classe.item.url_video_five} // The YouTube video ID
                    height={200}
                    play={playing}
                    onChangeState={onStateChange}
                  />
                </ViewView>
              ) : null}
              {classe && classe.item && classe.item.description_five ? (
                <ViewDescription>
                  <InviteUserText>
                    {language
                      ? 'Training details - video 05'
                      : 'Detalhes do treino - vídeo 05'}
                  </InviteUserText>
                  <HTML
                    source={{html: classe.item.description_five}}
                    contentWidth={width - 50}
                  />
                </ViewDescription>
              ) : null}
              {classe && classe.item && classe.item.description_six ? (
                <ViewDescription>
                  <InviteUserText>
                    {language
                      ? 'Training details - video 06'
                      : 'Detalhes do treino - vídeo 06'}
                  </InviteUserText>
                  <HTML
                    source={{html: classe.item.description_six}}
                    contentWidth={width - 50}
                  />
                </ViewDescription>
              ) : null}
              {classe && classe.item && classe.item.description_seven ? (
                <ViewDescription>
                  <InviteUserText>
                    {language
                      ? 'Training details - video 07'
                      : 'Detalhes do treino - vídeo 07'}
                  </InviteUserText>
                  <HTML
                    source={{html: classe.item.description_seven}}
                    contentWidth={width - 50}
                  />
                </ViewDescription>
              ) : null}
              {classe && classe.item && classe.item.description_eight ? (
                <ViewDescription>
                  <InviteUserText>
                    {language
                      ? 'Training details - video 08'
                      : 'Detalhes do treino - vídeo 08'}
                  </InviteUserText>
                  <HTML
                    source={{html: classe.item.description_eight}}
                    contentWidth={width - 50}
                  />
                </ViewDescription>
              ) : null}
              {classe && classe.item && classe.item.description_nine ? (
                <ViewDescription>
                  <InviteUserText>
                    {language
                      ? 'Training details - video 09'
                      : 'Detalhes do treino - vídeo 09'}
                  </InviteUserText>
                  <HTML
                    source={{html: classe.item.description_nine}}
                    contentWidth={width - 50}
                  />
                </ViewDescription>
              ) : null}
              {classe && classe.item && classe.item.description_ten ? (
                <ViewDescription>
                  <InviteUserText>
                    {language
                      ? 'Training details - video 10'
                      : 'Detalhes do treino - vídeo 10'}
                  </InviteUserText>
                  <HTML
                    source={{html: classe.item.description_ten}}
                    contentWidth={width - 50}
                  />
                </ViewDescription>
              ) : null}
              {classe &&
              classe.item &&
              classe.item.comments &&
              classe.item.comments.length ? (
                <ViewDescription>
                  <InviteUserText>
                    {language ? 'Teacher Comments' : 'Comentários do professor'}
                  </InviteUserText>
                  {classe.item.comments && classe.item.comments.length
                    ? classe.item.comments.map((comment) => (
                        <ViewComment key={comment.id}>
                          <HTML
                            style={{marginTop: 10}}
                            source={{html: comment.description}}
                            contentWidth={width - 50}
                          />
                          <DateText>
                            {format(parseISO(comment.created_at), 'dd/MM/yyyy')}
                          </DateText>
                        </ViewComment>
                      ))
                    : null}
                </ViewDescription>
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

export default Classes;
