import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Col, Container, FormGroup, Row } from 'reactstrap';
import './App.css';

interface Values {
  query: string
}

function App() {
  const [isSubmitting, setSubmitting] = useState(false)
  return (
    <Container>
      <Row>
        <Col>
          <h1>News Search</h1>
        </Col>
      </Row>
      <Row>
        <Col xs='12'>
        <Formik
          initialValues={{query: ''}}
          onSubmit={(values: Values, {setSubmitting}) => {
            setTimeout(() => setSubmitting(false), 400);
          }}
        >
          {({values, isSubmitting}) => (
            <Form>
              <Row>
                <Col xs='10'>
                  <Field className='form-control' type='text' name='query' placeholder='Query'/>
                </Col>
                <Col xs='2'>
                  <Button type='submit' disabled={isSubmitting || values.query === ''}>Search</Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
