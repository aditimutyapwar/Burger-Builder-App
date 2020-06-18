import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import React from 'react';

configure({adapter: new Adapter()});
let wrapper;
describe('Navigation Item', () => {
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })

    it('should render 2 navigation item elements if not authemticated', () => {
       expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 navigation item elements if are authemticated', () => {
        //wrapper = shallow(<NavigationItems isAuthenticated />);
        //method 2 using enzyme
        wrapper.setProps({isAuthenticated: true}); 
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render Logout navigation item elements if are authemticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});

    
