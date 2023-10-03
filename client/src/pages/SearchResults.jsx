import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchGoogleBooks } from '../utils/API';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

function SearchResults() {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
              if (searchQuery) {
                const response = await searchGoogleBooks(searchQuery);
                if (!response.ok) {
                  throw new Error('something went wrong!');
                }
        
                const data = await response.json();
                const bookData = data.items.map((book) => ({
                  bookId: book.id,
                  authors: book.volumeInfo.authors || ['No author to display'],
                  title: book.volumeInfo.title || 'No title to display',
                  description: book.volumeInfo.description || 'No description to display',
                  image: book.volumeInfo.imageLinks?.thumbnail || '',
                  link: book.volumeInfo.infoLink || '#', 
                }));
                setSearchResults(bookData);
              }
            } catch (error) {
              console.error(error);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    const handleDescriptionLength = (text, maxLength) => {
      if (text.length <= maxLength) {
        return text;
      }
    
      const shortenedText = text.substring(0, maxLength - 3) + '...';
      return shortenedText;
    };

  return (
    <Container>
      <h1 className='mb-5'>Search Results</h1>
      <Container className='mt-5 mb-5 fade-in'>
        <Row className='d-flex justify-content-center'>
          {searchResults.map((result) => (
            <Col key={result.bookId} xs={12} md={4} className='d-flex justify-content-center mt-3 mb-3'>
              <Card style={{ width: '36rem', height: '36rem', backgroundColor: '#D3D5D4' }}>
                <Card.Img variant="top" className='card-img' alt={result.title} src={result.image} />
                <Card.Body>
                  <Card.Title>{result.title}</Card.Title>
                  <Card.Text>
                    {result.authors.join(', ')}
                  </Card.Text>
                  <Card.Text className='card-description'>
                    {handleDescriptionLength(result.description, 150)}
                  </Card.Text>
                  <Link to={result.link}>
                    <Button className='card-btn'>More Info</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default SearchResults