import React, {useState, useEffect} from 'react';
import {Alert, Pressable, Button, Modal, StyleSheet, Text, View, Linking} from 'react-native';
import { PATCHTagOnUser } from '../apis/$Rest$DirectusApi'
import * as $Auth$DirectusApi from '../apis/$Auth$DirectusApi'
import * as GlobalVariables from '../config/GlobalVariableContext'

const ModalAvis = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const Constants = GlobalVariables.useValues()
  const tag = 'HasAlreadyGivenHisOpinion'

  useEffect(() => {
    const fetchUser = async () => {
      const user = await $Auth$DirectusApi.gETCurrentLoggedUserGET(Constants, { access_token:
        Constants.Directus_user_token })
      return user.data.tags.includes(tag)
    }

    fetchUser().then((r) => {
      if (r) {
        return false
      }

      const timer = setTimeout(() => {
        setModalVisible(true);
      }, 600000);

      return () => clearTimeout(timer);
    })
  }, []);

  const handleOpenUrl = async () => {
    await PATCHTagOnUser(Constants.Directus_user_token, [tag])
    await Linking.openURL('https://play.google.com/store/apps/details?id=host.exp.exponent&hl=fr&gl=US&pli=1');
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Votre avis est important.</Text>

            <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => handleOpenUrl}>
                <Text style={styles.textStyle}>Donner votre avis</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Plus tard</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttons: {
    flexDirection: 'row'
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'rgb(72, 56, 209)',
    marginRight: 15
  },
  buttonClose: {
    backgroundColor: 'rgba(70, 78, 88, 1)',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalAvis;
