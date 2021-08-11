import React, {useState, useEffect, useRef, useCallback} from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import {useAuth} from '../../hooks/Auth';
import {
  Container,
  Content,
  Scroll,
  ItemContainer,
  Item,
  Text,
  Button,
  BackIcon,
  NextIcon,
  ItemContainerWidth,
  ViewList,
  CalendarIcon,
} from './styles';

export default function SlideOptions({
  selected,
  items = [],
  resetState,
  setResetState,
  callback = ({item: {}}) => {},
}) {
  const {language} = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const next = useCallback(() => {
    if (selectedIndex < items.length - 1) {
      callback({item: items[selectedIndex + 1].item});
      if (!resetState) {
        setResetState(true);
      }
    }
  }, [callback, items, resetState, selectedIndex, setResetState]);

  const prev = useCallback(() => {
    if (selectedIndex > 0) {
      callback({item: items[selectedIndex + -1].item});
      if (!resetState) {
        setResetState(true);
      }
    }
  }, [callback, items, resetState, selectedIndex, setResetState]);

  const calculeX = useCallback((index) => {
    // if (index > 0)
    return ItemContainerWidth * index;
    // // else if (index == items.length - 1) return metrics.screenWidth * 0.15;
    // else return metrics.screenWidth * 0.06;
  }, []);

  const getDay = useCallback(
    (day) => {
      if (day === '1') {
        return language ? 'Monday' : 'Segunda Feira';
      } else if (day === '2') {
        return language ? 'Tuesday' : 'Terça Feira';
      } else if (day === '3') {
        return language ? 'Wednesday' : 'Quarta Feira';
      } else if (day === '4') {
        return language ? 'Thursday' : 'Quinta Feira';
      } else if (day === '5') {
        return language ? 'Friday' : 'Sexta Feira';
      } else if (day === '6') {
        return language ? 'Saturday' : 'Sábado';
      } else {
        return language ? 'Sunday' : 'Domingo';
      }
    },
    [language],
  );

  useEffect(() => {
    if (selected === null) {
      return;
    }

    let _index = items.findIndex((v) => v.item === selected.item);

    scrollRef.current.scrollTo({y: 0, x: calculeX(_index), animated: true});

    setSelectedIndex(_index);
  }, [items, selected, calculeX]);

  return (
    <>
      {!open ? (
        <Container>
          <TouchableWithoutFeedback onPress={prev}>
            <Button visible={selectedIndex > 0}>
              <BackIcon />
            </Button>
          </TouchableWithoutFeedback>
          <Scroll
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}>
            <Content>
              {items.map((item, index) => (
                <ItemContainer
                  key={`option_${index}`}
                  onPress={() => setOpen(!open)}>
                  <Item>
                    <CalendarIcon />
                    <Text>
                      {getDay(
                        selected && selected.item
                          ? selected.item.day
                          : item.day,
                      )}
                    </Text>
                  </Item>
                </ItemContainer>
              ))}
            </Content>
          </Scroll>
          <TouchableWithoutFeedback onPress={next}>
            <Button visible={selectedIndex < items.length - 1}>
              <NextIcon />
            </Button>
          </TouchableWithoutFeedback>
        </Container>
      ) : null}
      {open ? (
        <ViewList>
          {items.map((item, index) => (
            <ItemContainer
              key={`option_${index}`}
              onPress={() => {
                setOpen(!open);
                callback({item: item.item});
              }}
              style={{marginBottom: 8}}>
              <Item>
                <Text>{getDay(item.title)}</Text>
              </Item>
            </ItemContainer>
          ))}
        </ViewList>
      ) : null}
    </>
  );
}
