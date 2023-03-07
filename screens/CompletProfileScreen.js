import React from 'react';
import * as $Auth$DirectusApi from '../apis/$Auth$DirectusApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as Utils from '../utils';
import {
  Button,
  CircleImage,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const CompletProfileScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const $Auth$DirectusEDITCurrentUserInformationsPATCH =
    $Auth$DirectusApi.useEDITCurrentUserInformationsPATCH();
  const $Auth$DirectusEDITCurrentUserRolePATCH =
    $Auth$DirectusApi.useEDITCurrentUserRolePATCH();

  const [adresseValue, setAdresseValue] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState(
    'https://static.draftbit.com/images/placeholder-image.png'
  );
  const [firstNameValue, setFirstNameValue] = React.useState('');
  const [lastNameValue, setLastNameValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

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
          <View />
        </View>

        <View style={styles(theme).View19b4e025}>
          {/* Paragraphe */}
          <Text style={styles(theme).Text768da39f}>
            {
              'Afin de personnaliser votre recherche de professionnels de santé. Nous vous invitons à renseigner ces quelques informations.'
            }
          </Text>
          {/* InputBloc */}
          <View style={styles(theme).Viewb5c900de}>
            <Text style={styles(theme).Text87753946}>{'Nom de famille :'}</Text>
            {/* LastName */}
            <TextInput
              onChangeText={newLastNameValue => {
                try {
                  setLastNameValue(newLastNameValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).TextInput24675a14}
              value={lastNameValue}
              placeholder={'Ex: DUPONT'}
            />
          </View>
          {/* InputBloc */}
          <View style={styles(theme).Viewb5c900de}>
            <Text style={styles(theme).Text87753946}>{'Prénom :'}</Text>
            {/* FirstName */}
            <TextInput
              onChangeText={newFirstNameValue => {
                try {
                  setFirstNameValue(newFirstNameValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).TextInput24675a14}
              value={firstNameValue}
              placeholder={'Ex: Jean'}
            />
          </View>
          {/* InputBloc */}
          <View style={styles(theme).Viewb5c900de}>
            <Text style={styles(theme).Text87753946}>{'Adresse postal :'}</Text>
            {/* Adresse */}
            <TextInput
              onChangeText={newAdresseValue => {
                try {
                  setAdresseValue(newAdresseValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).TextInput24675a14}
              value={adresseValue}
              placeholder={'Ex: 13 rue des cerises, 51000 Reims'}
            />
          </View>
          {/* BigButton */}
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  if (!lastNameValue) {
                    return;
                  }
                  if (!firstNameValue) {
                    return;
                  }
                  if (!adresseValue) {
                    return;
                  }
                  await $Auth$DirectusEDITCurrentUserInformationsPATCH.mutateAsync(
                    {
                      access_token: Constants['Directus_user_token'],
                      adresse: adresseValue,
                      nom: lastNameValue,
                      prenom: firstNameValue,
                    }
                  );
                  await $Auth$DirectusEDITCurrentUserRolePATCH.mutateAsync({
                    access_token: Constants['Directus_user_token'],
                    role: '23ce5be3-a95e-48c1-9f3e-54f6a8d7a7a2',
                  });
                  navigation.navigate('WhoAreYouScreen');
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={styles(theme).Buttonbf3ae4f6}
            title={'Démarrer maintenant'}
            loading={false}
          />
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
    Buttonbf3ae4f6: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      marginBottom: 32,
      marginTop: 32,
      textAlign: 'center',
    },
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    ScrollViewdf29e2e2: { width: '100%' },
    Text613b05f2: {
      color: theme.colors.medium,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text768da39f: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
      marginTop: 32,
    },
    Text86c1c295: {
      color: theme.colors.primary,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text87753946: { color: theme.colors.strong, marginBottom: 4 },
    TextInput24675a14: {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      fontFamily: 'Poppins_400Regular',
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
    },
    View18b2c15c: { width: 24 },
    View19b4e025: {
      marginBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      width: '100%',
    },
    Viewb5c900de: { marginBottom: 12, marginTop: 12 },
    Viewbe012db3: {
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 8,
      paddingTop: 8,
      width: '100%',
    },
    Viewc42d7aae: { alignItems: 'center', marginTop: 16 },
    Viewcb4f9616: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 64,
      bottom: -10,
      height: 30,
      justifyContent: 'center',
      position: 'absolute',
      right: -10,
      width: 30,
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

export default withTheme(CompletProfileScreen);
