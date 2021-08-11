/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Video from 'react-native-video';
import {Dimensions} from 'react-native';
import HTML from 'react-native-render-html';

import Loading from '../../components/Loading';
import Header from '../../components/Header';

import {
  Container,
  Content,
  ScrollViewStyled,
  ViewView,
  ViewDescription,
  ViewScroll,
} from './styles';

const Home = (props) => {
  const {goBack} = props.navigation;
  const {tip} = props.route.params;
  const {width} = Dimensions.get('window');
  const [loadingVideo, setLoadingVideo] = useState(true);

  return (
    <Container>
      <Header action={() => goBack()} icon="arrow-left" />
      <ViewScroll>
        <ScrollViewStyled contentContainerStyle={{flexGrow: 1}}>
          <Content>
            <ViewView>
              {loadingVideo ? <Loading video={true} /> : null}
              <Video
                controls={true}
                onLoadStart={() => setLoadingVideo(true)}
                onLoad={() => setLoadingVideo(false)}
                source={{uri: tip ? tip.url_video : ''}}
                resizeMode="contain"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: width - 50,
                  minHeight: 200,
                }}
              />
            </ViewView>
            <ViewDescription>
              <HTML
                source={{html: tip.description}}
                contentWidth={width - 50}
              />
            </ViewDescription>
          </Content>
        </ScrollViewStyled>
      </ViewScroll>
    </Container>
  );
};

export default Home;
