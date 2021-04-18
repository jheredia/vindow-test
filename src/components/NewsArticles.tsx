import { useState } from "react";
import { Card, CardBody, CardImg, CardLink, CardText, CardTitle, Col, Modal, ModalBody, Row } from "reactstrap"

interface NewsArticlesProps {
  articles: Array<Article>
}

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

export const NewsArticles = ({articles}: NewsArticlesProps) => {
  const [modal, setModal] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState('');


  const toggle = () => setModal(!modal);

  const toggleImageModal = (url: string) => {
    setImageModalUrl(url);
    toggle()
  };

  return (
    <>
      <Row>
      {
        articles.map((article) => (
          <Col xs='12' sm='4' key={article.id}>
            <Card className="my-3 news-card">
              <CardBody>
                <CardTitle>
                  <h5>{article.title}</h5>
                </CardTitle>
              </CardBody>
              {article.image?.thumbnail && 
                <div className='news-thumbnail-container'>
                <CardImg 
                  width={article.image.thumbnailWidth} 
                  src={article.image.thumbnail}
                  className='px-3 rounded news-thumbnail'
                  onClick={() => toggleImageModal(article.image.url)}
                />
                </div>}
              <CardBody>
                <CardText className='news-content'>
                  {article.description}
                </CardText>
              </CardBody>
              <CardBody className='text-right'>
                <CardLink href={article.url}>
                  <small>Read more...</small>
                </CardLink>
              </CardBody>
            </Card>
          </Col>
        ))
      }
      </Row>
      <Modal isOpen={modal} toggle={toggle} className='modal-lg'>
        <ModalBody>
          <img src={imageModalUrl} className="img-fluid w-100" alt="News thumbnail modal"/>
        </ModalBody>
      </Modal>
    </>
  )
}