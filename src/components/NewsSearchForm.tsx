import { Form, Field, Formik } from "formik";
import { Button, Col, Row } from "reactstrap";

interface Values {
  query: string;
}

interface NewsSearchFormProps {
  pageSize: number;
  searchFunction: Function;
}

export const NewsSearchForm = ({pageSize, searchFunction}: NewsSearchFormProps) => {
  return (
    <Formik
      initialValues={{query: ''}}
      onSubmit={async (values: Values, {setSubmitting}) => {
        await searchFunction({
          q: values.query, 
          withThumbnails: true, 
          page: 1,
          pageSize,
        })
        setSubmitting(false)
      }}
    >
      {({values, isSubmitting}) => (
        <Form>
          <Row>
            <Col xs='8' sm='10'>
              <Field className='form-control' type='text' name='query' placeholder='Query'/>
            </Col>
            <Col xs='2'>
              <Button 
                type='submit'
                color='primary' 
                disabled={isSubmitting || values.query === ''}>
                  Search
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}