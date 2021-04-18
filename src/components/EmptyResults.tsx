import { Col } from "reactstrap"

interface EmptyResultsProps {
  hasSearched: boolean;
}

export const EmptyResults = ({hasSearched}: EmptyResultsProps) => {
  return (
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
  )
}