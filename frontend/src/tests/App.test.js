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

import SearchForm from '../components/SearchForm/SearchForm'
import TableHeader from '../components/TableHeader/TableHeader';
import ErrorModal from '../components/ErrorModal/ErrorModal'

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

    it('should render two table headers', () => {
        const wrapper = shallow(<App />)
        const header = wrapper.find(TableHeader)

        expect(header).toHaveLength(2)
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
    it('should make an axios request with correct url query if sorting changes', async () => {
        axios.get.mockResolvedValue({data: []})
        const sortBy = '-price'
        await act(async () => {
            const wrapper = mount(<App />)
            const tableHeader = wrapper.find(TableHeader).at(0)
            tableHeader.prop('handleSorting')(sortBy)
        })
        expect(axios.get).lastCalledWith(`${process.env.REACT_APP_API_URL}/api/dishes/?ordering=${sortBy}&search=`)
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
        
        expect(axios.get).lastCalledWith(`${process.env.REACT_APP_API_URL}/api/dishes/?ordering=&search=${searchValue}`)            
    })
})

describe('Test axios error handling', () => {
    it('should open the error modal with the correct error message for a server error', async () => {
        axios.get.mockRejectedValue({response: {status: 500}})
        let wrapper
        await act(async () => {
            wrapper = mount(<App />)            
        })
        wrapper.update()

        const errorModal = wrapper.find(ErrorModal)     
        expect(errorModal.prop('show')).toBeTruthy()
        expect(errorModal.prop('errorMessage')).toBe('The server had a problem completing your request')                     
    })

    it('should open the error modal with the correct error message for a request error', async() => {
        axios.get.mockRejectedValue({request: {}})
        let wrapper
        await act(async () => {
            wrapper = mount(<App />)
        })
        wrapper.update()

        const errorModal = wrapper.find(ErrorModal)
        expect(errorModal.prop('show')).toBeTruthy()
        expect(errorModal.prop('errorMessage')).toBe('The server didnt respond')                
    })

    it('should open the error modal with the correct error message for every other error', async () => {
        axios.get.mockRejectedValue({})
        let wrapper
        await act(async () => {
            wrapper = mount(<App />)
        })
        wrapper.update()

        const errorModal = wrapper.find(ErrorModal)
        expect(errorModal.prop('show')).toBeTruthy()
        expect(errorModal.prop('errorMessage')).toBe('There was an error setting up your request') 
    })
})