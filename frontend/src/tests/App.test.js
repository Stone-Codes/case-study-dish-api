import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios'
import waitForExpect from 'wait-for-expect'
import { act } from 'react-dom/test-utils'

import App from '../App'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

Enzyme.configure({ adapter :new Adapter() })
const {shallow, mount} = Enzyme

jest.mock('axios')

afterEach(() => {
    axios.get.mockClear()
})

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

describe('Search Form', () => {
    it('should render a form with input and button', () => {
        const wrapper = shallow(<App />)
        const form = wrapper.find(Form)
        const formGroup = form.find(Form.Group)        

        expect(formGroup).toHaveLength(1)

        const inputGroup = formGroup.find(InputGroup)
        expect(inputGroup).toHaveLength(1)

        const input = inputGroup.find(Form.Control)
        expect(input).toHaveLength(1)
        expect(input.prop('type')).toBe('text')
        expect(input.prop('placeholder')).toBe('Dish name')

        const inputGroupAppend = inputGroup.find(InputGroup.Append)
        expect(inputGroupAppend).toHaveLength(1)
        
        const button = inputGroupAppend.find(Button)
        expect(button).toHaveLength(1)
        expect(button.prop('type')).toBe('submit')

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

describe('Api related tests', () => {
    it('should fetch all dishes when component rendered', async () => {
        const dishes = [{id:1, name: 'Schnitzel', price: 10.50}, {id:2,name: 'Spaghetti', price:5.99}]
        const response = {data: dishes}
        axios.get.mockResolvedValue(response)
        await act(async() => {           
            const wrapper = mount(<App />)                                
        })
        expect(axios.get).toHaveBeenCalledTimes(1) 
    })

    it('should render the fetched data in the table', async() => {
        const dishes = [{id:1, name: 'Schnitzel', price: 10.50}, {id:2,name: 'Spaghetti', price:5.99}]
        const response = {data: dishes}
        let wrapper

        axios.get.mockResolvedValue(response)
        await act(async() => {           
            wrapper = mount(<App />)
        })                    
        await waitForExpect(() => {
            wrapper.update()
            const rows = wrapper.find(Table).find('tbody').find('tr')

            expect(rows).toHaveLength(2)
            expect(rows.at(0).find('td').at(0).text()).toBe(dishes[0].name)
            expect(rows.at(0).find('td').at(1).text()).toBe(dishes[0].price.toString())

            expect(rows.at(1).find('td').at(0).text()).toBe(dishes[1].name)
            expect(rows.at(1).find('td').at(1).text()).toBe(dishes[1].price.toString())
        })                           
    })
}) 