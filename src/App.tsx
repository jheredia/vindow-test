import axios from 'axios';
import { useState } from 'react';
import { 
  Col, 
  Container, 
  Row, 
} from 'reactstrap';
import './App.css';
import { EmptyResults } from './components/EmptyResults';
import { Error } from './components/Error';
import { Loader } from './components/Loader';
import { NewsArticles } from './components/NewsArticles';
import { NewsPagination } from './components/NewsPagination';
import { NewsSearchForm } from './components/NewsSearchForm';
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

interface Image {
  thumbnail: string,
  thumbnailHeight: number,
  thumbnailWidth: number,
  url: string
}

interface Article {
  description: string
  id: string,
  image: Image,
  title: string,
  url: string,
}

function App() {

  const searchNews = async (searchParams: SearchParams) => {
    try {
      setError(false)
      setLoading(true);
      setSearched(true);
      setNews([])
      const result = await axios.get(searchUrl, {
        headers,
        params: searchParams
      })
      setNews(result.data.value);
      setQuery(searchParams.q);
      setTotalPages(result.data.totalCount/pageSize)
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  const [hasSearched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [newsArticles, setNews] = useState<Article[]>([]);
  const [query, setQuery] = useState('');

  const [totalPages, setTotalPages] = useState(0);

 

  return (
    <Container>
      <Row id='headline'>
        <Col>
          <h1>News Search</h1>
        </Col>
      </Row>
      <Row id='news-query'>
        <Col xs='12'>
          <NewsSearchForm searchFunction={searchNews} pageSize={pageSize}/>
        </Col>
      </Row>
      {!error &&
        <div className='mt-3'>
          {loading && <Loader /> }
          {!loading && <>
            {newsArticles.length === 0 &&
              <EmptyResults hasSearched={hasSearched} />
            }
            <NewsArticles articles={newsArticles} />
          </>}
        </div>
      }
      {error && 
        <Error>
          An error happened while searching for news, please try again later
        </Error>
      }
      <Row>
        <Col>
          <NewsPagination 
            items={newsArticles}
            itemsPerPage={6} 
            query={query}
            searchFunction={searchNews}
            totalPages={totalPages} 
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
