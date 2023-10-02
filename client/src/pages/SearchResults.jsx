import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchGoogleBooks } from '../utils/API';

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

  return (
    <div>
      <h1>Search Results</h1>
      {searchResults.map((result) => (
        <div key={result.bookId}>
          <h2>{result.title}</h2>
          <p>Authors: {result.authors.join(', ')}</p>
          <p>Description: {result.description}</p>
          <img src={result.image} alt={result.title} />
          <a href={result.link} target="_blank" rel="noopener noreferrer">
            More Info
          </a>
        </div>
      ))}
    </div>
  );
}

export default SearchResults