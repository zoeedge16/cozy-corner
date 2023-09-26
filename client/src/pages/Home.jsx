// import { useQuery } from "@apollo/client";
// import { QUERY_USERS } from "../utils/queries";
import Carousel from 'react-bootstrap/Carousel';

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
        <img src='https://placehold.co/600x400' className='carousel-img' />
        <Carousel.Caption className='carousel-caption'>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src='https://placehold.co/600x400' className='carousel-img' />
        <Carousel.Caption className='carousel-caption'>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src='https://placehold.co/600x400' className='carousel-img' />
        <Carousel.Caption className='carousel-caption'>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      {/* <UserList users={users} /> */}
    </>
  );
}

export default Home;