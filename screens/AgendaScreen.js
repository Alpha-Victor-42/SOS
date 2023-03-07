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
  Divider,
  FAB,
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

const AgendaScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const getDateForFetch = (year, month, day) => {
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = date => {
    let h = date.split(':')[0];
    let m = date.split(':')[1];

    return `${h}h${m !== '00' ? m : ''}`;
  };

  const setCurrentDate = () => {
    let today = {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };

    setVariables({
      key: 'month',
      value: today.month,
    });

    setVariables({
      key: 'year',
      value: today.year,
    });

    setVariables({
      key: 'day',
      value: today.day,
    });

    setVariables({
      key: 'selectedDate',
      value: today.year + '-' + today.month + '-' + today.day,
    });

    return today.year + '-' + (today.month + 1) + '-' + today.day;
  };
  const variables = CustomCode.useValues();
  const setVariables = CustomCode.useSetValue();
  const { theme } = props;
  const { navigation } = props;

  const $Rest$DirectusDELETEUserRendezVousDELETE =
    $Rest$DirectusApi.useDELETEUserRendezVousDELETE();

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      const dateToFetch = setCurrentDate();
      setGlobalVariableValue({
        key: 'selectedDate',
        value: dateToFetch,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [actionSheetADDmodal, setActionSheetADDmodal] = React.useState(false);
  const [actionSheetREMOVEmodal, setActionSheetREMOVEmodal] =
    React.useState(false);
  const [currentRendezVousID, setCurrentRendezVousID] = React.useState(0);
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [datePickerValue2, setDatePickerValue2] = React.useState(new Date());
  const [pickerValue, setPickerValue] = React.useState('');
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer style={styles(theme).screen} scrollable={false}>
      {/* Action Sheet REMOVE */}
      <ActionSheet visible={actionSheetREMOVEmodal}>
        <ActionSheetItem
          style={styles(theme).ActionSheetItemc521608b}
          color={theme.colors.primary}
          label={'Modifier le rendez-vous'}
        />
        <ActionSheetItem
          onPress={() => {
            const handler = async () => {
              try {
                await $Rest$DirectusDELETEUserRendezVousDELETE.mutateAsync({
                  access_token: Constants['Directus_user_token'],
                  id: currentRendezVousID,
                });
                setActionSheetREMOVEmodal(false);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          style={styles(theme).ActionSheetItemc521608b}
          label={'Supprimer le rendez-vous'}
          color={theme.colors.primary}
        />
        <ActionSheetCancel
          onPress={() => {
            try {
              setActionSheetREMOVEmodal(false);
            } catch (err) {
              console.error(err);
            }
          }}
          label={'Retour'}
        />
      </ActionSheet>
      {/* Action Sheet ADD */}
      <ActionSheet visible={actionSheetADDmodal}>
        <ActionSheetItem
          onPress={() => {
            try {
              navigation.navigate('AddRendezVousScreen');
            } catch (err) {
              console.error(err);
            }
          }}
          style={styles(theme).ActionSheetItemc521608b}
          color={theme.colors.primary}
          label={'Ajouter un rendez-vous'}
        />
        <ActionSheetItem
          style={styles(theme).ActionSheetItemc521608b}
          color={theme.colors.primary}
          label={'Créer un rappel'}
        />
        <ActionSheetCancel
          onPress={() => {
            try {
              setActionSheetADDmodal(false);
            } catch (err) {
              console.error(err);
            }
          }}
          label={'Retour'}
        />
      </ActionSheet>

      <ScrollView
        showsVerticalScrollIndicator={true}
        bounces={true}
        horizontal={false}
      >
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
        {/* H1 */}
        <Text style={styles(theme).Textbf8b46f5}>{'Mon agenda'}</Text>
        <Utils.CustomCodeErrorBoundary>
          <CustomCode.AgendaComponent />
        </Utils.CustomCodeErrorBoundary>
        <View style={styles(theme).View23404ef1}>
          {/* H3 */}
          <Text style={styles(theme).Text8d9d4755}>
            {'Mes rendez-vous du '}
            {Constants['selectedDate']}
          </Text>

          <$Rest$DirectusApi.FetchGETUserRendezVousGET
            refetchInterval={10000}
            access_token={Constants['Directus_user_token']}
            date={Constants['selectedDate']}
            onData={fetchData => {
              try {
                getDateForFetch(
                  Constants['year'],
                  Constants['month'],
                  Constants['day']
                );
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {({ loading, error, data, refetchGETUserRendezVous }) => {
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
                  listKey={'DPmVgzIW'}
                  keyExtractor={listData =>
                    listData?.id || listData?.uuid || JSON.stringify(listData)
                  }
                  renderItem={({ item }) => {
                    const listData = item;
                    return (
                      <View>
                        <Text style={styles(theme).Text718c3af5}>
                          {formatDisplayDate(listData?.Hour)}
                        </Text>

                        <View style={styles(theme).View8380eff1}>
                          <View>
                            <Text style={styles(theme).Texte517bed5}>
                              {listData?.Title}
                            </Text>

                            <Text style={styles(theme).Texte517bed5}>
                              {listData?.Description}
                            </Text>
                          </View>

                          <Touchable
                            onPress={() => {
                              try {
                                setCurrentRendezVousID(listData?.id);
                                setActionSheetREMOVEmodal(true);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <Text style={styles(theme).Text74047dd8}>
                              {'Détails >'}
                            </Text>
                          </Touchable>
                        </View>
                        <Divider
                          style={styles(theme).Divider81f3cd44}
                          color={theme.colors.surface}
                        />
                      </View>
                    );
                  }}
                  style={styles(theme).FlatList989db244}
                  contentContainerStyle={styles(theme).FlatListc992f941Content}
                  numColumns={1}
                />
              );
            }}
          </$Rest$DirectusApi.FetchGETUserRendezVousGET>
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
        {/* NavLink-current */}
        <Touchable>
          <View style={styles(theme).Vieweb8a4c38}>
            <Icon
              size={24}
              color={theme.colors.primary}
              name={'MaterialCommunityIcons/calendar-range-outline'}
            />
            <Text style={styles(theme).Text86c1c295}>{'Mon agenda'}</Text>
          </View>
        </Touchable>
      </View>
      <FAB
        onPress={() => {
          try {
            setActionSheetADDmodal(true);
          } catch (err) {
            console.error(err);
          }
        }}
        style={styles(theme).FABc35f2578}
        size={48}
      />
    </ScreenContainer>
  );
};

const styles = theme =>
  StyleSheet.create({
    ActionSheetItemc521608b: { textAlign: 'center' },
    Divider81f3cd44: { height: 1, marginBottom: 8 },
    FABc35f2578: { bottom: 68, position: 'absolute', right: 10 },
    Fetch431eb058: { minHeight: 40 },
    FlatListc992f941Content: { flex: 1 },
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    Text613b05f2: {
      color: theme.colors.medium,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text718c3af5: {
      color: theme.colors.primary,
      fontFamily: 'Poppins_500Medium',
      marginBottom: 8,
    },
    Text74047dd8: {
      color: theme.colors.primary,
      fontFamily: 'Poppins_400Regular',
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
    Texte517bed5: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
    },
    View23404ef1: { marginTop: 32, paddingLeft: 16, paddingRight: 16 },
    View8380eff1: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
      paddingBottom: 8,
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
    screen: { backgroundColor: theme.colors.divider },
  });

export default withTheme(AgendaScreen);
