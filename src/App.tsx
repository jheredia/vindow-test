import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { 
  Button, 
  Card, 
  CardBody, 
  CardImg, 
  CardLink, 
  CardText, 
  CardTitle, 
  Col, 
  Container, 
  Modal, 
  ModalBody, 
  Pagination, 
  PaginationItem, 
  PaginationLink, 
  Row, 
  Spinner 
} from 'reactstrap';
import './App.css';

interface Values {
  query: string
}

interface Image {
  thumbnail: string,
  thumbnailHeight: number,
  thumbnailWidth: number,
  url: string
}
interface New {
  description: string
  id: string,
  image: Image,
  title: string,
  url: string,
}

interface SearchParams {
  q: string,
  withThumbnails: boolean,
  page: number,
  pageSize: number
}

const searchUrl = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI';
const headers = {
  'x-rapidapi-key': 'e28105562fmsh01edebafeeb6117p1f37e7jsn0221a314ae3d',
  'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
}
const pageSize = 6



function App() {
  const moveToPage = async (page: number) => {
    setLoading(true)
    await searchNews({q: query, withThumbnails: true, page, pageSize: 6})
    setLoading(false)
    setPage(page)
  }
  const getPaginationItems = () => {
    let rows = [
      <PaginationItem key={`previous-page-item`}>
        <PaginationLink 
          disabled={page === 1} 
          previous 
          href="" 
          onClick={() => moveToPage(page-1)} 
        />
      </PaginationItem>,
    ];
    let endPage = page+3 <= totalPages ? page+3 : totalPages;
    let startPage = page-3 >= 0 ? page-3 : page-1;
    console.log({endPage, page, totalPages})
    for (let i = startPage; i < endPage; i++) {
      rows.push(
      <PaginationItem active={i+1===page} key={`pagination-item-${i}`}>
        <PaginationLink href="" onClick={() => moveToPage(i+1)}>{i+1}</PaginationLink>
      </PaginationItem>)
    }
    return [...rows, 
    <PaginationItem key={`next-page-item`}>
      <PaginationLink 
        disabled={page >= totalPages} 
        next 
        href="" 
        onClick={() => moveToPage(page+1)}/>
      </PaginationItem>];
  }

  const searchNews = async (searchParams: SearchParams) => {
    const result = await axios.get(searchUrl, {
      headers,
      params: searchParams
    })
    setNews(result.data.value);
    setTotalPages(result.data.totalCount/pageSize)
  };

  const [hasSearched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [news, setNews] = useState<New[]>([]);
  const [query, setQuery] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [modal, setModal] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState('');


  const toggle = () => setModal(!modal);

  const toggleImageModal = (url: string) => {
    console.log(url);
    setImageModalUrl(url);
    toggle()
  };

  return (
    <Container>
      <Row id='headline'>
        <Col>
          <h1>News Search</h1>
        </Col>
      </Row>
      <Row id='news-query'>
        <Col xs='12'>
          <Formik
            initialValues={{query: ''}}
            onSubmit={async (values: Values, {setSubmitting}) => {
              setLoading(true);
              setSearched(true)
              await searchNews({
                q: values.query, 
                withThumbnails: true, 
                page,
                pageSize,
              })
              setQuery(values.query);
              setSubmitting(false)
              setLoading(false)
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
                      color='primary' 
                      type='submit' 
                      disabled={isSubmitting || values.query === ''}>
                        Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Row id='news-cards' className='mt-3'>
        {loading && <>
          <Col>
            <Row className='justify-content-center'>
              <Col xs='1'>
                <Spinner type='grow' color='success' />
              </Col>
            </Row>
          </Col>
        </>}
        {!loading && <>
          {news.length === 0 &&
            <>
              {!hasSearched && 
                <Col xs='9'>
                  <p>Start by writing some query on the input field above</p>
                </Col>
              }
              {hasSearched && 
                <Col xs='9'>
                  <h1>Oops! Nothing to see here</h1>
                  <p>It seems that there are no results for your search :(</p>
                </Col>
              }
            </> 
          }
          {news.map((newInfo) => (
            <Col xs='12' sm='4' key={newInfo.id}>
              <Card className="my-3">
                <CardBody>
                  <CardTitle>
                    <h5>{newInfo.title}</h5>
                  </CardTitle>
                </CardBody>
                {newInfo.image?.thumbnail && 
                  <CardImg 
                    width={newInfo.image.thumbnailWidth} 
                    src={newInfo.image.thumbnail}
                    className='px-3 rounded news-thumbnail'
                    onClick={() => toggleImageModal(newInfo.image.url)}
                  />}
                <CardBody>
                  <CardText className='news-content'>
                    {newInfo.description}
                  </CardText>
                </CardBody>
                <CardBody className='text-right'>
                  <CardLink href={newInfo.url}>
                    <small>Read more...</small>
                  </CardLink>
                </CardBody>
              </Card>
            </Col>
          ))}
          {news.length > 0 &&
            <>
              <Col>
                <Pagination aria-label="Page navigation" listClassName='justify-content-center'>
                  {
                    getPaginationItems()
                  }
                </Pagination>
              </Col>
              <Modal isOpen={modal} toggle={toggle} className='modal-lg'>
                <ModalBody>
                  <img src={imageModalUrl} className="img-fluid w-100" alt="News thumbnail modal"/>
                </ModalBody>
              </Modal>
            </>
          }
        </>}
      </Row>
    </Container>
  );
}

export default App;
