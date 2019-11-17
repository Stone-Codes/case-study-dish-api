import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

function App() {
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
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
