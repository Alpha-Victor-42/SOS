import React from 'react';
import * as CustomCode from '../CustomCode';
import * as $Rest$DirectusApi from '../apis/$Rest$DirectusApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import {
  Button,
  FieldSearchBarFull,
  Icon,
  IconButton,
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

const NeedsScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const getIconURL = data => {
    if (data.Icon !== null) {
      return data.Icon.filename_disk;
    }
  };

  const { theme } = props;
  const { navigation } = props;

  const $Rest$DirectusINCREMENTBesoinsStatsPATCH =
    $Rest$DirectusApi.useINCREMENTBesoinsStatsPATCH();

  const [needsBarSearchValue, setNeedsBarSearchValue] = React.useState('');
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const [searchBarValue2, setSearchBarValue2] = React.useState('');
  const [searchBarValue3, setSearchBarValue3] = React.useState('');
  const [searchBarValue4, setSearchBarValue4] = React.useState('');
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer style={styles(theme).screen} scrollable={false}>
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

        <View style={styles(theme).Viewff15840a}>
          {/* H1 */}
          <Text style={styles(theme).Textbf8b46f5}>{'Mes besoins,'}</Text>
          {/* Paragraphe */}
          <Text style={styles(theme).Text7f8e5c85}>
            {'Je trouve des réponses à mes besoins au\ntravers de thématiques.'}
          </Text>
          {/* search_nav */}
          <View style={styles(theme).View54e9b82c}>
            <Icon
              style={styles(theme).Icon8bd683a8}
              size={24}
              name={'AntDesign/search1'}
              color={theme.colors.primary}
            />
            {/* NeedsBarSearch */}
            <FieldSearchBarFull
              onChange={newNeedsBarSearchValue => {
                try {
                  setNeedsBarSearchValue(newNeedsBarSearchValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).FieldSearchBarFull36c0edba}
              value={needsBarSearchValue}
              placeholder={'Rechercher un besoin'}
            />
          </View>
          {/* H1 */}
          <Text style={styles(theme).Text10010d1e}>
            {'Les besoins les plus\nrecherchés'}
          </Text>
          {/* All_needs */}
          <View style={styles(theme).View85689476}>
            <>
              {needsBarSearchValue ? null : (
                <$Rest$DirectusApi.FetchGETMoreSearchedBesoinsGET
                  access_token={Constants['Directus_user_token']}
                >
                  {({
                    loading,
                    error,
                    data,
                    refetchGETMoreSearchedBesoins,
                  }) => {
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
                        listKey={'ziRIwpdP'}
                        keyExtractor={listData =>
                          listData?.id ||
                          listData?.uuid ||
                          JSON.stringify(listData)
                        }
                        renderItem={({ item }) => {
                          const listData = item;
                          return (
                            <>
                              {/* Needs_card */}
                              <View style={styles(theme).View9dc3a0f0}>
                                <View style={styles(theme).Viewce4accf0}>
                                  <View style={styles(theme).View325bf3dd}>
                                    <Image
                                      style={styles(theme).Image33b61cb6}
                                      source={{
                                        uri: `https://saintnazaire.av42.com/assets/${listData?.Icon}?access_token=${Constants['Directus_victor_access_token']}`,
                                      }}
                                      resizeMode={'cover'}
                                    />
                                  </View>

                                  <View style={styles(theme).View84be2fa1}>
                                    {/* Paragraphe */}
                                    <Text style={styles(theme).Texte9a2a789}>
                                      {listData?.Label}
                                    </Text>
                                  </View>
                                </View>
                                <IconButton
                                  onPress={() => {
                                    const handler = async () => {
                                      try {
                                        setGlobalVariableValue({
                                          key: 'searchable_thematique',
                                          value: listData?.Label,
                                        });
                                        navigation.navigate('NeedtypeScreen', {
                                          besoin_label: listData?.Label,
                                          besoin_id: listData?.id,
                                          besoin_description:
                                            listData?.Description,
                                          besoin_sous_titre:
                                            listData?.Sous_titre,
                                        });
                                        await $Rest$DirectusINCREMENTBesoinsStatsPATCH.mutateAsync(
                                          {
                                            access_token:
                                              'KeCg3qna7L88cL6pK5W29fgVvMzbwzzpJkZfB4m2aE',
                                            id: listData?.id,
                                            stat: listData?.stats + 1,
                                          }
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    };
                                    handler();
                                  }}
                                  icon={'Entypo/chevron-thin-right'}
                                  size={24}
                                />
                              </View>
                            </>
                          );
                        }}
                        style={styles(theme).FlatList989db244}
                        contentContainerStyle={
                          styles(theme).FlatListc992f941Content
                        }
                        numColumns={1}
                      />
                    );
                  }}
                </$Rest$DirectusApi.FetchGETMoreSearchedBesoinsGET>
              )}
            </>
            <>
              {!needsBarSearchValue ? null : (
                <$Rest$DirectusApi.FetchSEARCHBesoinsGET
                  access_token={Constants['Directus_user_token']}
                  query={needsBarSearchValue}
                >
                  {({ loading, error, data, refetchSEARCHBesoins }) => {
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
                        listKey={'V99gxy5G'}
                        keyExtractor={listData =>
                          listData?.id ||
                          listData?.uuid ||
                          JSON.stringify(listData)
                        }
                        renderItem={({ item }) => {
                          const listData = item;
                          return (
                            <>
                              {/* Needs_card */}
                              <View style={styles(theme).View9dc3a0f0}>
                                <View style={styles(theme).Viewce4accf0}>
                                  <View style={styles(theme).View325bf3dd}>
                                    <Image
                                      style={styles(theme).Image33b61cb6}
                                      source={{
                                        uri: `https://saintnazaire.av42.com/assets/${getIconURL(
                                          listData
                                        )}?access_token=`,
                                      }}
                                      resizeMode={'cover'}
                                    />
                                  </View>

                                  <View style={styles(theme).View84be2fa1}>
                                    {/* Paragraphe */}
                                    <Text style={styles(theme).Texte9a2a789}>
                                      {listData?.Label}
                                    </Text>
                                  </View>
                                </View>
                                <IconButton
                                  onPress={() => {
                                    try {
                                      navigation.navigate('NeedtypeScreen', {
                                        besoin_label: listData?.Label,
                                        besoin_id: listData?.id,
                                        besoin_description:
                                          listData?.Description,
                                        besoin_sous_titre: listData?.Sous_titre,
                                      });
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  icon={'Entypo/chevron-thin-right'}
                                  size={24}
                                />
                              </View>
                            </>
                          );
                        }}
                        style={styles(theme).FlatList989db244}
                        contentContainerStyle={
                          styles(theme).FlatListc992f941Content
                        }
                        numColumns={1}
                      />
                    );
                  }}
                </$Rest$DirectusApi.FetchSEARCHBesoinsGET>
              )}
            </>
          </View>
          {/* Button Solid */}
          <Button
            onPress={() => {
              try {
                navigation.navigate('MoreNeedsScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles(theme).Button8ce897e6}
            title={'Voir toutes les thématiques'}
          />
        </View>
      </ScrollView>
      {/* CustomNavigationTabs */}
      <View style={styles(theme).Viewd7830eb7}>
        {/* NavLink */}
        <Touchable
          onPress={() => {
            try {
              navigation.navigate('HomeScreen');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View style={styles(theme).Vieweb8a4c38}>
            <Icon
              name={'AntDesign/appstore-o'}
              size={24}
              color={theme.colors.medium}
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
              size={24}
              color={theme.colors.medium}
              name={'Feather/check-circle'}
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
              size={24}
              color={theme.colors.medium}
              name={'AntDesign/user'}
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
              size={24}
              color={theme.colors.medium}
              name={'MaterialCommunityIcons/calendar-range-outline'}
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
    Fetch431eb058: { minHeight: 40 },
    FieldSearchBarFull36c0edba: { height: 24, width: '90%' },
    FlatListc992f941Content: { flex: 1 },
    Icon8bd683a8: { marginRight: 6 },
    Image33b61cb6: { height: 24, width: 24 },
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    Text10010d1e: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 26,
      marginBottom: 16,
      textAlign: 'center',
    },
    Text613b05f2: {
      color: theme.colors.medium,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text7f8e5c85: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
      marginBottom: 16,
      textAlign: 'center',
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
    View325bf3dd: {
      alignItems: 'center',
      backgroundColor: theme.colors.lightOrangePrimary,
      borderRadius: 12,
      height: 80,
      justifyContent: 'center',
      marginRight: 12,
      width: 80,
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
    View84be2fa1: { maxWidth: 200 },
    View85689476: { marginBottom: 16, marginTop: 16 },
    View9dc3a0f0: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 3,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 12,
    },
    Viewbc51ffcc: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      height: 80,
      justifyContent: 'center',
      marginRight: 12,
      width: 80,
    },
    Viewce4accf0: { alignItems: 'center', flexDirection: 'row' },
    Viewd7830eb7: {
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 8,
      paddingTop: 8,
    },
    Viewd8fb5662: { marginBottom: 16 },
    Vieweb8a4c38: { alignItems: 'center', justifyContent: 'center' },
    Viewed9f2fbc: {
      alignItems: 'center',
      backgroundColor: theme.colors.lightBluePrimary,
      borderRadius: 12,
      height: 80,
      justifyContent: 'center',
      marginRight: 12,
      width: 80,
    },
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
    Viewff15840a: { marginBottom: 16, paddingLeft: 16, paddingRight: 16 },
    screen: { backgroundColor: theme.colors.divider },
  });

export default withTheme(NeedsScreen);
