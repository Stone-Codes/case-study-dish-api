import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App'

Enzyme.configure({ adapter :new Adapter() })
const {shallow, mount} = Enzyme

describe('Test for the dish table', () => {
    test('that there is a table', () => {
        const wrapper = mount(<App />)
        const table = wrapper.find('table')

        expect(table).toHaveLength(1)
        
    })

    test('that the table has a header', () => {
        const wrapper = shallow(<App />)
        const thead = wrapper.find('thead')

        expect(thead).toHaveLength(1)
    })

    test('that the headings are present', () => {
        const wrapper = shallow(<App />)
        const headings = wrapper.find('th')

        expect(headings).toHaveLength(2)
        expect(headings.at(0)).toBe('Dish')
        expect(headings.at(1)).toBe('Price')
    })

    test('that the table has a body', () => {
        const wrapper = shallow(<App />)
        const tbody = wrapper.find('tbody')

        expect(tbody).toHaveLength(1)
    })
})