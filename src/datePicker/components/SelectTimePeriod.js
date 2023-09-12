import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated,
    FlatList,
    Easing,
    TouchableOpacity,
    I18nManager,
} from 'react-native';

import { useCalendar } from '../DatePicker';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const TimeScroller = forwardRef(({ title, data, onChange },ref) => {
    const { options, utils } = useCalendar();
    const style = styles(options);
    const scrollAnimatedValue = useRef(new Animated.Value(0)).current;
    const scrollListener = useRef(null);
    const active = useRef(0);
    data = ['', '', ...data, '', ''];

    const scrollRef = useRef(null);

    useEffect(() => {
        scrollListener.current && clearInterval(scrollListener.current);
        scrollListener.current = scrollAnimatedValue.addListener(({ value }) => (active.current = value));

        return () => {
            clearInterval(scrollListener.current);
        };
    }, [scrollAnimatedValue]);

    useImperativeHandle(ref, () => {
        return {
            scrollItem: (item) => scrollRef.current?.scrollToItem(item)
        }
    })
    const renderItem = ({ item, index }) => {
        const makeAnimated = (a, b, c) => {
            return {
                inputRange: [...data.map((_, i) => i * 36)],
                outputRange: [
                    ...data.map((_, i) => {
                        const center = i + 2;
                        if (center === index) {
                            return a;
                        } else if (center + 1 === index || center - 1 === index) {
                            return b;
                        } else {
                            return c;
                        }
                    }),
                ],
            };
        };


        return (
            <Animated.View
                style={[
                    {
                        width: '100%',

                        opacity: scrollAnimatedValue.interpolate(makeAnimated(1, 0.6, 0.3)),
                        transform: [
                            {
                                scale: scrollAnimatedValue.interpolate(makeAnimated(1.2, 0.9, 0.8)),
                            },
                            {
                                scaleX: I18nManager.isRTL ? -1 : 1,
                            },
                        ],
                    },
                    style.listItem,
                ]}>
                <Text style={style.listItemText}>
                    {utils.toPersianNumber(String(item).length === 1 ? '0' + item : item)}
                </Text>
            </Animated.View>
        );
    }

    return (
        <View style={style.row} >
            <Text style={style.title}>{title}</Text>
            <AnimatedFlatList
                pagingEnabled
                style={{ width: '100%' }}
                showsHorizontalScrollIndicator={false}
                // horizontal
                showsVerticalScrollIndicator={false}
                snapToInterval={36}
                ref={ref}
                decelerationRate={'fast'}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollAnimatedValue } } }], {
                    useNativeDriver: true,
                })}
                data={I18nManager.isRTL ? data.reverse() : data}
                onMomentumScrollEnd={() => {
             
                    const index = Math.round(active.current / 36);
                    onChange(data[index + 2]);
                }}
                keyExtractor={(_, i) => String(i)}
                renderItem={renderItem}
                inverted={I18nManager.isRTL}
                contentContainerStyle={
                    I18nManager.isRTL && {
                        transform: [
                            {
                                scaleX: -1,
                            },
                        ],
                    }
                }
            />
        </View>
    );
})

