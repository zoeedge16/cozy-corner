// import { useQuery } from "@apollo/client";
// import { QUERY_USERS } from "../utils/queries";
import Carousel from 'react-bootstrap/Carousel';
import bookSearch from '../images/book-search.png';
import bookmarks from '../images/bookmarks.png';
import preferences from '../images/preferences.png';

// import UserList from "../components/UserList";

function Home() {
  // const { data, loading, error } = useQuery(QUERY_USERS);

  // const users = data?.users || [];

  // if (error) {
  //   throw Error(error);
  // }

  // if (loading) {
  //   return <h2>Loading…</h2>;
  // }
  

  return (
    <>
      <Carousel id='carousel'>
      <Carousel.Item>
        <img src={bookSearch} className='carousel-img' />
        <Carousel.Caption className='carousel-caption'>
          <h3>Search through thousands of books!</h3>
          <p>Including all your favorites from authors like J.K. Rowling, Stephen King, and more!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={bookmarks} className='carousel-img' />
        <Carousel.Caption className='carousel-caption'>
          <h3>Save books you've read and love to your profile!</h3>
          <p>And bookmark the ones you want to read next!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={preferences} className='carousel-img' />
        <Carousel.Caption className='carousel-caption'>
          <h3>Set your own reading schedule in preferences!</h3>
          <p>
            Put in the number of pages in your book, how many days you want to read it in, and we'll generate a schedule for you!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      {/* <UserList users={users} /> */}
    </>
  );
}

export default Home;