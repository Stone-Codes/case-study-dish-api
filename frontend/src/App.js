import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'


function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Table>
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
