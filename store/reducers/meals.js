import {
    MEALS
} from '../../data/dummy-data';
import {
    SET_FILTERS,
    TOGGLE_FAVORITE
} from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
}

const mealsReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case TOGGLE_FAVORITE:
            const isFavMeal = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if (isFavMeal >= 0 ) {
                const updatedMeals = [...state.favoriteMeals];
                updatedMeals.splice(isFavMeal,1);
                return {...state, favoriteMeals: updatedMeals}
            } else {
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return {...state, favoriteMeals: state.favoriteMeals.concat(meal)}
            }
            break;
        case SET_FILTERS:
            const appliedFilters = actions.filters;
            const filteredMeals = state.meals.filter(meal => {
                if(appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false
                }
                if(appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false
                }
                if(appliedFilters.vegan && !meal.isVegan) {
                    return false
                }
                if(appliedFilters.vegetarian && !meal.isVegetarian) {
                    return false
                }
                return true;
            });
            return{...state, filteredMeals: filteredMeals};
        default:
            return state;
    }
}

export default mealsReducer;