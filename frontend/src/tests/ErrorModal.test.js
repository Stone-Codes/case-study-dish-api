import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ErrorModal from '../components/ErrorModal/ErrorModal'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

Enzyme.configure({ adapter :new Adapter() })
const { shallow } = Enzyme

describe('<ErrorModal>', () => {
    it('should render the modal with an error message', () => {
        const errorMessage = 'Test message'
        const wrapper = shallow(<ErrorModal errorMessage={errorMessage} />)

        const modal = wrapper.find(Modal)
        expect(modal).toHaveLength(1)

        const modalHeader = modal.find(Modal.Header)
        expect(modalHeader).toHaveLength(1)
        const title = modalHeader.find(Modal.Title)
        expect(title).toHaveLength(1)
        
        const modalBody = modal.find(Modal.Body)
        expect(modalBody).toHaveLength(1)
        expect(modalBody.text()).toBe(errorMessage)

        const modalFooter = modal.find(Modal.Footer)
        expect(modalFooter).toHaveLength(1)
         
        const closeButton = modal.find(Button)
        expect(closeButton).toHaveLength(1)
        expect(closeButton.text()).toBe('Close')

    })

    it('should call the handle close function when the close button is clicked', () => {
        const handleClose = jest.fn()
        const wrapper = shallow(<ErrorModal handleClose={handleClose} />)

        const closeButton = wrapper.find(Button)
        closeButton.simulate('click')

        expect(handleClose).toHaveBeenCalledTimes(1)
    })
})