import React, {useEffect, useState, useCallback} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import Loading from '../../components/Loading';
import {colors} from '../../global';
import {useAuth} from '../../hooks/Auth';
import Modal from '../../components/Modal';
import api from '../../services/api';

import {
  Container,
  Content,
  ScrollViewStyled,
  Icon,
  HeaderProfile,
  HeaderImage,
  HeaderName,
  ContainerHeader,
  MenuButton,
  IconFont,
  DetailsProfile,
  NoInfo,
  ItemText,
  ItemTitle,
  ItemDetails,
  ItemProfile,
  UserInfoProfile,
  ItemDetailsService,
  ItemTextService,
  ItemTitleService,
  ButtonAddService,
  ButtonAddServiceText,
  ModalContainer,
  ModalCard,
  ModalTitle,
  ModalButton,
  ModalButtonText,
  ModalOption,
  ModalSelection,
  ImageUser,
} from './styles';

const Profile = () => {
  const navigation = useNavigation();
  const {profile, user, setUser, language} = useAuth();
  const [icon, setIcon] = useState('');
  const [resizing, setResizing] = useState(false);
  const [image, setImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMediaVisible, setModalMediaVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = useCallback(
    ({response, typeAction}) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        setLoading(true);
        const {originalRotation, type, uri} = response;

        setImage(null);
        setResizing(true);
        var newWidth = 720;
        var newHeight = 720;
        var compressFormat = type === 'image/png' ? 'PNG' : 'JPEG';
        var quality = 70;
        var rotation = 360;
        var outputPath = null;

        if (typeAction === 'Tirar foto') {
          if (originalRotation === 90) {
            rotation = 90;
          } else if (originalRotation === 270) {
            rotation = -90;
          }
        }

        ImageResizer.createResizedImage(
          uri,
          newWidth,
          newHeight,
          compressFormat,
          quality,
          rotation,
          outputPath,
          compressFormat === 'JPEG' ? true : false,
        )
          .then((resp) => {
            setResizing(false);
            requestAnimationFrame(async () => {
              setImage({...resp, type});
              const fd = new FormData();
              fd.append('image', {...resp, type});
              const data = await api.put(`/users/${user.id}`, fd);
              setUser(data.data);
              setLoading(false);
            });
          })
          .catch((err) => {
            console.log(err);
            setResizing(false);
            setLoading(false);
          });
      }
    },
    [user, setUser],
  );

  const getImage = useCallback(
    (typeAction) => {
      const options = {
        title: language ? 'Select the image' : 'Selecione a imagem',
        takePhotoButtonTitle: language ? 'Take a picture' : 'Tirar foto',
        chooseFromLibraryButtonTitle: language
          ? 'Select from gallery'
          : 'Selecionar da galeria',
        cancelButtonTitle: language ? 'Cancel' : 'Cancelar',
        storageOptions: {privateDirectory: true},
      };

      if (typeAction === 'Tirar foto') {
        try {
          launchCamera(options, (response) =>
            handleImage({response, typeAction}),
          );
        } catch (err) {}
      } else {
        try {
          launchImageLibrary(options, (response) =>
            handleImage({response, typeAction}),
          );
        } catch (err) {}
      }
    },
    [handleImage, language],
  );

  useEffect(() => {
    if (profile) {
      setIcon('arrow-left');
    } else {
      setIcon('');
      setModalVisible(true);
    }
  }, [profile]);

  useEffect(() => {
    async function loadImage() {
      if (user && user.image) {
        const picture = await api.get(`users/image/${user.id}`);
        setImageUrl(picture);
      }
    }
    loadImage();
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <ScrollViewStyled contentContainerStyle={{flexGrow: 1}}>
        <ContainerHeader>
          {icon ? (
            <MenuButton onPress={() => navigation.navigate('Home')}>
              <Icon name={icon} size={28} color={colors.primary} />
            </MenuButton>
          ) : (
            <View />
          )}

          <MenuButton
            onPress={() => {
              setModalVisible(true);
            }}>
            <Icon name="pencil" size={25} color={colors.primary} />
          </MenuButton>
        </ContainerHeader>
        <Content>
          <HeaderProfile>
            <HeaderImage
              onPress={() => {
                setModalMediaVisible(true);
              }}>
              {(user && user.image && imageUrl) || image ? (
                <ImageUser
                  source={
                    imageUrl && imageUrl.request && imageUrl.request._url
                      ? {uri: imageUrl.request._url}
                      : image
                  }
                />
              ) : (
                <IconFont name="image" size={35} color={colors.white} />
              )}
            </HeaderImage>
            <HeaderName />
          </HeaderProfile>
          <DetailsProfile>
            <NoInfo>{user && user.name ? user.name : ''}</NoInfo>
          </DetailsProfile>
          <UserInfoProfile>
            <ItemProfile>
              <ItemDetails>
                <ItemTitle>{language ? 'Document' : 'CPF'}</ItemTitle>
                <ItemText>
                  {user && user.document ? user.document : ''}
                </ItemText>
              </ItemDetails>
            </ItemProfile>
            <ItemProfile>
              <ItemDetails>
                <ItemTitle>{language ? 'Genrer' : 'Gênero'}</ItemTitle>
                <ItemText>
                  {user && user && user.genrer === 'm' ? 'Male' : 'Female'}
                </ItemText>
              </ItemDetails>
            </ItemProfile>
            <ItemProfile>
              <ItemDetails>
                <ItemTitle>
                  {language ? 'Your best email' : 'Seu melhor email'}
                </ItemTitle>
                <ItemText>{user && user.email ? user.email : ''}</ItemText>
              </ItemDetails>
            </ItemProfile>
            <ItemProfile>
              <ItemDetails>
                <ItemTitle>{language ? 'Address' : 'Endereço'}</ItemTitle>
                <ItemText>{user && user.address ? user.address : ''}</ItemText>
              </ItemDetails>
            </ItemProfile>
            <ItemProfile>
              <ItemDetails>
                <ItemTitle>{language ? 'Zip code' : 'Código postal'}</ItemTitle>
                <ItemText>
                  {user && user.zip_code ? user.zip_code : ''}
                </ItemText>
              </ItemDetails>
            </ItemProfile>
            <ItemProfile>
              <ItemDetails>
                <ItemTitle>{language ? 'City' : 'Cidade'}</ItemTitle>
                <ItemText>{user && user.city ? user.city : ''}</ItemText>
              </ItemDetails>
            </ItemProfile>
            <ItemProfile>
              <ItemDetails>
                <ItemTitle>{language ? 'State' : 'Estado'}</ItemTitle>
                <ItemText>{user && user.state ? user.state : ''}</ItemText>
              </ItemDetails>
            </ItemProfile>
          </UserInfoProfile>
          <ModalSelection
            animationType="fade"
            visible={modalMediaVisible}
            transparent
            callback={(data) => {
              setModalMediaVisible(false);

              if (data) {
                requestAnimationFrame(() => {
                  getImage(data);
                });
              }
            }}>
            <ModalContainer>
              <ModalCard>
                <ModalTitle>
                  {language
                    ? 'Select a profile photo'
                    : 'Selecione uma foto de perfil'}
                </ModalTitle>
                <ModalOption
                  onPress={() => {
                    setModalMediaVisible(false);

                    requestAnimationFrame(() => {
                      getImage('Tirar foto');
                    });
                  }}>
                  <ModalButtonText>
                    {' '}
                    {language ? 'Take a picture' : 'Tirar foto'}
                  </ModalButtonText>
                </ModalOption>
                <ModalOption
                  onPress={() => {
                    setModalMediaVisible(false);

                    requestAnimationFrame(() => {
                      getImage('Selecionar da galeria');
                    });
                  }}>
                  <ModalButtonText>
                    {language ? 'Select from gallery' : 'Selecionar da galeria'}
                  </ModalButtonText>
                </ModalOption>
                <ModalButton onPress={() => setModalMediaVisible(false)}>
                  <ModalButtonText>
                    {language ? 'CANCEL' : 'CANCELAR'}
                  </ModalButtonText>
                </ModalButton>
              </ModalCard>
            </ModalContainer>
          </ModalSelection>
        </Content>
        <Modal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          profile={profile}
        />
      </ScrollViewStyled>
    </Container>
  );
};

export default Profile;
