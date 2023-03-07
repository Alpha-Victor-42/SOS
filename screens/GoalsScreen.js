import React from 'react';
import * as CustomCode from '../CustomCode';
import * as $Rest$DirectusApi from '../apis/$Rest$DirectusApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as Utils from '../utils';
import {
  ActionSheet,
  ActionSheetCancel,
  ActionSheetItem,
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
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const GoalsScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const initStatusToggleGroupbuttons = data => {
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

  const $Rest$DirectusUPDATEUserObjectifStatusPATCH =
    $Rest$DirectusApi.useUPDATEUserObjectifStatusPATCH();
  const $Rest$DirectusDELETEUserObjectifDELETE =
    $Rest$DirectusApi.useDELETEUserObjectifDELETE();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const statusResponseJSON =
          await $Rest$DirectusApi.gETObjectifsStatusGET(Constants, {
            access_token: Constants['Directus_victor_access_token'],
          });
        const firstEntryJSON = statusResponseJSON.data[0].Label;
        setGlobalVariableValue({
          key: 'pageSelectedToggle',
          value: firstEntryJSON,
        });
        const togglesList = initStatusToggleGroupbuttons(statusResponseJSON);
        setGlobalVariableValue({
          key: 'pageToggles',
          value: togglesList,
        });
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [actionSheetModal, setActionSheetModal] = React.useState(false);
  const [currentObjectif_id, setCurrentObjectif_id] = React.useState(0);
  const [currentObjectif_newStatus, setCurrentObjectif_newStatus] =
    React.useState(0);
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const [searchBarValue2, setSearchBarValue2] = React.useState('');
  const [searchBarValue3, setSearchBarValue3] = React.useState('');
  const [searchBarValue4, setSearchBarValue4] = React.useState('');
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer style={styles(theme).screen} scrollable={false}>
      <>
        {!Constants['successModal'] ? null : (
          <Modal animationType={'fade'} transparent={true}>
            <View style={styles(theme).View54b7df71}>
              <Touchable
                onPress={() => {
                  try {
                    setGlobalVariableValue({
                      key: 'successModal',
                      value: false,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View style={styles(theme).View7596f2a9}>
                  <Image
                    style={styles(theme).Imagef7a4e12a}
                    source={Images.Illustration}
                    resizeMode={'contain'}
                  />
                  <View style={styles(theme).Viewa4113b88}>
                    <Text style={styles(theme).Text28373dea}>
                      {"J'ai atteint\nmon objectif !"}
                    </Text>
                  </View>
                </View>
              </Touchable>
            </View>
          </Modal>
        )}
      </>
      <ActionSheet visible={actionSheetModal}>
        <ActionSheetItem
          onPress={() => {
            const handler = async () => {
              try {
                await $Rest$DirectusUPDATEUserObjectifStatusPATCH.mutateAsync({
                  access_token: Constants['Directus_user_token'],
                  new_objectif_status: 1,
                  objectif_id: currentObjectif_id,
                });
                setActionSheetModal(false);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={styles(theme).ActionSheetItemc521608b}
          label={"J'ai envie"}
          color={theme.colors.primary}
        />
        <ActionSheetItem
          onPress={() => {
            const handler = async () => {
              try {
                await $Rest$DirectusUPDATEUserObjectifStatusPATCH.mutateAsync({
                  access_token: Constants['Directus_user_token'],
                  new_objectif_status: 2,
                  objectif_id: currentObjectif_id,
                });
                setActionSheetModal(false);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={styles(theme).ActionSheetItemc521608b}
          color={theme.colors.primary}
          label={"J'y suis presque"}
        />
        <ActionSheetItem
          onPress={() => {
            const handler = async () => {
              try {
                await $Rest$DirectusUPDATEUserObjectifStatusPATCH.mutateAsync({
                  access_token: Constants['Directus_user_token'],
                  new_objectif_status: 3,
                  objectif_id: currentObjectif_id,
                });
                setActionSheetModal(false);
                setGlobalVariableValue({
                  key: 'successModal',
                  value: true,
                });
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={styles(theme).ActionSheetItemc521608b}
          color={theme.colors.primary}
          label={"J'ai réussi"}
        />
        <ActionSheetItem
          onPress={() => {
            const handler = async () => {
              try {
                await $Rest$DirectusDELETEUserObjectifDELETE.mutateAsync({
                  access_token: Constants['Directus_user_token'],
                  objectif_id: currentObjectif_id,
                });
                setActionSheetModal(false);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={styles(theme).ActionSheetItemc521608b}
          color={theme.colors.primary}
          label={'Retirer des mes objectifs'}
        />
        <ActionSheetCancel
          onPress={() => {
            try {
              setActionSheetModal(false);
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

        <View style={styles(theme).View07a1f930}>
          {/* H1 */}
          <Text style={styles(theme).Textbf8b46f5}>{'Mes objectifs,'}</Text>
          {/* Paragraphe */}
          <Text style={styles(theme).Text6466eff9}>
            {
              'Selon votre situation et vos besoins, adaptez vos objectifs à atteindre. \nIl est important de ne pas trop en faire en même temps.'
            }
          </Text>
          {/* H3 */}
          <Text style={styles(theme).Text8d9d4755}>
            {'Avancez à votre rythme !'}
          </Text>
          <Utils.CustomCodeErrorBoundary>
            <CustomCode.ToggleGroupButtons />
          </Utils.CustomCodeErrorBoundary>
        </View>

        <$Rest$DirectusApi.FetchGETUserObjectifsGET
          access_token={Constants['Directus_user_token']}
          current_user_access_token={Constants['Directus_user_token']}
          status={Constants['pageSelectedToggle']}
        >
          {({ loading, error, data, refetchGETUserObjectifs }) => {
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
                {/* GoalsList */}
                <View style={styles(theme).Viewff15840a}>
                  {/* H1 */}
                  <Text style={styles(theme).Textdb6c4b5a}>
                    {Constants['pageSelectedToggle']}
                  </Text>
                  <FlatList
                    data={fetchData?.data}
                    listKey={'TWPuozcc'}
                    keyExtractor={listData =>
                      listData?.id || listData?.uuid || JSON.stringify(listData)
                    }
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          {/* GoalCard */}
                          <View style={styles(theme).View9dc3a0f0}>
                            <View style={styles(theme).View1a150cc5}>
                              {/* Paragraphe */}
                              <Text style={styles(theme).Texte9a2a789}>
                                {listData?.Label}
                              </Text>
                            </View>
                            <IconButton
                              onPress={() => {
                                try {
                                  setCurrentObjectif_id(listData?.id);
                                  setActionSheetModal(true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              size={24}
                              icon={'Entypo/dots-three-vertical'}
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
                </View>
              </>
            );
          }}
        </$Rest$DirectusApi.FetchGETUserObjectifsGET>
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
              size={24}
              color={theme.colors.medium}
              name={'AntDesign/appstore-o'}
            />
            <Text style={styles(theme).Text613b05f2}>{'Accueil'}</Text>
          </View>
        </Touchable>
        {/* NavLink-current */}
        <Touchable>
          <View style={styles(theme).Vieweb8a4c38}>
            <Icon
              size={24}
              color={theme.colors.primary}
              name={'MaterialCommunityIcons/checkbox-marked-circle-outline'}
            />
            <Text style={styles(theme).Text86c1c295}>{'Mes objectifs'}</Text>
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
    ActionSheetItemc521608b: { textAlign: 'center' },
    Fetch431eb058: { minHeight: 40 },
    FlatListc992f941Content: { flex: 1 },
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    Imagef7a4e12a: { height: 250, opacity: 0.4, width: 250 },
    Text28373dea: {
      color: theme.colors.primary,
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 28,
      textAlign: 'center',
    },
    Text613b05f2: {
      color: theme.colors.medium,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text6466eff9: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
      marginBottom: 16,
      textAlign: 'left',
    },
    Text86c1c295: {
      color: theme.colors.primary,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text8d9d4755: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
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
    Textdb6c4b5a: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 18,
      marginBottom: 16,
      marginTop: 16,
      textAlign: 'left',
    },
    Texte9a2a789: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
    },
    View07a1f930: {
      backgroundColor: theme.colors.background,
      marginBottom: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
    },
    View1a150cc5: { alignItems: 'center', flexDirection: 'row', maxWidth: 240 },
    View54b7df71: {
      alignItems: 'center',
      backgroundColor: theme.colors.overlay,
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
    },
    View7596f2a9: {
      backgroundColor: theme.colors.background,
      borderRadius: 6,
      height: 200,
      width: '90%',
    },
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
    Viewa4113b88: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    Viewd7830eb7: {
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 8,
      paddingTop: 8,
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
    Viewff15840a: { marginBottom: 16, paddingLeft: 16, paddingRight: 16 },
    screen: { backgroundColor: theme.colors.divider },
  });

export default withTheme(GoalsScreen);
