import React from 'react';
import classes from './Burger.css';
import BugerIngredient from './BurgerIngredients/BurgerIngredients';

//[...Array(props.ingredients[igKey])] : this will give the length of ingrdients eg cheese:2
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {   
            return <BugerIngredient key={igKey+i} type={igKey} />
        });
    }).reduce((arr,el) => { 
        return arr.concat(el);
    }, []); 

    // this condition is need to check if no ingredients are added

    if(transformedIngredients.length === 0){ 
        transformedIngredients = <p>Please start adding ingrdients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BugerIngredient type="bread-top" />
            {transformedIngredients}
            <BugerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;