import React from 'react';
import * as CustomCode from '../CustomCode';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import {
  AudioPlayer,
  Button,
  CircleImage,
  ScreenContainer,
  Swiper,
  SwiperItem,
  withTheme,
} from '@draftbit/ui';
import { Image, StyleSheet, Text, View } from 'react-native';

const WelcomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  // to use a global variable
  const variables = CustomCode.useValues();
  // to update or modify the value of a global variable
  const setVariable = CustomCode.useSetValue();
  const { theme } = props;
  const { navigation } = props;

  return (
    <ScreenContainer>
      <Swiper
        style={styles(theme).Swiper8dc796a9}
        dotColor={theme.colors.light}
        dotsTouchable={true}
        dotActiveColor={theme.colors.secondary}
      >
        <SwiperItem>
          {/* Welcome-Slide-First */}
          <View style={styles(theme).View2200bac7}>
            <View style={styles(theme).Vieweb8a4c38}>
              <Image
                style={styles(theme).Image852eb084}
                source={Images.LogoBig}
                resizeMode={'cover'}
              />
              <Image
                style={styles(theme).Image4f06a827}
                source={Images.Img}
                resizeMode={'cover'}
              />
            </View>

            <View style={styles(theme).Viewdb8c559f}>
              {/* H1 */}
              <Text style={styles(theme).Text63930b9b}>{'Bienvenue'}</Text>
              {/* Paragraphe */}
              <Text style={styles(theme).Texte9a2a789}>
                {
                  'Patient Acteur est une application imaginée et conçue par les soignants et les patients pour les patients atteints d’un cancer et leurs proches.\n\nQue vous soyez patient ou aidant, l’application vous aide à faire face aux bouleversements causés par la maladie en fonction de vos besoins.'
                }
              </Text>
            </View>
          </View>
        </SwiperItem>

        <SwiperItem>
          <View style={styles(theme).View39912261}>
            <Image
              style={styles(theme).Image89be0aac}
              resizeMode={'contain'}
              source={Images.Logosn}
            />
            <CircleImage
              style={styles(theme).CircleImageff709fb4}
              source={Images.Img}
              size={80}
            />
            <View style={styles(theme).Viewed56702f}>
              <Text style={styles(theme).Text15ebf7eb}>
                {
                  'L’application Patient Acteur s’adapte à toutes les situations. Vous allez pouvoir personnaliser votre profil et bénéficier d’un contenu adapté à vos préoccupations.'
                }
              </Text>

              <Text style={styles(theme).Text99d92b8d}>
                {'Vous retrouverez :'}
              </Text>

              <Text style={styles(theme).Texte9a2a789}>
                {
                  "- Des conseils en fonction de vos besoins.\n- Une géolocalisation des professionnels et associations près de chez vous.\n- Des petits objectifs à atteindre pour aller de l'avant.\n- Votre agenda pour visualiser votre parcours de soins."
                }
              </Text>
              {/* BigButton */}
              <Button
                onPress={() => {
                  try {
                    navigation.navigate('CompletProfileScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={styles(theme).Buttonbf3ae4f6}
                title={'Je complète mon profil'}
                loading={false}
              />
            </View>
          </View>
        </SwiperItem>
      </Swiper>
    </ScreenContainer>
  );
};

const styles = theme =>
  StyleSheet.create({
    AudioPlayerc63e6d27: {
      alignItems: 'center',
      backgroundColor: '#eee',
      borderRadius: 24,
      flexDirection: 'row',
      paddingBottom: 8,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
    },
    Buttonbf3ae4f6: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      marginBottom: 32,
      marginTop: 32,
      textAlign: 'center',
    },
    CircleImageff709fb4: { marginBottom: 32, marginTop: 32 },
    Image4f06a827: { height: 300, width: '100%' },
    Image852eb084: { height: 50, position: 'absolute', width: 150, zIndex: 1 },
    Image89be0aac: { height: 37, marginTop: 32, opacity: 1, width: 90 },
    Swiper8dc796a9: { height: '100%', width: '100%' },
    Text15ebf7eb: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
      marginBottom: 24,
    },
    Text63930b9b: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 26,
      textAlign: 'center',
    },
    Text99d92b8d: {
      alignSelf: 'flex-start',
      color: theme.colors.primary,
      fontFamily: 'Poppins_500Medium',
      fontSize: 14,
      marginBottom: 16,
      textAlign: 'left',
    },
    Texte9a2a789: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
    },
    View2200bac7: { height: '100%' },
    View39912261: { alignItems: 'center' },
    Viewdb8c559f: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      bottom: 0,
      height: 450,
      justifyContent: 'space-evenly',
      left: 0,
      paddingLeft: 16,
      paddingRight: 16,
      position: 'absolute',
      right: 0,
    },
    Vieweb8a4c38: { alignItems: 'center', justifyContent: 'center' },
    Viewed56702f: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      bottom: 0,
      justifyContent: 'space-around',
      left: 0,
      paddingLeft: 16,
      paddingRight: 16,
      right: 0,
    },
  });

export default withTheme(WelcomeScreen);
