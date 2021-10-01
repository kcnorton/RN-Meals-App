import React from 'react';
import { View, FlatList } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId');
    const displayedMeals = MEALS.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    

    return (
        <MealList
            listData={displayedMeals} 
            navigation={props.navigation}
        />
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
