import { Col, Row, Spinner } from "reactstrap"

export const Loader = () => {
  return (
    <Row className='justify-content-center'>
      <Col xs='1'>
        <Spinner type='grow' color='success' />
      </Col>
    </Row>
  )
}