const SelectTimePeriod = () => {
    const { options, state, utils, minuteInterval, mode, onTimePeriodChange } = useCalendar();
    const [mainState, setMainState] = state;
    const [show, setShow] = useState(false);
    const [clickAble,setClickable] = useState(false);
    const [time, setTime] = useState({
        time1: {
            minute: 0,
            hour: 0,
        },
        time2: {
            minute: 0,
            hour: 0,
        }
    });

    const style = styles(options);
    const openAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        show &&
            setTime({
                time1: {
                    minute: 0,
                    hour: 0,
                },
                time2: {
                    minute: 0,
                    hour: 0,
                }
            });
    }, [show]);

    useEffect(() => {
        mainState.periodTimeOpen && setShow(true);
        Animated.timing(openAnimation, {
            toValue: mainState.periodTimeOpen ? 1 : 0,
            duration: 350,
            useNativeDriver: true,
            easing: Easing.bezier(0.17, 0.67, 0.46, 1),
        }).start(() => {
            !mainState.periodTimeOpen && setShow(false);
        });
    }, [mainState.periodTimeOpen, openAnimation]);
    
    useEffect(() => {

        const { time1, time2 } = time;
        if (time2.hour > time1.hour) { 
            setClickable(true);
            return;

        }
        if (time2.hour === time1.hour && time2.minute > time1.minute) { 
            setClickable(true);
            return;
        }

        setClickable(false);


     },[time])
    const selectTime = () => {
        const { time1, time2 } = time;

        const newTime1 = utils.getDate(mainState.activeDate);
        newTime1.hour(time1.hour).minute(time1.minute);

        const newTime2 = utils.getDate(mainState.activeDate);
        newTime2.hour(time2.hour).minute(time2.minute);

        onTimePeriodChange([utils.getFormated(newTime1, 'timeFormat'),utils.getFormated(newTime2, 'timeFormat')]);
    };

    const containerStyle = [
        style.container,
        {
            opacity: openAnimation,
            transform: [
                {
                    scale: openAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1.1, 1],
                    }),
                },
            ],
        },
    ];


    return show ? (
        <Animated.View style={containerStyle}>
            <View style={{ flexDirection: 'row', width: '100%', height: 180, }}>
                <View style={{ flex: 1 }}>
                    <TimeScroller
                        title={utils.config.hour}
                        data={Array.from({ length: 24 }, (x, i) => i)}
                        onChange={hour => setTime({ ...time, time1:{...time.time1,hour}  })   }
                    />
                </View>
                <View style={{ width: 12, height: '100%' }}><View style={{ height: 110 }}></View><View style={{  alignItems: 'center', justifyContent: 'center' }}><Text>:</Text></View></View>

                <View style={{ flex: 1 }}>
                    <TimeScroller
                        title={utils.config.minute}
                        data={Array.from({ length: 60 / minuteInterval }, (x, i) => i * minuteInterval)}
                        onChange={minute => setTime({ ...time, time1:{...time.time1,minute}  })}
                    />
                </View>
                <View style={{ width: 21, height: '100%' }}><View style={{ height: 110 }}></View><View style={{  alignItems: 'center', justifyContent: 'center' }}><Text>至</Text></View></View>
                <View style={{ flex: 1 }}>



                    <TimeScroller
                        title={utils.config.hour}
                        data={Array.from({ length: 24 }, (x, i) => i)}
                        onChange={hour => setTime({ ...time, time2:{...time.time2,hour}  })}
                    />
                </View>
                <View style={{ width: 12, height: '100%' }}><View style={{ height: 110 }}></View><View style={{  alignItems: 'center', justifyContent: 'center' }}><Text>:</Text></View></View>


                <View style={{ flex: 1 }}>
                    <TimeScroller
                        title={utils.config.minute}
                        data={Array.from({ length: 60 / minuteInterval }, (x, i) => i * minuteInterval)}
                        onChange={minute => setTime({ ...time, time2:{...time.time2,minute}  })}
                    />
                </View>

            </View>

            <View style={style.footer}>
                <TouchableOpacity style={style.button(clickAble)} disabled={!clickAble}  activeOpacity={0.8} onPress={selectTime}>
                    <Text style={style.btnText}>确认</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    ) : null;
};

const styles = theme =>
    StyleSheet.create({
        container: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            right: 0,
            backgroundColor: theme.backgroundColor,
            borderRadius: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            zIndex: 999,
        },
        row: {
            flexDirection: 'column',
            alignItems: 'center',
            marginVertical: 5,
        },
        title: {
            fontSize: theme.textHeaderFontSize,
            color: theme.mainColor,
            fontFamily: theme.headerFont,
            height: 24,

        },
        listItem: {
            height: 36,
   
            alignItems: 'center',
            justifyContent: 'center',
        },
        listItemText: {
            fontSize: theme.textHeaderFontSize,
            color: theme.textDefaultColor,
            fontFamily: theme.defaultFont,
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
        },
        button: (disabled) => {
       
            return {
                paddingVertical: 10,
                paddingHorizontal: 25,
                borderRadius: 8,
                backgroundColor: disabled ? theme.mainColor: 'grey' ,
                // backgroundColor:theme.mainColor,
                margin: 8,
            }
        },
        btnText: {
            fontSize: theme.textFontSize,
            color: theme.selectedTextColor,
            fontFamily: theme.defaultFont,
        },
        cancelButton: {
            backgroundColor: theme.textSecondaryColor,
        },
    });

export { SelectTimePeriod };
