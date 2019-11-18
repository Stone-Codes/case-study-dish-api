import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchForm from '../components/SearchForm/SearchForm'

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'



Enzyme.configure({ adapter :new Adapter() })
const { shallow } = Enzyme

describe('<SearchForm>', () => {
    it('should render a form with an input and a button', () => {
        const wrapper = shallow(<SearchForm />)

        const form = wrapper.find(Form)
        expect(form).toHaveLength(1)

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

    it('should submit the form with the value of the input', () => {
        const handleSearch = jest.fn()
        const searchValue = "My awesome test search"

        const wrapper = shallow(<SearchForm handleSearch={handleSearch}/>)

        const input = wrapper.find(Form.Control)

        input.simulate('change', {target: {value: searchValue}})

        const form = wrapper.find(Form)
        form.simulate('submit', {preventDefault: () => {}})

        expect(handleSearch).toHaveBeenCalledTimes(1)
        expect(handleSearch).toHaveBeenCalledWith(searchValue)

    })
})