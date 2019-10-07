import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

const EXAMPLES = [
  {
    id: 1,
    route: 'BasicUsageExample',
    title: 'Basic usage',
  },
  {
    id: 2,
    route: 'CustomizableExample',
    title: 'Customization',
  },
  {
    id: 3,
    route: 'JalaaliExample',
    title: 'Jalaali',
  },
  {
    id: 4,
    route: 'MinMaxExample',
    title: 'Minimun & Maximum',
  },
  {
    id: 5,
    route: 'FullUsageExample',
    title: 'Full usage',
  },
  {
    id: 6,
    route: 'TimePickerExample',
    title: 'Time Picker',
  },
  {
    id: 7,
    route: 'MonthYearExample',
    title: 'Month Year Picker',
  },
];

const ExampleCard = ({route, title, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>{title}</Text>
        <Image source={require('../assets/images/chevron.png')} style={styles.arrow} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleUp}>React Native</Text>
        <Text style={styles.title}>Modern Datepicker</Text>
      </View>
      <ScrollView>
        {EXAMPLES.map(item => (
          <ExampleCard key={item.id} {...item} onPress={() => navigation.navigate(item.route)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 26,
    textAlign: 'center',
    color: '#61dafb',
  },
  titleUp: {
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    fontSize: 18,
  },
  cartContainer: {
    width: '100%',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  cartTitle: {
    fontFamily: 'OpenSans-Regular',
  },
  arrow: {
    width: 20,
    height: 20,
    transform: [
      {
        rotate: '90deg',
      },
    ],
    tintColor: '#61dafb',
  },
});

export default Home;
