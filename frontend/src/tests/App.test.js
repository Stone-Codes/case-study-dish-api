import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

Enzyme.configure({ adapter :new Adapter() })
const {shallow, mount} = Enzyme

describe('Basic layout', () => {
    it('should render a container', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(Container)).toHaveLength(1)
    })

    it('should render a form in the container', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(Form)).toHaveLength(1)
    })

    it('should render one row in the container', () => {
        const wrapper = shallow(<App />)
        const container = wrapper.find(Container)
        expect(container.find(Row)).toHaveLength(1)
    })

})

describe('Table', () => {
    it('should render a table', () => {
        const wrapper = shallow(<App />)
        const table = wrapper.find(Table)

        expect(table).toHaveLength(1)
    })

    it('should render correct table headers', () => {
        const wrapper = shallow(<App />)
        const header = wrapper.find(Table).find('thead')

        expect(header).toHaveLength(1)
        
        const headerRow = header.find('tr')
        expect(headerRow).toHaveLength(1)

        const headings = headerRow.find('th')
        expect(headings).toHaveLength(2)
        expect(headings.at(0).text()).toBe('Dish')
        expect(headings.at(1).text()).toBe('Price')
    })

    it('should render a table body', () =>{
        const wrapper = shallow(<App />)
        expect(wrapper.find(Table).find('tbody')).toHaveLength(1)
    })
})
