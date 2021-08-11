import React, {useState, useCallback, useEffect} from 'react';
import Modal from 'react-native-modal';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';

import Input from '../../components/Input';
import {colors} from '../../global';
import {useAuth} from '../../hooks/Auth';

import {
  Container,
  Icon,
  MenuButton,
  Row,
  TextCheckbox,
  CheckBoxStyled,
  ButtonStyled,
  ButtonTextStyled,
  ViewCep,
} from './styles';

const schema = Yup.object().shape({
  document: Yup.string()
    .required('CPF obrigatório')
    .min(14, 'O CPF deve conter todos os 11 números')
    .max('14'),
  name: Yup.string().required('Nome obrigatório'),
  phone: Yup.string().required('Telefone obrigatório'),
  email: Yup.string().required('Email obrigatório'),
});

const ModalLoad = ({isModalVisible, setModalVisible, profile}) => {
  const {updateUser, user, language} = useAuth();
  const [loadingCep, setLoadingCep] = useState(false);
  const [checkedMale, setCheckedMale] = useState(false);
  const [checkedFemale, setCheckedFemale] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertOk, setShowAlertOk] = useState(false);
  const [showAlertCep, setShowAlertCep] = useState(false);
  const [
    showAlertPasswordConfirmSame,
    setShowAlertPasswordConfirmSame,
  ] = useState(false);
  const [showAlertPasswordConfirm, setShowAlertPasswordConfirm] = useState(
    false,
  );
  const [
    showAlertPasswordConfirmSmal,
    setShowAlertPasswordConfirmSmal,
  ] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [cep, setCep] = useState('');

  const handleCheckGenrer = useCallback(
    (one, two) => {
      if (checkedMale && one) {
        setCheckedMale(false);
      } else {
        setCheckedMale(one);
      }
      if (checkedFemale && two) {
        setCheckedFemale(false);
      } else {
        setCheckedFemale(two);
      }
    },
    [checkedMale, checkedFemale],
  );

  const handleCep = useCallback(
    async (data) => {
      setCep(data);
      if (data) {
        if (data.length === 9) {
          const cep = data.replace('-', '');
          setLoadingCep(true);
          const resp = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          setCity(resp.data.localidade);
          setState(resp.data.uf);
          setLoadingCep(false);
        }
      }
      updateUser(data);
    },
    [updateUser],
  );

  const handleUpdateProfile = useCallback(
    async (data) => {
      if (data.password && data.password_confirm) {
        if (data.password !== data.password_confirm) {
          setShowAlertPasswordConfirmSame(true);
          return;
        }
      } else if (data.password && !data.password_confirm) {
        setShowAlertPasswordConfirm(true);
        return;
      }
      if (data.password.lenght < 6) {
        setShowAlertPasswordConfirmSmal(true);
      }
      if (!data.name || !data.cpf) {
        setShowAlert(true);
        return;
      }
      if (data.cep) {
        if (data.cep.length === 9) {
          const cepData = data.cep.replace('-', '');
          const resp = await axios.get(
            `https://viacep.com.br/ws/${cepData}/json/`,
          );
          setCity(resp.data.localidade);
          setState(resp.data.uf);
        } else {
          setShowAlertCep(true);
          return;
        }
      }
      updateUser({
        document: data.document,
        name: data.name,
        email: data.email,
        phone: data.phone,
        city,
        state,
        password: data.password,
        zip_code: cep,
        genrer: checkedMale ? 'm' : 'f',
      });
      setShowAlertOk(true);
    },
    [updateUser, cep, checkedMale, city, state],
  );

  useEffect(() => {
    if (user.genrer && user.genrer === 'm') {
      setCheckedMale(true);
      setCheckedFemale(false);
    } else if (user.genrer && user.genrer === 'f') {
      setCheckedFemale(true);
      setCheckedMale(false);
    }
  }, [user]);

  useEffect(() => {
    if (user.city) {
      setCity(user.city);
    }
    if (user.state) {
      setState(user.state);
    }
    if (user.cep) {
      setCep(user.cep);
    }
  }, [user]);

  const handleClose = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  return (
    <Modal isVisible={isModalVisible}>
      <Container contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
        {profile && (
          <MenuButton onPress={handleClose}>
            <Icon name="close" size={25} color={colors.primary} />
          </MenuButton>
        )}
        <Formik
          initialValues={{
            document: user.document ? user.document : '',
            name: user.name ? user.name : '',
            email: user.email ? user.email : '',
            city: user.city ? user.city : '',
            state: user.state ? user.state : '',
            zip_code: user.zip_code ? user.zip_code : '',
            phone: user.phone ? user.phone : '',
            password: '',
            password_confirm: '',
          }}
          enableReinitialize={user}
          validationSchema={schema}
          onSubmit={handleUpdateProfile}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
          }) => (
            <>
              <Input
                name="document"
                icon="credit-card"
                mask="[000].[000].[000]-[00]"
                placeholder={
                  language ? 'Tell us your document' : 'Digite seu cpf **'
                }
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={handleChange('document')}
                onBlur={handleBlur('document')}
                value={values.document}
                error={errors.document}
              />
              <Input
                name="name"
                icon="user"
                placeholder={
                  language ? 'Tell us your name' : 'Digite seu nome **'
                }
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                error={errors.name}
              />
              <Input
                name="email"
                icon="cloud-upload"
                placeholder={
                  language ? 'Tell us your email' : 'Digite seu email **'
                }
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={errors.email}
              />
              {user && user.email && (
                <>
                  <Input
                    name="password"
                    icon="lock"
                    placeholder={
                      language
                        ? 'Tell us your new password'
                        : 'Digite sua nova senha **'
                    }
                    autoCorrect={false}
                    password
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    error={errors.password}
                  />

                  <Input
                    name="password_confirm"
                    icon="lock"
                    placeholder={
                      language
                        ? 'Confirm your password'
                        : 'Confirmar a senha **'
                    }
                    autoCorrect={false}
                    password
                    autoCapitalize="none"
                    onChangeText={handleChange('password_confirm')}
                    onBlur={handleBlur('password_confirm')}
                    value={values.password_confirm}
                    error={errors.password_confirm}
                  />
                </>
              )}

              <Input
                name="phone"
                mask="([00]) [00000]-[0000]"
                icon="phone"
                placeholder={
                  language ? 'Tell us your phone' : 'Digite seu telefone **'
                }
                autoCorrect={false}
                keyboardType="numeric"
                autoCapitalize="none"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                error={errors.phone}
              />
              <Input
                name="zip_code"
                mask="[00000]-[000]"
                icon="location-pin"
                placeholder={
                  language ? 'Tell us your zip code' : 'Digite seu CEP **'
                }
                autoCorrect={false}
                keyboardType="numeric"
                autoCapitalize="none"
                onChangeText={(e) => {
                  handleCep(e);
                  setFieldValue('zip_code', e);
                }}
                onBlur={handleBlur('zip_code')}
                value={values.zip_code}
                error={errors.zip_code}
              />
              {loadingCep ? (
                <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                <ViewCep>
                  <Input
                    name="state"
                    icon="location-pin"
                    placeholder={
                      language ? 'Tell us your state' : 'Digite seu estado **'
                    }
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={handleChange('state')}
                    disabled
                    value={state}
                  />
                  <Input
                    name="city"
                    icon="location-pin"
                    placeholder={
                      language ? 'Tell us your city' : 'Digite sua cidade **'
                    }
                    autoCorrect={false}
                    autoCapitalize="none"
                    onBlur={handleBlur('city')}
                    onChangeText={handleChange('city')}
                    value={city}
                    disabled
                  />
                </ViewCep>
              )}
              <Row>
                <CheckBoxStyled
                  color={colors.primary}
                  uncheckedColor={colors.grey}
                  status={checkedMale ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckGenrer(true, false)}
                />
                <TextCheckbox>{language ? 'Male' : 'Masculino'}</TextCheckbox>
              </Row>
              <Row>
                <CheckBoxStyled
                  color={colors.primary}
                  uncheckedColor={colors.grey}
                  status={checkedFemale ? 'checked' : 'unchecked'}
                  onPress={() => handleCheckGenrer(false, true)}
                />
                <TextCheckbox>{language ? 'Female' : 'Femenino'}</TextCheckbox>
              </Row>
              <ButtonStyled onPress={handleSubmit}>
                <ButtonTextStyled>
                  {language ? 'Save' : 'Salvar'}
                </ButtonTextStyled>
              </ButtonStyled>
            </>
          )}
        </Formik>
        <AwesomeAlert
          show={showAlertCep}
          showProgress={false}
          title={language ? 'Zip code invalid' : 'CEP Inválido'}
          message={
            language
              ? 'Fill in all the digits of your zip code'
              : 'Preencha todos os digitos do seu CEP'
          }
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Ok, completar cadastro"
          confirmButtonColor={colors.primary}
          onConfirmPressed={() => {
            setShowAlertCep(false);
          }}
        />
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={language ? 'Incomplete data' : 'Dados incomplentos'}
          message={
            language
              ? 'Complete your registration with the required data'
              : 'Complete seu cadastro com os dados obrigatórios'
          }
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Ok, completar cadastro"
          confirmButtonColor={colors.primary}
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
        />
        <AwesomeAlert
          show={showAlertOk}
          showProgress={false}
          title={language ? 'Data updated' : 'Dados atualizados'}
          message={
            language
              ? 'Data updated successfully!'
              : 'Dados atualizados com sucesso!'
          }
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor={colors.primary}
          onConfirmPressed={() => {
            setShowAlertOk(false);
            setModalVisible(false);
          }}
        />
        <AwesomeAlert
          show={showAlertPasswordConfirmSame}
          showProgress={false}
          title={
            language ? 'Passwords do not match.' : 'As senhas não conferem.'
          }
          message={
            language
              ? 'Please enter two identical passwords.'
              : 'Por favor, insira duas senhas iguais.'
          }
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor={colors.primary}
          onConfirmPressed={() => {
            setShowAlertPasswordConfirmSame(false);
          }}
        />
        <AwesomeAlert
          show={showAlertPasswordConfirmSmal}
          showProgress={false}
          title="Erro"
          message={
            language
              ? 'Your password must contain at least 6 characters.'
              : 'Sua senha deve conter pelo menos 6 caracteres.'
          }
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor={colors.primary}
          onConfirmPressed={() => {
            setShowAlertPasswordConfirmSmal(false);
          }}
        />
        <AwesomeAlert
          show={showAlertPasswordConfirm}
          showProgress={false}
          title={language ? 'Confirm your password' : 'Confirme sua senha'}
          message={
            language
              ? 'Please confirm your password.'
              : 'Por favor, confirme sua senha.'
          }
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor={colors.primary}
          onConfirmPressed={() => {
            setShowAlertPasswordConfirm(false);
          }}
        />
      </Container>
    </Modal>
  );
};

export default ModalLoad;
