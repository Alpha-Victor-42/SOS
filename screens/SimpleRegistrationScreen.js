import React from 'react';
import * as CustomCode from '../CustomCode';
import * as $Auth$DirectusApi from '../apis/$Auth$DirectusApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { Button, Link, ScreenContainer, Spacer, withTheme } from '@draftbit/ui';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SimpleRegistrationScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const GenerateUserToken = () => {
    function generatePassword(passwordLength) {
      var numberChars = '0123456789';
      var upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var lowerChars = 'abcdefghijklmnopqrstuvwxyz';
      var allChars = numberChars + upperChars + lowerChars;
      var randPasswordArray = Array(passwordLength);
      randPasswordArray[0] = numberChars;
      randPasswordArray[1] = upperChars;
      randPasswordArray[2] = lowerChars;
      randPasswordArray = randPasswordArray.fill(allChars, 3);
      return shuffleArray(
        randPasswordArray.map(function (x) {
          return x[Math.floor(Math.random() * x.length)];
        })
      ).join('');
    }

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    return generatePassword(42);
  };

  const { theme } = props;
  const { navigation } = props;

  const $Auth$DirectusEDITCurrentUserRolePATCH =
    $Auth$DirectusApi.useEDITCurrentUserRolePATCH();

  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [passwordInputValue, setPasswordInputValue] = React.useState('');

  return (
    <ScreenContainer>
      <KeyboardAwareScrollView
        style={styles(theme).KeyboardAwareScrollView2200bac7}
        contentContainerStyle={
          styles(theme).KeyboardAwareScrollView989db244Content
        }
      >
        {/* Header */}
        <View style={styles(theme).View04e10711}>
          {/* Title */}
          <Text style={styles(theme).Text0b899493}>{'Bienvenue'}</Text>
          {/* Subtitle */}
          <Text style={styles(theme).Textf13dab33}>
            {'Créer un compte pour démarrer !'}
          </Text>
        </View>
        {/* Register Form */}
        <View style={styles(theme).View5cbae6f0}>
          {/* Error Message */}
          <Text style={styles(theme).Text23ad6e29}>
            {Constants['ERROR_MESSAGE']}
          </Text>
          {/* Email Input */}
          <TextInput
            onChangeText={newEmailInputValue => {
              try {
                setEmailInputValue(newEmailInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles(theme).TextInput20912c2c}
            value={emailInputValue}
            placeholder={'Email'}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
          />
          <Spacer top={12} right={8} bottom={8} left={8} />
          {/* Password Input */}
          <TextInput
            onChangeText={newPasswordInputValue => {
              try {
                setPasswordInputValue(newPasswordInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles(theme).TextInput20912c2c}
            value={passwordInputValue}
            placeholder={'Mot de passe'}
            secureTextEntry={true}
            autoCapitalize={'none'}
            textContentType={'password'}
          />
          <Spacer top={24} right={8} bottom={24} left={8} />
          {/* Sign Up Button */}
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  if (!emailInputValue) {
                    return;
                  }
                  if (!passwordInputValue) {
                    return;
                  }
                  const registerResponseJSON =
                    await $Auth$DirectusApi.userRegisterEndpointPOST(
                      Constants,
                      {
                        access_token: Constants['Directus_victor_access_token'],
                        generatedToken: GenerateUserToken(),
                        signupEmail: emailInputValue,
                        signupPassword: passwordInputValue,
                      }
                    );
                  const secret_token = registerResponseJSON.data.token;
                  setGlobalVariableValue({
                    key: 'Directus_user_token',
                    value: secret_token,
                  });
                  await $Auth$DirectusEDITCurrentUserRolePATCH.mutateAsync({
                    access_token: secret_token,
                    role: '17b8c0a5-4db5-4a63-a434-cb0e42e1b056',
                  });
                  navigation.navigate('SimpleLoginScreen');
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={styles(theme).Button413ac881}
            title={"S'inscrire"}
          >
            {'Sign Up'}
          </Button>
          <Spacer top={16} right={8} bottom={16} left={8} />
          <View style={styles(theme).View863e7c01}>
            <Text style={styles(theme).Texte38f1dad}>{'Déjà un compte ?'}</Text>
            <Spacer top={8} right={2} bottom={8} left={2} />
            {/* Sign In Link */}
            <Link
              onPress={() => {
                try {
                  navigation.navigate('SimpleLoginScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).Linkd3707c9f}
              title={'se connecter'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

const styles = theme =>
  StyleSheet.create({
    Button413ac881: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      textAlign: 'center',
    },
    KeyboardAwareScrollView2200bac7: { height: '100%' },
    Linkd3707c9f: { color: theme.colors.primary },
    Text0b899493: {
      fontFamily: 'System',
      fontSize: 36,
      fontWeight: '600',
      textAlign: 'center',
    },
    Text23ad6e29: {
      color: theme.colors.error,
      fontSize: 12,
      marginBottom: 16,
      textAlign: 'center',
    },
    TextInput20912c2c: {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
    },
    Texte38f1dad: { color: theme.colors.strong, marginRight: 2 },
    Textf13dab33: {
      color: theme.colors.strong,
      fontFamily: 'System',
      fontWeight: '400',
      marginTop: 4,
      textAlign: 'center',
    },
    View04e10711: { marginTop: 64 },
    View5cbae6f0: { marginTop: 64, paddingLeft: 36, paddingRight: 36 },
    View863e7c01: { flexDirection: 'row', justifyContent: 'center' },
  });

export default withTheme(SimpleRegistrationScreen);
