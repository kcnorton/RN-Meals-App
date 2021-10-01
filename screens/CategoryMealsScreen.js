import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId');
    const displayedMeals = MEALS.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    const renderMealItem = itemData => {
        return (
            <MealItem 
                title={itemData.item.title} 
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imgURL}
                onSelectMeal={() => {
                    props.navigation.navigate({routeName: 'MealDetail', params: {
                        mealId: itemData.item.id
                    }});
                }} 
            />
        );
    }

    return (
        <View style={styles.screen}>
            <FlatList 
                data={displayedMeals} 
                renderItem={renderMealItem} 
                style={{width: '100%'}}
            />
        </View>
    );
};

// nav options can be dynamic if the data we are using changes
// use the function format, shown here
CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    
    return {
        headerTitle: selectedCategory.title,
    };
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
});