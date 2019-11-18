import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TableHeader from '../components/TableHeader/TableHeader'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import waitForExpect from 'wait-for-expect';

Enzyme.configure({ adapter :new Adapter() })
const {shallow, mount} = Enzyme

const sortName = 'awesomesortname'

describe('<TableHeader> render', () => {
    it('should render a th with a FontAwesomeIcon ', () => {
        const wrapper = shallow(<TableHeader sortedBy='' />)

        const th = wrapper.find('th')
        expect(th).toHaveLength(1)

        const icon = wrapper.find(FontAwesomeIcon)
        expect(icon).toHaveLength(1)
    })

    it('should render the correct displayName', () => {
        const displayName = 'My Header'
        const wrapper = shallow(<TableHeader sortedBy='' displayName={displayName} />)

        const th = wrapper.find('th')
        expect(th.text().startsWith(displayName)).toBeTruthy()

    })
})

describe('<TableHeader> sorting icons', () => {
    it('should render the correct initial sorting icon', () => {
        const wrapper = shallow(<TableHeader sortedBy='' sortName={sortName} />)

        const icon = wrapper.find(FontAwesomeIcon)
        expect(icon.prop('icon')).toBe(faSort)
    })

    it('should render the correct asc sorting icon', () => {
        const wrapper = shallow(<TableHeader sortedBy={sortName} sortName={sortName} />)

        const icon = wrapper.find(FontAwesomeIcon)
        expect(icon.prop('icon')).toBe(faSortUp)
    }) 

    it('should render the correct desc sorting icon', () => {
        const wrapper = shallow(<TableHeader sortedBy={`-${sortName}`}  sortName={sortName}/>)

        const icon = wrapper.find(FontAwesomeIcon)
        expect(icon.prop('icon')).toBe(faSortDown)
    })
})

describe('<TableHeader> handleSorting call', () => {
    it('should call handleSorting with asc sortname when sortedBy is not sortName', () => {
        const handleSorting = jest.fn(() => {})
        const wrapper = shallow(<TableHeader sortedBy='' sortName={sortName} handleSorting={handleSorting} />)

        const th = wrapper.find('th')
        th.simulate('click')

        expect(handleSorting).toHaveBeenCalledTimes(1)
        expect(handleSorting).toHaveBeenCalledWith(sortName)
    })

    it('should call handleSorting with desc sortname when sortedBy is sorted asc', () => {
        const handleSorting = jest.fn(() => {})
        const wrapper = shallow(<TableHeader sortedBy={sortName} sortName={sortName} handleSorting={handleSorting} />)

        const th = wrapper.find('th')
        th.simulate('click')

        expect(handleSorting).toHaveBeenCalledTimes(1)
        expect(handleSorting).toHaveBeenCalledWith('-'+sortName)
    })

    it('should call handleSorting with asc sortname when sortedBy is sorted desc', () => {
        const handleSorting = jest.fn(() => {})
        const wrapper = shallow(<TableHeader sortedBy={'-'+sortName} sortName={sortName} handleSorting={handleSorting} />)

        const th = wrapper.find('th')
        th.simulate('click')
        
        expect(handleSorting).toHaveBeenCalledTimes(1)
        expect(handleSorting).toHaveBeenCalledWith(sortName)
    })
})