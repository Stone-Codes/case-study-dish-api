import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

import SearchForm from '../SearchForm/SearchForm';
import TableHeader from '../TableHeader/TableHeader';

function App() {

  const [dishes, setDishes] = useState([])
  const [sorting, setSorting] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/dishes/?ordering=${sorting}&search=${search}`)
    .then(response => {
      setDishes(response.data)
    }).catch(e => {
      console.log(e)
    })
  }, [sorting, search])


  const handleSorting = sortBy => {
    setSorting(sortBy)
  }

  const handleSearch = dishName => {
    setSearch(dishName)
  }

  return (
    <Container>
      <SearchForm handleSearch={handleSearch} />
      <Row>
        <Col>
          <Table striped bordered>
            <thead>
              <tr>
                <TableHeader handleSorting={handleSorting} sortedBy={sorting} displayName="Dish" sortName="name"/>
                <TableHeader handleSorting={handleSorting} sortedBy={sorting} displayName="Price" sortName="price" />
              </tr>
            </thead>
            <tbody>
              {
                dishes.map(dish => <tr key={dish.id}>
                  <td>{dish.name}</td>
                  <td>{dish.price}</td>
                </tr>)
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
