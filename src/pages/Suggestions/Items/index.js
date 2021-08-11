import React, {useState, useEffect, useCallback} from 'react';
import {format, parseISO} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../../services/api';
import {useAuth} from '../../../hooks/Auth';
import {
  ViewStyled,
  ViewDescription,
  Likes,
  TextLikes,
  TextDescription,
  Comments,
  ViewDetails,
} from './styles';

const Items = ({item}) => {
  const navigation = useNavigation();
  const {language} = useAuth();
  const [comments, setComments] = useState(0);
  const [like, setLike] = useState(false);
  const [suggestion, setSuggestion] = useState(item);

  const handleLike = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('@academyLikes');
      if (value) {
        await AsyncStorage.removeItem('@academyLikes');
        setLike(false);
        const resp = await api.put(`suggestions-like/${item.id}`, {
          like: false,
        });
        setSuggestion(resp.data);
      } else {
        await AsyncStorage.setItem('@academyLikes', `${item.id}`);
        const resp = await api.put(`suggestions-like/${item.id}`, {
          like: true,
        });
        setSuggestion(resp.data);
        setLike(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [item]);

  useEffect(() => {
    async function loadData() {
      const value = await AsyncStorage.getItem('@academyLikes');
      if (value) {
        setLike(true);
      } else {
        setLike(false);
      }
    }
    loadData();
  }, [item]);

  useEffect(() => {
    if (suggestion && suggestion.comments && suggestion.comments.length) {
      setComments(suggestion.comments.length);
    }
  }, [suggestion]);

  return (
    <ViewStyled>
      <ViewDescription>
        <TextDescription>
          {suggestion && suggestion.user ? `${suggestion.user.name} -' '` : ''}
          {format(parseISO(suggestion.created_at), 'dd/MM/yyyy HH:mm')}
        </TextDescription>

        <TextDescription>{suggestion.description}</TextDescription>
        <ViewDetails>
          <Likes onPress={handleLike}>
            <TextLikes>
              {like
                ? `${language ? 'Deslike' : 'Descurtir'}`
                : `${language ? 'Like' : 'Curtir'}`}
              {suggestion.likes || 0}
            </TextLikes>
          </Likes>
          <Comments
            onPress={() =>
              navigation.navigate('SuggestionComments', {
                suggestion: suggestion.id,
              })
            }>
            <TextLikes>
              `{language ? 'Comments' : 'Comentários:'}` {comments}
            </TextLikes>
          </Comments>
        </ViewDetails>
      </ViewDescription>
    </ViewStyled>
  );
};

export default Items;
