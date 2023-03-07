import React from 'react';
import * as $Rest$DirectusApi from '../apis/$Rest$DirectusApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import {
  ActionSheet,
  ActionSheetCancel,
  ActionSheetItem,
  FieldSearchBarFull,
  Icon,
  IconButton,
  Link,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const ContactsScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const $Rest$DirectusDELETEContactDELETE =
    $Rest$DirectusApi.useDELETEContactDELETE();

  const [modal, setModal] = React.useState(false);
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const [selectedContact, setSelectedContact] = React.useState(0);

  return (
    <ScreenContainer style={styles(theme).screen}>
      <ActionSheet visible={modal}>
        <ActionSheetItem
          onPress={() => {
            const handler = async () => {
              try {
                await $Rest$DirectusDELETEContactDELETE.mutateAsync({
                  access_token: Constants['Directus_user_token'],
                  id: selectedContact,
                });
                setModal(false);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={styles(theme).ActionSheetItemc521608b}
          color={theme.colors.primary}
          label={'Supprimer le contact'}
        />
        <ActionSheetCancel
          onPress={() => {
            try {
              setModal(false);
            } catch (err) {
              console.error(err);
            }
          }}
          label={'Annuler'}
        />
      </ActionSheet>

      <ScrollView showsVerticalScrollIndicator={true} bounces={true}>
        {/* BaseNavigationBar */}
        <View style={styles(theme).Viewf900302f}>
          <IconButton
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
            icon={'Entypo/chevron-thin-left'}
            size={24}
          />
          <Image
            style={styles(theme).Imagea8ea3fab}
            resizeMode={'contain'}
            source={Images.Logosn}
          />
          <IconButton
            onPress={() => {
              try {
                navigation.navigate('EditProfileScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            icon={'FontAwesome/user'}
            size={24}
            color={theme.colors.primary}
          />
        </View>

        <View style={styles(theme).View9fa86917}>
          {/* H1 */}
          <Text style={styles(theme).Textbf8b46f5}>{'Mes contacts'}</Text>
          {/* search_nav */}
          <View style={styles(theme).View54e9b82c}>
            <Icon
              style={styles(theme).Icon8bd683a8}
              name={'AntDesign/search1'}
              size={24}
              color={theme.colors.primary}
            />
            <FieldSearchBarFull
              onChange={newSearchBarValue => {
                try {
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).FieldSearchBarFull36c0edba}
              placeholder={'Rechercher un contact'}
            />
          </View>

          <$Rest$DirectusApi.FetchGETContactsGET
            access_token={Constants['Directus_user_token']}
            current_user_access_token={Constants['Directus_user_token']}
            onData={fetchData => {
              try {
                const contactsData = fetchData?.data;
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {({ loading, error, data, refetchGETContacts }) => {
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
                <FlatList
                  data={fetchData?.data}
                  listKey={'KbgbrTOm'}
                  keyExtractor={listData =>
                    listData?.id || listData?.uuid || JSON.stringify(listData)
                  }
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <>
                        {/* contact_blc */}
                        <View style={styles(theme).View30296326}>
                          <View style={styles(theme).View4d1ef0a7}>
                            <View style={styles(theme).View4b5d531a}>
                              {/* H3 */}
                              <>
                                {!listData?.Nom ? null : (
                                  <Text style={styles(theme).Textbd08dd8d}>
                                    {listData?.Nom}
                                  </Text>
                                )}
                              </>
                              {/* Paragraphe */}
                              <>
                                {!listData?.Type ? null : (
                                  <Text style={styles(theme).Texte9a2a789}>
                                    {listData?.Type}
                                  </Text>
                                )}
                              </>
                            </View>
                            <IconButton
                              onPress={() => {
                                try {
                                  setModal(true);
                                  setSelectedContact(listData?.id);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              size={24}
                              icon={'Entypo/dots-three-vertical'}
                              color={theme.colors.primary}
                            />
                          </View>

                          <View style={styles(theme).View2ff3a84c}>
                            {/* Paragraphe */}
                            <>
                              {!listData?.Adresse ? null : (
                                <Text style={styles(theme).Text3d5d4f61}>
                                  {listData?.Adresse}
                                </Text>
                              )}
                            </>
                            <Link
                              style={styles(theme).Linkc5d6e3b2}
                              title={`${listData?.Telephone}`}
                            />
                            <Link
                              style={styles(theme).Link97a65d2a}
                              title={`${listData?.Email}`}
                            />
                          </View>
                        </View>
                      </>
                    );
                  }}
                  style={styles(theme).FlatList989db244}
                  contentContainerStyle={styles(theme).FlatListc992f941Content}
                  numColumns={1}
                />
              );
            }}
          </$Rest$DirectusApi.FetchGETContactsGET>
        </View>
      </ScrollView>
      {/* CustomNavigationTabs */}
      <View style={styles(theme).Viewbe012db3}>
        {/* NavLink */}
        <Touchable
          onPress={() => {
            try {
              navigation.navigate('NeedsScreen');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View style={styles(theme).Vieweb8a4c38}>
            <Icon
              size={24}
              color={theme.colors.medium}
              name={'AntDesign/appstore-o'}
            />
            <Text style={styles(theme).Text613b05f2}>{'Accueil'}</Text>
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
        {/* NavLink-current */}
        <Touchable>
          <View style={styles(theme).Vieweb8a4c38}>
            <Icon
              size={24}
              color={theme.colors.primary}
              name={'AntDesign/user'}
            />
            <Text style={styles(theme).Text86c1c295}>{'Mes contacts'}</Text>
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
    ActionSheetItemc521608b: { textAlign: 'center' },
    Fetch431eb058: { minHeight: 40 },
    FieldSearchBarFull36c0edba: { height: 24, width: '90%' },
    FlatListc992f941Content: { flex: 1 },
    Icon8bd683a8: { marginRight: 6 },
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    Link97a65d2a: {
      color: theme.colors.background,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
      textDecorationLine: 'underline',
    },
    Linkc5d6e3b2: {
      color: theme.colors.background,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
      marginBottom: 4,
      textDecorationLine: 'underline',
    },
    Text3d5d4f61: {
      color: theme.colors.background,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
      marginBottom: 4,
    },
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
    Textbd08dd8d: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 18,
      marginBottom: 8,
    },
    Textbf8b46f5: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 26,
      marginBottom: 16,
      marginTop: 32,
      textAlign: 'center',
    },
    Texte9a2a789: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
    },
    View2ff3a84c: {
      backgroundColor: theme.colors.primary,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
      paddingBottom: 6,
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 6,
      width: '98%',
    },
    View30296326: { alignItems: 'center', borderRadius: 6, marginBottom: 12 },
    View4b5d531a: { maxWidth: 300 },
    View4d1ef0a7: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      width: '100%',
    },
    View54e9b82c: {
      borderBottomWidth: 1,
      borderColor: theme.colors.primary,
      borderLeftWidth: 1,
      borderRadius: 6,
      borderRightWidth: 1,
      borderTopWidth: 1,
      flexDirection: 'row',
      marginBottom: 16,
      paddingBottom: 6,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 6,
      width: '100%',
    },
    View9fa86917: { paddingLeft: 16, paddingRight: 16 },
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
    screen: { backgroundColor: theme.colors.divider },
  });

export default withTheme(ContactsScreen);
