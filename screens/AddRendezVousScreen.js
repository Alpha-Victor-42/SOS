import React from 'react';
import * as CustomCode from '../CustomCode';
import * as N8NApi from '../apis/N8NApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import {
  Button,
  DatePicker,
  Icon,
  IconButton,
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

const AddRendezVousScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const formtDate = date => {
    return new Date(date).toLocaleDateString('fr-FR').replaceAll('/', '-');
  };

  const formatHours = date => {
    return new Date(date).toLocaleTimeString('fr-FR');
  };

  const { theme } = props;
  const { navigation } = props;

  const n8NFORMATRendezVousPOST = N8NApi.useFORMATRendezVousPOST();

  const [adresseValue, setAdresseValue] = React.useState('');
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [datePickerValue2, setDatePickerValue2] = React.useState(new Date());
  const [firstNameValue, setFirstNameValue] = React.useState('');
  const [lastNameValue, setLastNameValue] = React.useState('');
  const [memoDescription, setMemoDescription] = React.useState('');
  const [rdvWithValue, setRdvWithValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [timePickerValue, setTimePickerValue] = React.useState(new Date());

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

        <View style={styles(theme).View72831f97}>
          {/* H1 */}
          <Text style={styles(theme).Text63930b9b}>{'Mon agenda'}</Text>
          {/* Paragraphe */}
          <Text style={styles(theme).Textd838a843}>
            {'Enregistrer un rendez-vous'}
          </Text>
          <DatePicker
            onDateChange={newDatePickerValue => {
              try {
                setDatePickerValue(newDatePickerValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles(theme).DatePicker6728d304}
            label={'Date du rendez-vous'}
            date={datePickerValue}
            leftIconMode={'inset'}
            type={'underline'}
            mode={'date'}
          />
          {/* Time Picker */}
          <DatePicker
            onDateChange={newTimePickerValue => {
              try {
                setTimePickerValue(newTimePickerValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={styles(theme).DatePicker6728d304}
            label={'Heure de rendez-vous'}
            date={datePickerValue}
            leftIconMode={'inset'}
            type={'underline'}
            mode={'time'}
          />
          {/* InputBloc */}
          <View style={styles(theme).Viewb5c900de}>
            <Text style={styles(theme).Text87753946}>{'Libellé :'}</Text>
            {/* rdvWith */}
            <TextInput
              onChangeText={newRdvWithValue => {
                try {
                  setRdvWithValue(newRdvWithValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).TextInput24675a14}
              value={rdvWithValue}
              placeholder={'Ex: Rendez-vous avec ...'}
              multiline={true}
            />
          </View>
          {/* InputBloc */}
          <View style={styles(theme).Viewb5c900de}>
            <Text style={styles(theme).Text87753946}>
              {'Mémo / Description :'}
            </Text>
            {/* memo */}
            <TextInput
              onChangeText={newMemoValue => {
                try {
                  setMemoDescription(newMemoValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={styles(theme).TextInput24675a14}
              value={memoDescription}
              placeholder={'Ex: Chimiothérapie'}
              multiline={true}
            />
          </View>
          {/* BigButton */}
          <Button
            onPress={() => {
              const handler = async () => {
                try {
                  await n8NFORMATRendezVousPOST.mutateAsync({
                    access_token: Constants['Directus_user_token'],
                    date: datePickerValue,
                    description: memoDescription,
                    time: timePickerValue,
                    title: rdvWithValue,
                  });
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={styles(theme).Button6df51104}
            loading={false}
            title={'Enregistrer le rendez-vous'}
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
    Button6df51104: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      marginBottom: 32,
      textAlign: 'center',
    },
    DatePicker6728d304: { marginTop: 16 },
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    ScrollViewdf29e2e2: { width: '100%' },
    Text613b05f2: {
      color: theme.colors.medium,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text63930b9b: {
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 26,
      textAlign: 'center',
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
    Textd838a843: {
      color: theme.colors.strong,
      fontFamily: 'Poppins_400Regular',
      fontSize: 16,
      marginTop: 16,
      textAlign: 'center',
    },
    View72831f97: {
      marginBottom: 16,
      marginTop: 32,
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

export default withTheme(AddRendezVousScreen);
