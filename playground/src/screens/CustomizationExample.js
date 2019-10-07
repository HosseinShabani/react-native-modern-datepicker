import React, { useEffect } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const CustomizationExample = ({ defaultOptions }) => {
  const animatedOpacity = new Animated.Value(0);
  const animatedScale = new Animated.Value(1.02);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
      }),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
      }),
    ]).start();
  }, [animatedOpacity, animatedScale]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: animatedOpacity,
          transform: [
            {
              scale: animatedScale,
            },
          ],
        },
      ]}
    >
      <DatePicker
        options={{
          ...defaultOptions,
          backgroundColor: '#090C08',
          textHeaderColor: '#FFA25B',
          textDefaultColor: '#F6E7C1',
          selectedTextColor: '#fff',
          mainColor: '#F4722B',
          textSecondaryColor: '#D6C7A1',
          borderColor: 'rgba(122, 146, 165, 0.1)',
        }}
        mode="calendar"
        selectorEndingYear={2030}
        selectorStartingYear={2000}
        style={styles.calendar}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#FFA25B',
    borderRadius: 10,
  },
  text: {
    marginBottom: 20,
    color: '#FFA25B',
    fontFamily: 'OpenSans-Bold',
  },
});

export default CustomizationExample;
