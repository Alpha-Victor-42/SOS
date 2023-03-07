import React from 'react';
import * as $Auth$DirectusApi from '../apis/$Auth$DirectusApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import { IconButton, ScreenContainer, withTheme } from '@draftbit/ui';
import { Image, StyleSheet, Text, View } from 'react-native';

const WhoAreYouScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const $Auth$DirectusEDITCurrentUserRolePATCH =
    $Auth$DirectusApi.useEDITCurrentUserRolePATCH();

  return (
    <ScreenContainer style={styles(theme).screen} scrollable={true}>
      <View style={styles(theme).View8998d6e5}>
        <View style={styles(theme).View689468f8}>
          <Image
            style={styles(theme).Imagea8ea3fab}
            resizeMode={'contain'}
            source={Images.Logosn}
          />
        </View>

        <View style={styles(theme).View1d8bd958}>
          {/* H1 */}
          <Text style={styles(theme).Text553281f2}>{'Qui êtes vous ?'}</Text>
          {/* Paragraphe */}
          <Text style={styles(theme).Texte9a2a789}>
            {
              '"Patient Acteur" s\'adapte en fonction de mes besoins. Je sélectionne ma situation :'
            }
          </Text>

          <View style={styles(theme).View39f6c313}>
            <View>
              {/* H1 */}
              <Text style={styles(theme).Text7cc185ff}>
                {'Je suis patient'}
              </Text>
              {/* Paragraphe */}
              <Text style={styles(theme).Text0bf9c6bf}>
                {'Vous êtes suivi dans le\ncadre du parcours de\nsoins.'}
              </Text>
            </View>
            <IconButton
              onPress={() => {
                const handler = async () => {
                  try {
                    await $Auth$DirectusEDITCurrentUserRolePATCH.mutateAsync({
                      access_token: Constants['Directus_user_token'],
                      role: '9ae6b62b-2a00-4b89-888a-cec02ead1702',
                    });
                    navigation.navigate('HomeScreen');
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              icon={'Ionicons/chevron-forward-circle'}
              color={theme.colors.background}
              size={42}
            />
          </View>

          <View style={styles(theme).Viewe61851c9}>
            <View>
              {/* H1 */}
              <Text style={styles(theme).Text7cc185ff}>{'Je suis aidant'}</Text>
              {/* Paragraphe */}
              <Text style={styles(theme).Text0bf9c6bf}>
                {
                  'Famille, amis, vous\nsoutenez un patient dans\nson parcours de soins.'
                }
              </Text>
            </View>
            <IconButton
              onPress={() => {
                const handler = async () => {
                  try {
                    await $Auth$DirectusEDITCurrentUserRolePATCH.mutateAsync({
                      access_token: Constants['Directus_user_token'],
                      role: 'a92df645-dd14-4586-896e-1a9762266431',
                    });
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              icon={'Ionicons/chevron-forward-circle'}
              size={42}
              color={theme.colors.primary}
            />
          </View>
        </View>
      </View>
      <Image
        style={styles(theme).Imageaafa42c4}
        source={Images.Illustration}
        resizeMode={'contain'}
      />
    </ScreenContainer>
  );
};

const styles = theme =>
  StyleSheet.create({
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    Imageaafa42c4: {
      bottom: -60,
      height: 260,
      left: 0,
      position: 'absolute',
      width: 260,
    },
    Text0bf9c6bf: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 14,
    },
    Text553281f2: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 26,
      marginBottom: 16,
      marginTop: 32,
    },
    Text7cc185ff: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 26,
      marginBottom: 16,
    },
    Texte9a2a789: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
    },
    View1d8bd958: { alignItems: 'center', paddingLeft: 16, paddingRight: 16 },
    View39f6c313: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
      marginTop: 16,
      paddingBottom: 32,
      paddingTop: 32,
      width: '100%',
    },
    View689468f8: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      paddingBottom: 16,
      paddingTop: 16,
    },
    View8998d6e5: { zIndex: 1 },
    Viewe61851c9: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 32,
      paddingTop: 32,
      width: '100%',
    },
    screen: { backgroundColor: theme.colors.divider },
  });

export default withTheme(WhoAreYouScreen);
