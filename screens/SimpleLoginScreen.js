import React, { useContext, useEffect } from 'react';
import * as CustomCode from '../CustomCode';
import * as $Auth$DirectusApi from '../apis/$Auth$DirectusApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { Button, Link, ScreenContainer, Spacer, withTheme } from '@draftbit/ui';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppContext } from '../config/config.segment';

const SimpleLoginScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const conditionnalNav = role => {
    const roles = {
      administrator: '050aa3fb-7fd1-4181-8a4a-40c207a3c311',
      editors: '41720159-226b-49fd-87c0-4582167cc2d8',
      new_user: '17b8c0a5-4db5-4a63-a434-cb0e42e1b056',
      first_logged_user: '23ce5be3-a95e-48c1-9f3e-54f6a8d7a7a2',
      patient_access: '9ae6b62b-2a00-4b89-888a-cec02ead1702',
      aidant_access: 'a92df645-dd14-4586-896e-1a9762266431',
    };

    const user_role = role;

    if (user_role === roles.new_user) {
      props.navigation.navigate('WelcomeScreen');
    }

    if (user_role === roles.first_logged_user) {
      props.navigation.navigate('WhoAreYouScreen');
    }

    if (
      user_role === roles.administrator ||
      user_role === roles.editors ||
      user_role === roles.patient_access ||
      user_role === roles.aidant_access
    ) {
      props.navigation.navigate('NeedsScreen');
    }
  };

  const checkIfLoginValues = (object, value) => {
    if (Object.keys(object).includes(value)) {
      return object;
    }
  };
  // to use a global variable
  const variables = CustomCode.useValues();
  // to update or modify the value of a global variable
  const setVariable = CustomCode.useSetValue();
  const { theme } = props;
  const { navigation } = props;

  const [emailInputValue, setEmailInputValue] = React.useState('victor@av42.com');
  const [passwordInputValue, setPasswordInputValue] = React.useState('test1234');

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    //myVariable.track('Login Page')
  }

  return (
      <ScreenContainer>
        <KeyboardAwareScrollView
          style={styles(theme).KeyboardAwareScrollView989db244}
          contentContainerStyle={
            styles(theme).KeyboardAwareScrollView6a955cc3Content
          }
        >
          {/* Header */}
          <View style={styles(theme).Viewf5275d98}>
            {/* Title */}
            <Text style={styles(theme).Text0b899493}>{'Se connecter'}</Text>
            {/* Subtitle */}
            <Text style={styles(theme).Textf51af5e8}>
              {'Connectez vous pour continuer'}
            </Text>
          </View>
          {/* Login Form */}
          <View style={styles(theme).View5cbae6f0}>
            {/* Email Input */}
            <TextInput
              onChangeText={newEmailInputValue => {
                try {
                  setEmailInputValue(newEmailInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).TextInputfb3e730b}
              value={emailInputValue}
              placeholder={'Email'}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
              autoCapitalize={'none'}
            />
            <Spacer top={12} right={8} bottom={12} left={8} />
            {/* Password Input */}
            <TextInput
              onChangeText={newPasswordInputValue => {
                try {
                  setPasswordInputValue(newPasswordInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).TextInputfb3e730b}
              value={passwordInputValue}
              placeholder={'Password'}
              secureTextEntry={true}
            />
            <Spacer top={24} right={8} bottom={24} left={8} />
            {/* Sign In Button */}
            <Button
              onPress={() => {
                const handler = async () => {
                  try {
                    const loginResponseJson =
                      await $Auth$DirectusApi.userLoginEndpointPOST(Constants, {
                        signinEmail: emailInputValue,
                        signinPassword: passwordInputValue,
                      });
                    const access_token = loginResponseJson.data.access_token;
                    if (!access_token) {
                      return;
                    }
                    setGlobalVariableValue({
                      key: 'Directus_user_token',
                      value: access_token,
                    });
                    const userJSON =
                      await $Auth$DirectusApi.gETCurrentLoggedUserGET(Constants, {
                        access_token: access_token,
                      });
                    const userOKEN = userJSON.data.token;
                    setGlobalVariableValue({
                      key: 'Directus_user_token',
                      value: userOKEN,
                    });
                    const userRole = userJSON.data.role.id;
                    setGlobalVariableValue({
                      key: 'Directus_user_role',
                      value: userRole,
                    });
                    conditionnalNav(userRole);
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              style={styles(theme).Buttonfcc82734}
              title={'Connexion'}
            >
              {'Sign Up'}
            </Button>
            <Spacer top={16} right={8} bottom={16} left={8} />
            <View style={styles(theme).Viewb6df9a71}>
              <Text>{'Pas encore de compte ?'}</Text>
              <Spacer top={8} right={2} bottom={8} left={2} />
              {/* Sign Up Link */}
              <Link
                onPress={() => {
                  try {
                    navigation.navigate('SimpleRegistrationScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles(theme).Linkd3707c9f}
                title={"S'inscrire"}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScreenContainer>
  );
};

const styles = theme =>
  StyleSheet.create({
    Buttonfcc82734: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      paddingBottom: 16,
      paddingTop: 16,
      textAlign: 'center',
    },
    KeyboardAwareScrollView6a955cc3Content: { justifyContent: 'center' },
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
    TextInputfb3e730b: {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      fontFamily: 'System',
      fontWeight: '400',
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
    },
    Textf51af5e8: {
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '400',
      marginTop: 4,
    },
    View5cbae6f0: { marginTop: 64, paddingLeft: 36, paddingRight: 36 },
    Viewb6df9a71: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 12,
    },
    Viewf5275d98: { alignItems: 'center', marginTop: 64 },
  });

export default withTheme(SimpleLoginScreen);
