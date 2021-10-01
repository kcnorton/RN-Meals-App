import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile 
                title={itemData.item.title} 
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({routeName: 'CategoryMeals', params: {
                        categoryId: itemData.item.id
                    }});
                }} 
            />
        );
    };
    
    return (
        <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
    );
};

CategoriesScreen.navigationOptions = {
    headerTitle: 'Meal Categories'
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    }
});