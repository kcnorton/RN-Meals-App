import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { useDispatch  } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Color from '../constants/colors';
import { setFilters } from '../store/actions/meals';

// separate component for filter items
const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch 
                trackColor={{ true: Color.primaryColor }}
                thumbColor={Platform.OS === 'android' ? Color.primaryColor : ''}
                value={props.state} 
                onValueChange={props.onChange}
            />
        </View>
    );
};

const FiltersScreen = props => {
    const { navigation } = props; // destructuring navigation props

    // manually handle state of the switch
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    // used to pass filter data from nav to component
    const saveFilters = useCallback(() => {
        const appliedFilters ={
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };

        dispatch(setFilters(appliedFilters)); // dispatch triggers action and changes state
    }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]); // saveFilters is only recreated when these dependencies change

    useEffect(() => {
        props.navigation.setParams({save: saveFilters});
    }, [saveFilters]); // useEffect is dependent on saveFilters

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch 
                label='Gluten-free' 
                state={isGlutenFree} 
                onChange={newValue => setIsGlutenFree(newValue)} 
            />
            <FilterSwitch 
                label='Lactose-free' 
                state={isLactoseFree} 
                onChange={newValue => setIsLactoseFree(newValue)} 
            />
            <FilterSwitch 
                label='Vegetarian' 
                state={isVegetarian} 
                onChange={newValue => setIsVegetarian(newValue)} 
            />
            <FilterSwitch 
                label='Vegan' 
                state={isVegan} 
                onChange={newValue => setIsVegan(newValue)} 
            />
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filters',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Menu' 
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} 
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Save' 
                    iconName='ios-save'
                    onPress={navData.navigation.getParam('save')} 
                />
            </HeaderButtons>
        )
    };
};

export default FiltersScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },

    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    },

    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
});