import React from "react"
import { Alert, Col, Row } from "reactstrap"

interface ErrorProps {
  children: React.ReactNode;
}
export const Error = ({children}: ErrorProps) => {
  return (
    <Row className='mt-3'>
      <Col>
        <Alert color='danger'>
          {children}
        </Alert>
      </Col>
    </Row>
  )
}