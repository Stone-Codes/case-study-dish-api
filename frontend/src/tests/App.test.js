import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios'
import waitForExpect from 'wait-for-expect'
import { act } from 'react-dom/test-utils'

import App from '../components/App/App'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

import SearchForm from '../components/SearchForm/SearchForm'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

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

    it('should render the SearchForm in the container', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(Container).find(SearchForm)).toHaveLength(1)
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
        expect(headings.at(0).text()).toBe('Dish <FontAwesomeIcon />')
        expect(headings.at(1).text()).toBe('Price <FontAwesomeIcon />')
    })

    it('should render a table body', () =>{
        const wrapper = shallow(<App />)
        expect(wrapper.find(Table).find('tbody')).toHaveLength(1)
    })
})

describe('Fetching dishes', () => {
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

describe('Test sorting', () => {
    it('should set the correct sort icon for dish name header', () => {
        const wrapper = shallow(<App />)

        const nameHeader = wrapper.find('th').at(0) 
        const icon = nameHeader.find(FontAwesomeIcon)
        
        expect(icon.prop('icon')).toBe(faSort)
        nameHeader.simulate('click')
        waitForExpect(() => {
            expect(icon.prop('icon')).toBe(faSortUp)
        })
        nameHeader.simulate('click')
        waitForExpect(() => {
            expect(icon.prop('icon')).toBe(faSortDown)
        })        
    })

    it('should set the correct sort icon for price header', () => {
        const wrapper = shallow(<App />)

        const priceHeader = wrapper.find('th').at(1) 
        const icon = priceHeader.find(FontAwesomeIcon)
        
        expect(icon.prop('icon')).toBe(faSort)
        priceHeader.simulate('click')
        waitForExpect(() => {
            expect(icon.prop('icon')).toBe(faSortUp)
        })
        priceHeader.simulate('click')
        waitForExpect(() => {
            expect(icon.prop('icon')).toBe(faSortDown)
        }) 
    })

    it('should call the correct url with axios for sorting by name', async () => {
        axios.get.mockResolvedValue({data: []})
        const wrapper = mount(<App />)

        const nameHeader = wrapper.find('th').at(0) 
        
        await act(async() => {
            nameHeader.simulate('click')
        })
        expect(axios.get).lastCalledWith(`${process.env.REACT_APP_API_URL}/api/dishes?ordering=name&search=`)
        await act(async() => {
            nameHeader.simulate('click')
        })
        expect(axios.get).lastCalledWith(`${process.env.REACT_APP_API_URL}/api/dishes?ordering=-name&search=`)
    })

    it('should call the correct url with axios for sorting by price', async () => {
        axios.get.mockResolvedValue({data: []})
        const wrapper = mount(<App />)

        const priceHeader = wrapper.find('th').at(1) 
        
        await act(async() => {
            priceHeader.simulate('click')
        })
        expect(axios.get).lastCalledWith(`${process.env.REACT_APP_API_URL}/api/dishes?ordering=price&search=`)
        await act(async() => {
            priceHeader.simulate('click')
        })
        expect(axios.get).lastCalledWith(`${process.env.REACT_APP_API_URL}/api/dishes?ordering=-price&search=`)
    })
})

describe('Test searching', () => {
    it('should call the correct url with axios for searching', async () => {
        axios.get.mockResolvedValue({data: []})
        const searchValue = 'Test this awesome search'

        await act(async () => {
            const wrapper = mount(<App />)    
            const searchForm = wrapper.find(SearchForm)
            searchForm.prop('handleSearch')(searchValue)
        })
        
        expect(axios.get).lastCalledWith(`${process.env.REACT_APP_API_URL}/api/dishes?ordering=&search=${searchValue}`)            
    })
})