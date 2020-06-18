import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
    
    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }
 // sice we added state manegement... we dont need this anymore
    /*addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = priceAddition + oldPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceSubs = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubs;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }*/

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push('/checkout');
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    render (){
        const disabledInfo = { // copying in immutable way
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner />;

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onngredientRemoved}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                price={this.props.price}
                cancel={this.purchaseCancelHandler}
                success={this.purchaseContinueHandler} 
                ingredients={this.props.ings}/>
        }
        if(this.state.loading) {
            orderSummary = <Spinner />
        } 

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));