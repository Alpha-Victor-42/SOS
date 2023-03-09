import React, { useRef, useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as GlobalVariableContext from './config/GlobalVariableContext';
export { useValues, useSetValue } from './config/GlobalVariableContext';

// list of month (fr)
let monthList = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

// list of days (fr)
let daysList = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

export const AgendaComponent = () => {
  const styles = StyleSheet.create({
    w100: {
      width: '100%',
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    alignCenter: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    card: {
      width: 70,
      height: 70,
      borderRadius: 6,
      marginRight: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    currentDayCard: {
      backgroundColor: '#FFF',
    },
    nextDaysCard: {
      backgroundColor: '#DDDAF2',
    },
    oldDaysCard: {
      backgroundColor: '#eee',
    },
    selectedCard: {
      borderWidth: 2,
      borderColor: '#EB6A2A',
    },
    daysList: {
      height: '100%',
      width: 'auto',
      display: 'flex',
      flexDirection: 'row',
    },
    h1: {
      fontFamily: 'rozha one',
      fontSize: 24,
      color: '#4838D1',
      textAlign: 'center',
      marginBottom: 16,
    },
    dayNumber: {
      fontFamily: 'rozha one',
      fontSize: 24,
      color: '#4838D1',
      textAlign: 'center',
    },
    dayLabel: {
      color: '#4838D1',
    },
  });

  // to set a variable (use setGlobalVariable({key: 'key', value: 'value'}))
  let setGlobalVariable = GlobalVariableContext.useSetValue();

  // get all variables list (ex: variables.myVariable)
  let variables = GlobalVariableContext.useValues();

  function initDaysOfMonth(month, year) {
    let date = new Date(year, month, 1); // get today
    let days = [];
    let currentMonth = new Date(year, month, 1).getMonth(); // get current month

    while (date.getMonth() === month) {
      days.push({
        label: daysList[new Date(date).getDay()],
        number: new Date(date).getDate(),
      });

      date.setDate(date.getDate() + 1);
    }

    // return (ex: {month: 5, currentDay: 30, days[]})
    return {
      month: currentMonth,
      currentDay: new Date().getDate(),
      days: days,
    };
  }

  let currentMonth = variables.month;
  let currentYear = variables.year;

  // Switch to next month
  function up() {
    // add +1 to variables.month
    setGlobalVariable({ key: 'month', value: currentMonth + 1 });

    // if end of this year (variables.year)
    if (currentMonth >= 11) {
      setGlobalVariable({ key: 'month', value: 0 });
      setGlobalVariable({ key: 'year', value: currentYear + 1 });
    }

    // scroll to start of scrollView
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  function down() {
    // remove -1 to variables.month
    setGlobalVariable({ key: 'month', value: currentMonth - 1 });

    // if start of year (variables.year)
    if (currentMonth <= 0) {
      setGlobalVariable({ key: 'month', value: 11 });
      setGlobalVariable({ key: 'year', value: currentYear - 1 });
    }

    // scroll to start of scrollView
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  function getTypeCard(e) {
    // get type of card from old, next or current day

    //let classList = [];
    const dateParts = variables.selectedDate.split('-')
    const dateObject = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])

    let today = dateObject.getDate();
    let currentMonth = dateObject.getMonth();
    let currentYear = dateObject.getFullYear();

    const isCurrentDay = e.number === today && variables.month === currentMonth && variables.year === currentYear;
    const isOldDay = e.number < today || variables.month < currentMonth || variables.year < currentYear;
    const isNewDay = e.number > today || variables.month > currentMonth || variables.year > currentYear;

    let classList = [styles.card];

    if (isCurrentDay) {
      classList.push(styles.currentDayCard);
    } else if (isOldDay) {
      classList.push(styles.oldDaysCard);
    } else if (isNewDay) {
      classList.push(styles.nextDaysCard);
    }

    return classList;
  }

  // refs (get HTML element)
  let currentDay = useRef();
  let scrollViewRef = useRef();

  function scrollToCurrentDay() {
    // scroll to current day on page load
    currentDay.current.measure((x, y, w, h, pageX, pageY) => {
      setGlobalVariable({ key: 'currentDayPosition', value: pageX });
      scrollViewRef.current.scrollTo({
        x: pageX - Dimensions.get('window').width / 2.6,
        y: 0,
        animated: true,
      });
    });
  }

  function getAppointments(day) {
    setGlobalVariable({
      key: 'selectedDate',
      value: variables.year + '-' + (variables.month + 1) + '-' + day,
    });
  }

  let state = {
    selectedButton: '',
  };

  return (
    <View>
      <View style={[styles.w100, styles.alignCenter]}>
        <Button title="<" onPress={down} />
        <Text style={styles.h1}>
          {`${monthList[initDaysOfMonth(variables.month, variables.year).month]
            } ${variables.year}`.toString()}
        </Text>
        <Button title=">" onPress={up} />
      </View>

      <ScrollView horizontal={true} ref={scrollViewRef}>
        <View style={styles.daysList}>
          {initDaysOfMonth(variables.month, variables.year).days.map(e => {
            if (e.number < new Date().getDate()) {
              return (
                <TouchableOpacity
                  style={getTypeCard(e)}
                  onPress={() => {
                    getAppointments(e.number);
                  }}
                >
                  <Text style={styles.dayLabel}>{e.label.slice(0, 3)}</Text>
                  <Text style={styles.dayNumber}>{e.number}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>

        <View style={styles.daysList}>
          {initDaysOfMonth(variables.month, variables.year).days.map(e => {
            if (e.number === new Date().getDate()) {
              return (
                <TouchableOpacity
                  style={getTypeCard(e)}
                  ref={currentDay}
                  onLayout={event => {
                    scrollToCurrentDay();
                  }}
                  onPress={() => {
                    getAppointments(e.number);
                  }}
                >
                  <Text style={styles.dayLabel}>{e.label.slice(0, 3)}</Text>
                  <Text style={styles.dayNumber}>{e.number}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>

        <View style={styles.daysList}>
          {initDaysOfMonth(variables.month, variables.year).days.map(e => {
            if (e.number > new Date().getDate()) {
              return (
                <TouchableOpacity
                  style={getTypeCard(e)}
                  onPress={() => {
                    console.log(291, e)
                    getAppointments(e.number);
                  }}
                >
                  <Text style={styles.dayLabel}>{e.label.slice(0, 3)}</Text>
                  <Text style={styles.dayNumber}>{e.number}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export const ToggleGroupButtons = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    btnGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#6B7280',
    },
    btn: {
      flex: 1,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 12,
      marginRight: 12,
    },
    btnText: {
      textAlign: 'center',
      fontSize: 14,
    },
  });

  // to set a variable (use setGlobalVariable({key: 'key', value: 'value'}))
  let setGlobalVariable = GlobalVariableContext.useSetValue();

  // get all variables list (ex: variables.myVariable)
  let variables = GlobalVariableContext.useValues();

  const [selection, setSelection] = useState("");

  useEffect(() => {
    setSelection(variables.pageSelectedToggle);
  }, [variables.pageSelectedToggle]);

  function setSelectedToggle(element) {
    setSelection(element);
    setGlobalVariable({ key: 'pageSelectedToggle', value: element });
    setGlobalVariable({ key: 'searchable_topic', value: element });
  }

  return (
    <View>
      <ScrollView horizontal={true}>
        {variables.pageToggles.split(',').map((e, i) => {
          return (
            <TouchableOpacity
              style={[
                styles.btn,
                selection === e
                  ? { backgroundColor: '#4838D1' }
                  : { backgroundColor: '#F9F9F9' },
              ]}
              onPress={() => setSelectedToggle(e)}
              key={i}
            >
              <Text
                style={[
                  styles.btnText,
                  selection === e ? { color: 'white' } : { color: 'black' },
                ]}
              >
                {e}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
