import React from 'react';
import * as $Auth$DirectusApi from '../apis/$Auth$DirectusApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import {
  Button,
  CircleImage,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const EditProfileScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const $Auth$DirectusEDITCurrentUserInformationsPATCH =
    $Auth$DirectusApi.useEDITCurrentUserInformationsPATCH();

  const [adresseValue, setAdresseValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
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
          <$Auth$DirectusApi.FetchGETCurrentLoggedUserGET
            access_token={Constants['Directus_user_token']}
          >
            {({ loading, error, data, refetchGETCurrentLoggedUser }) => {
              const fetchData = data;
              if (!fetchData || loading) {
                return <ActivityIndicator />;
              }

              if (error) {
                return (
                  <Text style={{ textAlign: 'center' }}>
                    There was a problem fetching this data
                  </Text>
                );
              }

              return (
                <View style={styles(theme).Viewc42d7aae}>
                  <View style={styles(theme).Viewd3a86f31}>
                    {/* InputBloc */}
                    <View style={styles(theme).View8f114c8b}>
                      <Text style={styles(theme).Text87753946}>
                        {'Nom de famille :'}
                      </Text>
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
                        placeholder={fetchData?.data?.last_name}
                      />
                    </View>
                    {/* InputBloc */}
                    <View style={styles(theme).View8f114c8b}>
                      <Text style={styles(theme).Text87753946}>
                        {'Prénom :'}
                      </Text>
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
                        placeholder={fetchData?.data?.first_name}
                      />
                    </View>
                    {/* InputBloc */}
                    <View style={styles(theme).View8f114c8b}>
                      <Text style={styles(theme).Text87753946}>
                        {'Adresse postal :'}
                      </Text>
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
                        placeholder={fetchData?.data?.location}
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
                                email: fetchData?.data?.email,
                                nom: lastNameValue,
                                prenom: firstNameValue,
                              }
                            );
                            navigation.navigate('NeedsScreen');
                          } catch (err) {
                            console.error(err);
                          }
                        };
                        handler();
                      }}
                      style={styles(theme).Buttonbf3ae4f6}
                      loading={false}
                      title={'Enregistrer mon profil'}
                    />
                  </View>
                </View>
              );
            }}
          </$Auth$DirectusApi.FetchGETCurrentLoggedUserGET>
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
    Fetch431eb058: { minHeight: 40 },
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    ScrollViewdf29e2e2: { width: '100%' },
    Text613b05f2: {
      color: theme.colors.medium,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
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
    View8f114c8b: { marginBottom: 12, marginTop: 12, width: '100%' },
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
    Viewd3a86f31: { alignItems: 'flex-start', width: '90%' },
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

export default withTheme(EditProfileScreen);
