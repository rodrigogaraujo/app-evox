import React, {useCallback, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import Loading from '../../components/Loading';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {colors} from '../../global';
import api from '../../services/api';
import {useAuth} from '../../hooks/Auth';

import {
  Container,
  Content,
  Logo,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountText,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string().required('email obrigatório'),
});

const Recover = () => {
  const navigation = useNavigation();
  const {language} = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRecover = useCallback(async (data) => {
    setLoading(true);
    try {
      await api.post('recover', data);
      setShowAlert(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <Container>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
          <Content>
            <Logo />
            <CreateAccountText>
              {language
                ? 'Enter your email, we will send you a new password.'
                : 'Informe seu email, enviaremos uma nova senha para você.'}
            </CreateAccountText>
            <Formik
              initialValues={{email: ''}}
              validationSchema={schema}
              onSubmit={handleRecover}>
              {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                <>
                  <Input
                    name="email"
                    icon="credit-card"
                    placeholder={
                      language ? 'Type your e-mail' : 'Digite seu email'
                    }
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    error={errors.email}
                  />
                  <Button icon="lock" onPress={handleSubmit}>
                    Recuperar senha
                  </Button>
                </>
              )}
            </Formik>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title={language ? 'Check your email' : 'Verifique seu email'}
              message={
                language
                  ? 'Follow the instructions sent to your email.'
                  : 'Siga as instruções enviadas para seu email.'
              }
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText="Confirmar"
              confirmButtonColor={colors.primary}
              onConfirmPressed={() => {
                setShowAlert(false);
                navigation.goBack();
              }}
            />
            <ForgotPassword onPress={() => navigation.goBack()}>
              <ForgotPasswordText>
                {language ? 'Back to login' : 'Voltar para login'}
              </ForgotPasswordText>
            </ForgotPassword>
          </Content>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Recover;
