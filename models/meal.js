class Meal {
    constructor(id, categoryIds, title, affordability, complexity, imgURL, duration, ingredients, steps, isGlutenFree, isVegan, isVegetarian, isLactoseFree) {
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.affordability = affordability;
        this.imgURL = imgURL;
        this.duration = duration;
        this.ingredients = ingredients;
        this.complexity = complexity;
        this.steps = steps;
        this.isGlutenFree = isGlutenFree;
        this.isLactoseFree = isLactoseFree;
        this.isVegan = isVegan;
        this.isVegetarian = isVegetarian;
    }
};

export default Meal;