import * as React from 'react';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { systemWeights } from 'react-native-typography';
import { Icon, Touchable } from '@draftbit/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './themes/DraftbitTheme.js';
import LinkingConfiguration from './LinkingConfiguration.js';
import { useRef } from 'react';

import AddRendezVousScreen from './screens/AddRendezVousScreen';
import AgendaScreen from './screens/AgendaScreen';
import CompletProfileScreen from './screens/CompletProfileScreen';
import ContactsScreen from './screens/ContactsScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import GoalsScreen from './screens/GoalsScreen';
import HomeScreen from './screens/HomeScreen';
import MoreNeedsScreen from './screens/MoreNeedsScreen';
import NeedsScreen from './screens/NeedsScreen';
import NeedtypeScreen from './screens/NeedtypeScreen';
import NeedtypesoinScreen from './screens/NeedtypesoinScreen';
import NeedtypesoinmapScreen from './screens/NeedtypesoinmapScreen';
import SimpleLoginScreen from './screens/SimpleLoginScreen';
import SimpleRegistrationScreen from './screens/SimpleRegistrationScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import WhoAreYouScreen from './screens/WhoAreYouScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Placeholder() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#131A2A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 12,
          color: '#FFF',
        }}
      >
        Missing Screen
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        This screen is not in a navigator.
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#FFF',
          marginBottom: 8,
        }}
      >
        Go to Navigation mode, and click the + (plus) icon in the Navigator tab
        on the left side to add this screen to a Navigator.
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 16, color: '#FFF' }}>
        If the screen is in a Tab Navigator, make sure the screen is assigned to
        a tab in the Config panel on the right.
      </Text>
    </View>
  );
}

export default function RootAppNavigator() {
  const navigationRef = useRef(null);
  const routeNameRef = useRef(null);

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="SimpleLoginScreen"
        screenOptions={{
          animationEnabled: false,
        }}
      >
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="WhoAreYouScreen"
          component={WhoAreYouScreen}
          options={{ title: 'WhoAreYou' }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="ContactsScreen"
          component={ContactsScreen}
          options={{ title: 'Contacts' }}
        />
        <Stack.Screen
          name="NeedsScreen"
          component={NeedsScreen}
          options={{ title: 'Needs' }}
        />
        <Stack.Screen
          name="MoreNeedsScreen"
          component={MoreNeedsScreen}
          options={{ title: 'MoreNeeds' }}
        />
        <Stack.Screen
          name="NeedtypeScreen"
          component={NeedtypeScreen}
          options={{ title: 'Need/:type' }}
        />
        <Stack.Screen
          name="NeedtypesoinScreen"
          component={NeedtypesoinScreen}
          options={{ title: 'Need/:type/:soin' }}
        />
        <Stack.Screen
          name="NeedtypesoinmapScreen"
          component={NeedtypesoinmapScreen}
          options={{ title: 'Need.:type/:soin/:map' }}
        />
        <Stack.Screen
          name="AgendaScreen"
          component={AgendaScreen}
          options={{ title: 'Agenda' }}
        />
        <Stack.Screen
          name="SimpleRegistrationScreen"
          component={SimpleRegistrationScreen}
          options={{ title: 'Simple Registration' }}
        />
        <Stack.Screen
          name="SimpleLoginScreen"
          component={SimpleLoginScreen}
          options={{ title: 'Simple Login' }}
        />
        <Stack.Screen
          name="GoalsScreen"
          component={GoalsScreen}
          options={{ title: 'Goals' }}
        />
        <Stack.Screen
          name="CompletProfileScreen"
          component={CompletProfileScreen}
          options={{ title: 'CompletProfile' }}
        />
        <Stack.Screen
          name="AddRendezVousScreen"
          component={AddRendezVousScreen}
          options={{ title: 'AddRendezVous' }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ title: 'EditProfile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({
    ios: {
      marginRight: 6,
    },
  }),
  headerIconRight: Platform.select({
    ios: {
      marginLeft: 6,
    },
  }),
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({
    ios: {
      marginLeft: 8,
    },
  }),
  headerContainerRight: Platform.select({
    ios: {
      marginRight: 8,
    },
  }),
  headerLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerLabel: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
});
