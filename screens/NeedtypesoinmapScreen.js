import React from 'react';
import * as $Rest$DirectusApi from '../apis/$Rest$DirectusApi.js';
import * as N8NApi from '../apis/N8NApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import { MapCallout, MapMarker, MapView } from '@draftbit/maps';
import {
  Button,
  Icon,
  IconButton,
  Link,
  ScreenContainer,
  SwitchRow,
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
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const NeedtypesoinmapScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const $Rest$DirectusPOSTContactPOST = $Rest$DirectusApi.usePOSTContactPOST();

  const [adresse, setAdresse] = React.useState('');
  const [checkboxRowValue, setCheckboxRowValue] = React.useState('');
  const [contactModal, setContactModal] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [pins, setPins] = React.useState({});
  const [type, setType] = React.useState('');

  const mapViewjR2IrRFKRef = React.useRef();

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
            icon={'FontAwesome/user'}
            size={24}
            color={theme.colors.primary}
          />
        </View>

        <View style={styles(theme).View1d8bd958}>
          {/* H1 */}
          <Text style={styles(theme).Textbf8b46f5}>
            {'Maquillage et soins capillaires'}
          </Text>
          {/* Paragraphe */}
          <Text style={styles(theme).Text9464d1ca}>
            {
              'Retrouvez les professionnels agréés et les associations près de chez moi :'
            }
          </Text>
          {/* H3 */}
          <Text style={styles(theme).Text069e065d}>{'Filtrer par:'}</Text>
        </View>

        <View style={styles(theme).Viewc22dd40d}>
          <N8NApi.FetchGETBerneHitsGET
            access_token={Constants['Directus_user_token']}
            besoin={Constants['searchable_besoin']}
            lat={props.route?.params?.passedLat ?? ''}
            lng={props.route?.params?.passedLong ?? ''}
            radius={20000}
            thematique={Constants['searchable_thematique']}
            topic={Constants['searchable_topic']}
          >
            {({ loading, error, data, refetchGETBerneHits }) => {
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
                <MapView
                  markersData={fetchData}
                  listKey={'jR2IrRFK'}
                  keyExtractor={mapViewData =>
                    mapViewData?.id ||
                    mapViewData?.uuid ||
                    JSON.stringify(mapViewData)
                  }
                  renderItem={({ item }) => {
                    const mapViewData = item;
                    return (
                      <MapMarker
                        title={mapViewData?.nom}
                        description={mapViewData?.adresse}
                        latitude={mapViewData?.latitude}
                        longitude={mapViewData?.longitude}
                      >
                        <MapCallout
                          onPress={() => {
                            try {
                              setName(mapViewData?.nom);
                              setType(
                                mapViewData?.besoins && mapViewData?.besoins[0]
                              );
                              setAdresse(mapViewData?.adresse);
                              setPhone(mapViewData?.telephone);
                              setEmail(mapViewData?.email);
                              setContactModal(true);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          showTooltip={false}
                        />
                      </MapMarker>
                    );
                  }}
                  style={styles(theme).MapViewde486c79}
                  latitude={(fetchData && fetchData[0])?.latitude}
                  longitude={(fetchData && fetchData[0])?.longitude}
                  zoom={8}
                  zoomEnabled={true}
                  rotateEnabled={true}
                  scrollEnabled={true}
                  loadingEnabled={true}
                  showsPointsOfInterest={true}
                  provider={'google'}
                  apiKey={'AIzaSyBzktToWosjNgrrUawZnbslB9NSXSXCkwo'}
                  ref={mapViewjR2IrRFKRef}
                />
              );
            }}
          </N8NApi.FetchGETBerneHitsGET>
          <>
            {!contactModal ? null : (
              <View>
                <View style={styles(theme).View5b99e9cb}>
                  {/* H3 */}
                  <Text style={styles(theme).Textf206e902}>{name}</Text>
                  {/* Paragraphe */}
                  <>
                    {!type ? null : (
                      <Text style={styles(theme).Text66b7d74b}>{type}</Text>
                    )}
                  </>
                  {/* Paragraphe */}
                  <Text style={styles(theme).Text66b7d74b}>{adresse}</Text>
                  <Link style={styles(theme).Link10a52308} title={`${phone}`} />
                  <Link style={styles(theme).Link10a52308} title={`${email}`} />
                </View>

                <View style={styles(theme).View0ab10238}>
                  {/* Button Solid */}
                  <Button
                    onPress={() => {
                      const handler = async () => {
                        try {
                          await $Rest$DirectusPOSTContactPOST.mutateAsync({
                            access_token: Constants['Directus_user_token'],
                            adresse: adresse,
                            email: email,
                            nom: name,
                            telephone: phone,
                            type: type,
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    style={styles(theme).Button8ce897e6}
                    title={'Ajouter à mes contacts'}
                  />
                </View>
              </View>
            )}
          </>
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
    Button8ce897e6: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      textAlign: 'center',
    },
    Fetch431eb058: { minHeight: 40 },
    Imagea8ea3fab: { height: 37, opacity: 1, width: 90 },
    Link10a52308: {
      color: theme.colors.background,
      fontFamily: 'Poppins_500Medium',
      marginBottom: 6,
      textDecorationLine: 'underline',
    },
    MapViewde486c79: { flex: 1, height: 350, width: '100%' },
    SwitchRow1b478709: {
      color: theme.colors.primary,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
      lineHeight: 12,
      marginBottom: 6,
      marginLeft: 0,
      marginRight: 6,
    },
    SwitchRow5e2c1f8d: {
      color: theme.colors.secondary,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
      lineHeight: 12,
      marginBottom: 6,
      marginLeft: 0,
      marginRight: 0,
    },
    Text069e065d: {
      alignSelf: 'flex-start',
      color: theme.colors.primary,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 16,
      marginBottom: 16,
      textAlign: 'left',
    },
    Text613b05f2: {
      color: theme.colors.medium,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
    },
    Text66b7d74b: {
      color: theme.colors.background,
      fontFamily: 'Poppins_400Regular',
      fontSize: 12,
      marginBottom: 6,
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
    Textf206e902: {
      color: theme.colors.background,
      fontFamily: 'RozhaOne_400Regular',
      fontSize: 16,
      marginBottom: 8,
    },
    View0ab10238: {
      backgroundColor: theme.colors.background,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      width: '100%',
    },
    View1d8bd958: { alignItems: 'center', paddingLeft: 16, paddingRight: 16 },
    View5b99e9cb: {
      backgroundColor: theme.colors.primary,
      borderRadius: 0,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      marginTop: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
    },
    Viewc22dd40d: { marginTop: 16, paddingLeft: 16, paddingRight: 16 },
    Viewd7830eb7: {
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 8,
      paddingTop: 8,
    },
    Vieweb8a4c38: { alignItems: 'center', justifyContent: 'center' },
    Viewf67c03f1: { flexDirection: 'row', paddingLeft: 16, paddingRight: 16 },
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

export default withTheme(NeedtypesoinmapScreen);
