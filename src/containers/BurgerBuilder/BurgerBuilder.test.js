import { BurgerBuilder } from './BurgerBuilder';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { configure, shallow } from 'enzyme';

configure({adapter: new Adapter()});
let wrapper;
describe('Burger Builder', () => {
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });

    it('should render BuildControls element when receiving ings', () => {
        wrapper.setProps({ings: {salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
