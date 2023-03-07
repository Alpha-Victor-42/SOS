import React from 'react';
import * as CustomCode from '../CustomCode';
import * as $Rest$DirectusApi from '../apis/$Rest$DirectusApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as Utils from '../utils';

import {
  Icon,
  IconButton,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Video } from 'expo-av';
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

const NeedtypeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const getIconUrl = data => {
    if (data.Icon !== null) {
      return data.Icon.filename_disk;
    }
  };

  const dataGenresToGroupButtons = data => {
    let toggles = [];

    data.data.forEach(e => {
      toggles.push(e['Sexe']);
    });

    return toggles.join(',');
  };
  const variables = CustomCode.useValues();
  const setVariables = CustomCode.useSetValue();
  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const genresResultJSON = await $Rest$DirectusApi.gETGenresGET(
          Constants,
          { access_token: Constants['Directus_user_token'] }
        );
        const firstEntryGenre = genresResultJSON.data[0].Sexe;
        setGlobalVariableValue({
          key: 'pageSelectedToggle',
          value: 'Femme',
        });
        const transformedData = dataGenresToGroupButtons(genresResultJSON);
        setGlobalVariableValue({
          key: 'pageToggles',
          value: transformedData,
        });
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer style={styles(theme).screen}>
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

        <View style={styles(theme).View1d8bd958}>
          {/* H1 */}
          <Text style={styles(theme).Textbf8b46f5}>
            {props.route?.params?.besoin_label ?? ''}
          </Text>
          {/* Paragraphe */}
          <Text style={styles(theme).Text9464d1ca}>
            {props.route?.params?.besoin_description ?? ''}
          </Text>

          <View style={styles(theme).Viewdf29e2e2}>
            <$Rest$DirectusApi.FetchGETTemoignagesGET
              access_token={Constants['Directus_user_token']}
              besoin_id={props.route?.params?.besoin_id ?? ''}
            >
              {({ loading, error, data, refetchGETTemoignages }) => {
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
                    listKey={'c6K7JZjT'}
                    keyExtractor={listData =>
                      listData?.id || listData?.uuid || JSON.stringify(listData)
                    }
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {/* H3 */}
                          <Text style={styles(theme).Text03467433}>
                            {listData?.Title}
                          </Text>
                          {/* CitationBlock */}
                          <View style={styles(theme).Viewbd814785}>
                            <Icon
                              name={'Entypo/quote'}
                              size={16}
                              color={theme.colors.primary}
                            />
                            {/* Paragraphe */}
                            <Text style={styles(theme).Text33369b7c}>
                              {listData?.Sous_titre}
                            </Text>
                          </View>
                          <Video
                            style={styles(theme).Videob4383d11}
                            source={{ uri: `${listData?.Video}` }}
                            resizeMode={'cover'}
                            useNativeControls={true}
                          />
                        </>
                      );
                    }}
                    style={styles(theme).FlatListdf29e2e2}
                    contentContainerStyle={
                      styles(theme).FlatListc992f941Content
                    }
                    numColumns={1}
                  />
                );
              }}
            </$Rest$DirectusApi.FetchGETTemoignagesGET>
          </View>
          {/* H1 */}
          <Text style={styles(theme).Text10010d1e}>
            {props.route?.params?.besoin_sous_titre ?? ''}
          </Text>

          <Text style={styles(theme).Text9cf37303}>
            {'Filtrer le contenu :'}
          </Text>

          <View style={styles(theme).View277c1da5}>
            <Utils.CustomCodeErrorBoundary>
              <CustomCode.ToggleGroupButtons />
            </Utils.CustomCodeErrorBoundary>
          </View>

          <$Rest$DirectusApi.FetchGETSousBesoinsGET
            access_token={Constants['Directus_user_token']}
            besoin_id={props.route?.params?.besoin_id ?? ''}
            genre={Constants['pageSelectedToggle']}
          >
            {({ loading, error, data, refetchGETSousBesoins }) => {
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
                <View style={styles(theme).View1e349bf4}>
                  <FlatList
                    data={fetchData?.data}
                    listKey={'DCEqJpxH'}
                    keyExtractor={listData =>
                      listData?.id || listData?.uuid || JSON.stringify(listData)
                    }
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {/* ActionCard */}
                          <Touchable
                            onPress={() => {
                              try {
                                setGlobalVariableValue({
                                  key: 'searchable_besoin',
                                  value: listData?.Label,
                                });
                                navigation.navigate('NeedtypesoinScreen', {
                                  sous_besoin_id: listData?.id,
                                  sous_besoin_label: listData?.Label,
                                  sous_besoin_description:
                                    listData?.Description,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            style={styles(theme).Touchablef24ae7aa}
                          >
                            <View style={styles(theme).Viewa8615c63}>
                              <Image
                                style={styles(theme).Image5db562ea}
                                resizeMode={'cover'}
                                source={{
                                  uri: `https://saintnazaire.av42.com/assets/${getIconUrl(
                                    listData
                                  )}?access_token=${
                                    Constants['Directus_user_token']
                                  }`,
                                }}
                              />
                              {/* Paragraphe */}
                              <Text style={styles(theme).Text8d71aa65}>
                                {listData?.Label}
                              </Text>
                            </View>
                          </Touchable>
                        </>
                      );
                    }}
                    style={styles(theme).FlatList989db244}
                    contentContainerStyle={
                      styles(theme).FlatListcb7d0676Content
                    }
                    numColumns={1}
                    horizontal={true}
                  />
                </View>
              );
            }}
          </$Rest$DirectusApi.FetchGETSousBesoinsGET>
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
    Fetch431eb058: { minHeight: 40 },
    FlatListc992f941Content: { flex: 1 },
    FlatListcb7d0676Content: {
      flex: 1,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    FlatListdf29e2e2: { width: '100%' },
    Image5db562ea: { height: 30, marginBottom: 16, width: 30 },
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    Text03467433: {
      alignSelf: 'flex-start',
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 16,
      textAlign: 'left',
    },
    Text10010d1e: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 26,
      marginBottom: 16,
      textAlign: 'center',
    },
    Text33369b7c: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text613b05f2: {
      color: theme.colors.medium,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text8d71aa65: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 14,
      textAlign: 'center',
    },
    Text9464d1ca: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
      marginBottom: 16,
    },
    Text9cf37303: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      marginBottom: 16,
    },
    Textbf8b46f5: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 26,
      marginBottom: 16,
      marginTop: 32,
      textAlign: 'center',
    },
    Touchablef24ae7aa: {
      marginBottom: 16,
      maxHeight: 160,
      minHeight: 140,
      width: 160,
    },
    Videob4383d11: {
      height: 200,
      marginBottom: 16,
      marginTop: 16,
      width: '100%',
    },
    View1d8bd958: { alignItems: 'center', paddingLeft: 16, paddingRight: 16 },
    View1e349bf4: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
    },
    View277c1da5: { flexDirection: 'row', marginBottom: 16 },
    Viewa8615c63: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 6,
      height: '100%',
      justifyContent: 'center',
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      width: '100%',
    },
    Viewbd814785: { flexDirection: 'row', width: '80%' },
    Viewd7830eb7: {
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 8,
      paddingTop: 8,
    },
    Viewdf29e2e2: { width: '100%' },
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

export default withTheme(NeedtypeScreen);
