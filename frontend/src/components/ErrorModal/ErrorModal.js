import React from 'react'
import './ErrorModal.css'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAmbulance } from '@fortawesome/free-solid-svg-icons'

const ErrorModal = ({show, handleClose, errorMessage}) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="error-modal-header" closeButton>
                <Modal.Title className="error-modal-title"><FontAwesomeIcon icon={faAmbulance} /> There was an error while handling your request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorModal