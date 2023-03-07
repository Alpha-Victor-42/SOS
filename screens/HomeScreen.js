import React from 'react';
import * as $Auth$DirectusApi from '../apis/$Auth$DirectusApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import {
  Button,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const HomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const currentUSER = await $Auth$DirectusApi.gETCurrentLoggedUserGET(
          Constants,
          { access_token: Constants['Directus_user_token'] }
        );
        const userFIRSTNAME = currentUSER.data.first_name;
        setUser_firstname(userFIRSTNAME);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [user_firstname, setUser_firstname] = React.useState('');

  return (
    <ScreenContainer style={styles(theme).screen} scrollable={false}>
      <ScrollView
        style={styles(theme).ScrollViewdf29e2e2}
        contentContainerStyle={styles(theme).ScrollView989db244Content}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        {/* BaseNavigationBar */}
        <View style={styles(theme).Viewf900302f}>
          <View style={styles(theme).View18b2c15c} />
          <Image
            style={styles(theme).Imagea8ea3fab}
            resizeMode={'contain'}
            source={Images.Logosn}
          />
          <View style={styles(theme).View18b2c15c} />
        </View>

        <View style={styles(theme).View19b4e025}>
          {/* H1 */}
          <Text style={styles(theme).Text62da20e0}>
            {'Bonjour '}
            {user_firstname}
            {','}
          </Text>
          {/* Card */}
          <View style={styles(theme).View77fcab56}>
            <View style={styles(theme).View277c1da5}>
              <Image
                style={styles(theme).Image3c1d0600}
                resizeMode={'cover'}
                source={Images.Illustration1}
              />
              <View>
                <Text style={styles(theme).Text3b8584b3}>{'Mes besoins'}</Text>

                <Text style={styles(theme).Text33369b7c}>
                  {
                    'Les traitements bouleversent\nvotre quotidien. Retrouvez tous \nles conseils pour vous aider à \ntraverser cette période.'
                  }
                </Text>
              </View>
            </View>
            {/* Button Solid */}
            <Button
              onPress={() => {
                try {
                  navigation.navigate('NeedsScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).Button8ce897e6}
              title={"J'ai un besoin"}
            />
          </View>
          {/* Card */}
          <View style={styles(theme).View9a2bcde0}>
            <View style={styles(theme).View277c1da5}>
              <Image
                style={styles(theme).Image3c1d0600}
                resizeMode={'cover'}
                source={Images.Illustration3}
              />
              <View>
                <Text style={styles(theme).Text3b8584b3}>
                  {'Mes objectifs'}
                </Text>

                <Text style={styles(theme).Text33369b7c}>
                  {
                    'A votre rythme, fixez vous des\nobjectifs à atteindre pour faire\nface aux bouleversements liés\nà la maladie.'
                  }
                </Text>
              </View>
            </View>
            {/* Button Solid */}
            <Button
              onPress={() => {
                try {
                  navigation.navigate('AgendaScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).Button8ce897e6}
              title={'Consulter mon agenda'}
            />
          </View>
        </View>
      </ScrollView>
      {/* CustomNavigationTabs */}
      <View style={styles(theme).Viewbe012db3}>
        {/* NavLink-current */}
        <Touchable>
          <View style={styles(theme).Vieweb8a4c38}>
            <Icon
              name={'AntDesign/appstore-o'}
              size={24}
              color={theme.colors.primary}
            />
            <Text style={styles(theme).Text86c1c295}>{'Accueil'}</Text>
          </View>
        </Touchable>
        {/* NavLink */}
        <Touchable
          onPress={() => {
            try {
              navigation.navigate('GoalsScreen');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View style={styles(theme).Vieweb8a4c38}>
            <Icon
              name={'Feather/check-circle'}
              size={24}
              color={theme.colors.medium}
            />
            <Text style={styles(theme).Text613b05f2}>{'Mes objectifs'}</Text>
          </View>
        </Touchable>
        {/* NavLink */}
        <Touchable
          onPress={() => {
            try {
              navigation.navigate('ContactsScreen');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View style={styles(theme).Vieweb8a4c38}>
            <Icon
              name={'AntDesign/user'}
              size={24}
              color={theme.colors.medium}
            />
            <Text style={styles(theme).Text613b05f2}>{'Mes contacts'}</Text>
          </View>
        </Touchable>
        {/* NavLink */}
        <Touchable
          onPress={() => {
            try {
              navigation.navigate('AgendaScreen');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View style={styles(theme).Vieweb8a4c38}>
            <Icon
              name={'MaterialCommunityIcons/calendar-range-outline'}
              size={24}
              color={theme.colors.medium}
            />
            <Text style={styles(theme).Text613b05f2}>{'Mon agenda'}</Text>
          </View>
        </Touchable>
      </View>
    </ScreenContainer>
  );
};

const styles = theme =>
  StyleSheet.create({
    Button8ce897e6: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      textAlign: 'center',
    },
    Image3c1d0600: { height: 100, marginRight: 12, width: 100 },
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    ScrollViewdf29e2e2: { width: '100%' },
    Text33369b7c: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text3b8584b3: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 20,
    },
    Text613b05f2: {
      color: theme.colors.medium,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text62da20e0: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 26,
      marginBottom: 12,
      marginTop: 20,
      textAlign: 'center',
    },
    Text86c1c295: {
      color: theme.colors.primary,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    View18b2c15c: { width: 24 },
    View19b4e025: {
      marginBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      width: '100%',
    },
    View277c1da5: { flexDirection: 'row', marginBottom: 16 },
    View77fcab56: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      marginTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 12,
      width: '100%',
    },
    View9a2bcde0: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      marginTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 12,
      width: '100%',
    },
    Viewbe012db3: {
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 8,
      paddingTop: 8,
      width: '100%',
    },
    Vieweb8a4c38: { alignItems: 'center', justifyContent: 'center' },
    Viewf900302f: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      width: '100%',
    },
    screen: { alignItems: 'center', backgroundColor: theme.colors.divider },
  });

export default withTheme(HomeScreen);
