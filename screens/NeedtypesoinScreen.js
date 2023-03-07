import React from 'react';
import * as CustomCode from '../CustomCode';
import * as $Auth$DirectusApi from '../apis/$Auth$DirectusApi.js';
import * as $Rest$DirectusApi from '../apis/$Rest$DirectusApi.js';
import * as APIGOUVApi from '../apis/APIGOUVApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as Utils from '../utils';
import {
  AccordionGroup,
  Button,
  CheckboxRow,
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

const NeedtypesoinScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const initCategoriesToggleGroup = data => {
    let toggles = [];

    data.data.forEach(e => {
      toggles.push(e['Label']);
    });

    return toggles.join(',');
  };
  const variables = CustomCode.useValues();
  const setVariables = CustomCode.useSetValue();
  const { theme } = props;
  const { navigation } = props;

  const $Rest$DirectusCREATEUserObjectifPOST =
    $Rest$DirectusApi.useCREATEUserObjectifPOST();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const sousBesoinResultJSON =
          await $Rest$DirectusApi.gETSousBesoinCategoriesGET(Constants, {
            access_token: Constants['Directus_user_token'],
            sous_besoin: props.route?.params?.sous_besoin_label ?? '',
          });
        const firstEntryJSON = sousBesoinResultJSON.data[0].Label;
        setGlobalVariableValue({
          key: 'pageSelectedToggle',
          value: firstEntryJSON,
        });
        setGlobalVariableValue({
          key: 'searchable_topic',
          value: firstEntryJSON,
        });
        const toggleList = initCategoriesToggleGroup(sousBesoinResultJSON);
        setGlobalVariableValue({
          key: 'pageToggles',
          value: toggleList,
        });
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [checkboxRowValue, setCheckboxRowValue] = React.useState('');
  const [radioButtonGroupValue, setRadioButtonGroupValue] = React.useState('');

  return (
    <ScreenContainer>
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
            {props.route?.params?.sous_besoin_label ?? ''}
          </Text>
          {/* Paragraphe */}
          <Text style={styles(theme).Text9464d1ca}>
            {props.route?.params?.sous_besoin_description ?? ''}
          </Text>
        </View>

        <View style={styles(theme).View153e91bb}>
          <Utils.CustomCodeErrorBoundary>
            <CustomCode.ToggleGroupButtons />
          </Utils.CustomCodeErrorBoundary>
        </View>
        {/* View(Maquillage) */}
        <View style={styles(theme).Viewdc2246bd}>
          {/* H3 */}
          <Text style={styles(theme).Text8d9d4755}>{'Quelques conseils:'}</Text>

          <View>
            <$Rest$DirectusApi.FetchGETConseilsGET
              access_token={Constants['Directus_user_token']}
              categorie={Constants['pageSelectedToggle']}
              sous_besoin={props.route?.params?.sous_besoin_label ?? ''}
            >
              {({ loading, error, data, refetchGETConseils }) => {
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
                    listKey={'zbjov9ca'}
                    keyExtractor={listData =>
                      listData?.id || listData?.uuid || JSON.stringify(listData)
                    }
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {/* ConseilsAccordion */}
                          <AccordionGroup
                            style={styles(theme).AccordionGroupc9824c66}
                            label={listData?.Label}
                            expanded={false}
                            iconSize={24}
                          >
                            <View>
                              <Text style={styles(theme).Text7b811aa2}>
                                {listData?.Description}
                              </Text>
                            </View>
                          </AccordionGroup>
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
            </$Rest$DirectusApi.FetchGETConseilsGET>
          </View>
          {/* H3 */}
          <Text style={styles(theme).Text548a6cb1}>{'Objectifs:'}</Text>
          {/* Paragraphe */}
          <Text style={styles(theme).Text47ecd905}>
            {'Chaque action a de l’importance !'}
          </Text>
          {/* Paragraphe */}
          <Text style={styles(theme).Text0bf9c6bf}>
            {'Vous pouvez commencer en vous fixant des objectifs à réaliser.'}
          </Text>

          <View style={styles(theme).View85689476}>
            {/* Paragraphe */}
            <Text style={styles(theme).Text0bf9c6bf}>
              {
                'Cochez les actions ci-dessous pour les ajouter à votre liste d’objectifs :'
              }
            </Text>

            <$Rest$DirectusApi.FetchGETSousBesoinsObjectifsGET
              access_token={Constants['Directus_user_token']}
              categorie={Constants['pageSelectedToggle']}
              sous_besoin={props.route?.params?.sous_besoin_label ?? ''}
            >
              {({ loading, error, data, refetchGETSousBesoinsObjectifs }) => {
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
                    listKey={'HIAwbRYJ'}
                    keyExtractor={listData =>
                      listData?.id || listData?.uuid || JSON.stringify(listData)
                    }
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {/* CheckboxCard */}
                          <View style={styles(theme).View4082952c}>
                            <CheckboxRow
                              onCheck={() => {
                                const handler = async () => {
                                  try {
                                    await $Rest$DirectusCREATEUserObjectifPOST.mutateAsync(
                                      {
                                        access_token:
                                          Constants['Directus_user_token'],
                                        objectif_label: listData?.Label,
                                        objectif_status: 1,
                                      }
                                    );
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                              onPress={newCheckboxRowValue => {
                                try {
                                  setCheckboxRowValue(newCheckboxRowValue);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              style={styles(theme).CheckboxRow1fa23b89}
                              label={listData?.Label}
                              value={checkboxRowValue}
                              uncheckedColor={theme.colors.primary}
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
            </$Rest$DirectusApi.FetchGETSousBesoinsObjectifsGET>
            {/* Button Solid */}
            <Button
              onPress={() => {
                try {
                  navigation.navigate('GoalsScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).Button250f622f}
              title={'Voir tous mes objectifs'}
            />
          </View>

          <View>
            <$Rest$DirectusApi.FetchGETSousBesoinsTutorielsGET
              access_token={Constants['Directus_user_token']}
              categorie={Constants['pageSelectedToggle']}
              sous_besoin={props.route?.params?.sous_besoin_label ?? ''}
            >
              {({ loading, error, data, refetchGETSousBesoinsTutoriels }) => {
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
                  <>
                    {/* H3 */}
                    <Text style={styles(theme).Text8d9d4755}>
                      {'Tutoriels:'}
                    </Text>
                    <FlatList
                      data={fetchData?.data}
                      listKey={'nmCTByw0'}
                      keyExtractor={listData =>
                        listData?.id ||
                        listData?.uuid ||
                        JSON.stringify(listData)
                      }
                      renderItem={({ item }) => {
                        const listData = item;
                        return (
                          <>
                            {/* TutorielBlock */}
                            <View style={styles(theme).Viewcf68fb50}>
                              {/* Paragraphe */}
                              <Text style={styles(theme).Text47ecd905}>
                                {listData?.Title}
                              </Text>
                              <Video
                                style={styles(theme).Video146a79dd}
                                resizeMode={'cover'}
                                useNativeControls={true}
                                source={{ uri: `${listData?.Media_url}` }}
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
                  </>
                );
              }}
            </$Rest$DirectusApi.FetchGETSousBesoinsTutorielsGET>
          </View>

          <View style={styles(theme).Viewced39a45}>
            {/* H3 */}
            <Text style={styles(theme).Text8d9d4755}>
              {'Les professionnels expert en la matière:'}
            </Text>

            <$Rest$DirectusApi.FetchGETProfessionnelsGET
              access_token={Constants['Directus_user_token']}
              sous_besoin={props.route?.params?.sous_besoin_label ?? ''}
            >
              {({ loading, error, data, refetchGETProfessionnels }) => {
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
                    listKey={'m1fiwa4p'}
                    keyExtractor={listData =>
                      listData?.id || listData?.uuid || JSON.stringify(listData)
                    }
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {/* ConseilsAccordion */}
                          <AccordionGroup
                            style={styles(theme).AccordionGroup9e055752}
                            label={listData?.Label}
                            expanded={false}
                            iconSize={24}
                          >
                            <View>
                              <Text style={styles(theme).Text7b811aa2}>
                                {listData?.Description}
                              </Text>
                            </View>
                          </AccordionGroup>
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
            </$Rest$DirectusApi.FetchGETProfessionnelsGET>
          </View>

          <View style={styles(theme).View4840e4f3}>
            {/* Paragraphe */}
            <Text style={styles(theme).Text7f8e5c85}>
              {
                'Je souhaite me faire accompagner par un professionnel ou une association près de chez moi :'
              }
            </Text>
            {/* Button Solid */}
            <Button
              onPress={() => {
                const handler = async () => {
                  try {
                    const currentUserJSON =
                      await $Auth$DirectusApi.gETCurrentLoggedUserGET(
                        Constants,
                        { access_token: Constants['Directus_user_token'] }
                      );
                    const userLocation = currentUserJSON.data.location;
                    const APIGOUVResult = await APIGOUVApi.gETLOCATIONGET(
                      Constants,
                      { adresse: userLocation }
                    );
                    const longitude =
                      APIGOUVResult.features[0].geometry.coordinates[0];
                    const latitude =
                      APIGOUVResult.features[0].geometry.coordinates[1];
                    navigation.navigate('NeedtypesoinmapScreen', {
                      passedLat: latitude,
                      passedLong: longitude,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              style={styles(theme).Button8ce897e6}
              title={'Chercher sur la carte'}
            />
          </View>
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
    AccordionGroup9e055752: { borderColor: theme.colors.primary },
    AccordionGroupc9824c66: {
      borderColor: theme.colors.primary,
      marginBottom: 16,
    },
    Button250f622f: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      marginTop: 6,
      textAlign: 'center',
    },
    Button8ce897e6: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      textAlign: 'center',
    },
    CheckboxRow1fa23b89: { fontFamily: 'Poppins_400Regular', minHeight: 50 },
    Fetch431eb058: { minHeight: 40 },
    FlatListc992f941Content: { flex: 1 },
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    Text0bf9c6bf: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 14,
    },
    Text47ecd905: {
      color: theme.colors.primary,
      fontFamily: 'Poppins_500Medium',
      fontSize: 14,
    },
    Text548a6cb1: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 16,
      marginBottom: 16,
      marginTop: 32,
    },
    Text613b05f2: {
      color: theme.colors.medium,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text7b811aa2: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      marginTop: 16,
    },
    Text7f8e5c85: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
      marginBottom: 16,
      textAlign: 'center',
    },
    Text8d9d4755: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 16,
      marginBottom: 16,
    },
    Text9464d1ca: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
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
    Video146a79dd: { height: 200, marginTop: 6, width: '100%' },
    View153e91bb: { paddingBottom: 16, paddingLeft: 16, paddingRight: 16 },
    View1d8bd958: { alignItems: 'center', paddingLeft: 16, paddingRight: 16 },
    View4082952c: {
      backgroundColor: theme.colors.surface,
      borderRadius: 6,
      marginTop: 6,
      paddingBottom: 6,
      paddingTop: 6,
    },
    View4840e4f3: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      marginTop: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
    },
    View85689476: { marginBottom: 16, marginTop: 16 },
    Viewced39a45: { marginTop: 32 },
    Viewcf68fb50: { marginBottom: 8 },
    Viewd7830eb7: {
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 8,
      paddingTop: 8,
    },
    Viewdc2246bd: {
      backgroundColor: theme.colors.divider,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
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
  });

export default withTheme(NeedtypesoinScreen);
