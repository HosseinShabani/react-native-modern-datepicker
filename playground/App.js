import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {createAppContainer, withNavigation} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//screens
import {
  Home,
  CustomizationExample,
  BasicUsageExample,
  FullUsageExample,
  JalaaliExample,
  MinMaxExample,
  MonthYearExample,
  TimePickerExample,
} from './src/screens';

const styles = StyleSheet.create({
  arrow: {
    width: 20,
    height: 20,
    marginLeft: 10,
    transform: [
      {
        rotate: '-90deg',
      },
    ],
    tintColor: '#61dafb',
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: Dimensions.get('screen').width < 350 ? 5 : 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    height: '100%',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const defaultOptions = {
  defaultFont: 'OpenSans-Regular',
  headerFont: 'OpenSans-Bold',
};

const PageWrapper = ({children, style = {}}) => (
  <SafeAreaView style={styles.wrapper}>
    <View style={[styles.container, style]}>{children}</View>
  </SafeAreaView>
);

const BackButton = withNavigation(({navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.back}>
        <Image style={styles.arrow} source={require('./src/assets/images/chevron.png')} />
      </View>
    </TouchableWithoutFeedback>
  );
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  BasicUsageExample: {
    screen: () => (
      <PageWrapper>
        <BasicUsageExample defaultOptions={defaultOptions} />
      </PageWrapper>
    ),
    navigationOptions: {
      headerTitle: 'Basic usage',
      headerLeft: <BackButton />,
    },
  },
  CustomizableExample: {
    screen: () => (
      <PageWrapper
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: '#090C08',
        }}>
        <CustomizationExample defaultOptions={defaultOptions} />
      </PageWrapper>
    ),
    navigationOptions: {
      headerTitle: 'Customization',
      headerLeft: <BackButton />,
    },
  },

  JalaaliExample: {
    screen: () => (
      <PageWrapper>
        <JalaaliExample defaultOptions={defaultOptions} />
      </PageWrapper>
    ),
    navigationOptions: {
      headerTitle: 'Jalaali',
      headerLeft: <BackButton />,
    },
  },
  MinMaxExample: {
    screen: () => (
      <PageWrapper>
        <MinMaxExample defaultOptions={defaultOptions} />
      </PageWrapper>
    ),
    navigationOptions: {
      headerTitle: 'Minimum & Maximum',
      headerLeft: <BackButton />,
    },
  },
  FullUsageExample: {
    screen: () => (
      <PageWrapper>
        <FullUsageExample defaultOptions={defaultOptions} />
      </PageWrapper>
    ),
    navigationOptions: {
      headerTitle: 'Full-usage',
      headerLeft: <BackButton />,
    },
  },
  TimePickerExample: {
    screen: () => (
      <PageWrapper>
        <TimePickerExample defaultOptions={defaultOptions} />
      </PageWrapper>
    ),
    navigationOptions: {
      headerTitle: 'Time Picker',
      headerLeft: <BackButton />,
    },
  },
  MonthYearExample: {
    screen: () => (
      <PageWrapper>
        <MonthYearExample defaultOptions={defaultOptions} />
      </PageWrapper>
    ),
    navigationOptions: {
      headerTitle: 'Month Year',
      headerLeft: <BackButton />,
    },
  },
});

export default createAppContainer(AppNavigator);
