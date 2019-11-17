import React, { useState } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'


const SearchForm = ({handleSearch}) => {

    const [searchValue, setSearchValue] = useState('')
    
    const handleSearchChange = e => {
      setSearchValue(e.target.value)
    }

    const handleSubmitSearch = e => {
      e.preventDefault()
      handleSearch(searchValue)
    }

    return (
      <Form className="mt-3" onSubmit={handleSubmitSearch}>
        <Form.Group as={Row} >
          <InputGroup as={Col} md={{span: 6}} lg={{span: 4}}>
            <Form.Control value={searchValue} onChange={handleSearchChange} type="text" placeholder="Dish name"/>
            <InputGroup.Append>
              <Button type="submit">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    )
}

export default SearchForm