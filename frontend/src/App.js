import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

function App() {

  const [dishes, setDishes] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/dishes`)
    .then(response => {
      setDishes(response.data)
    }).catch(e => {
      console.log(e)
    })
  }, [])

  return (
    <Container>
      <Form className="mt-3">
        <Form.Group as={Row} >
          <InputGroup as={Col} md={{span: 6}} lg={{span: 4}}>
            <Form.Control type="text" placeholder="Dish name"/>
            <InputGroup.Append>
              <Button type="submit">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
      <Row>
        <Col>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Dish</th>
                <th>Price</th>
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
