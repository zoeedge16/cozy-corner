// Node Modules
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

// Components
import UserList from '../components/UserList';
import { Col, Container, Row, Card, CardGroup, Button } from 'react-bootstrap';
import avatar from '../images/profile-avatar.webp';

const Profile = () => {
  const { id } = useParams();

  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);
  const [removeBookMutation] = useMutation(REMOVE_BOOK);
  const user = data?.me || data?.user || {};
  const users = usersData?.users || {};

  if (error) console.log(error);

  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Navigate to="/me" replace />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const renderUserList = () => {
    if (usersLoading || !Array.isArray(usersData?.users)) {
      return null;
    }
  
    const notMeUsers = usersData.users.filter((o) => o._id !== user._id);
    return <UserList users={notMeUsers} title="User List" />;
  };

  const renderCurrentUserInfo = () => {
    if (id) return null;

    return (
      <Container className='profile-container'>
        <Row className='justify-content-center'>
          <Col xs={12} md={6}>
            <img src={avatar} alt="avatar" id='avatar' />
            <ul>
              <li>username: {user.username}</li>
              <li>email: {user.email}</li>
            </ul>
          </Col>
        </Row>
      </Container>
    );
  };


  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBookMutation({
        variables: { bookId },
      });

      if (data) {
        removeBookId(bookId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const savedBooks = () => {
    if (loading) {
      return <h2>LOADING...</h2>;
    }
  
    const userData = data?.me || {};
    const savedBooksData = userData.savedBooks || [];  // Ensure savedBooksData is an array
  
    return (
      <>
        <div>
          <Container>
            <h2 className='login-header'>Want To Read:</h2>
          </Container>
        </div>
        <Container className='profile-container'>
          <h2 className='pt-5'>
            {savedBooksData.length
              ? `Viewing ${savedBooksData.length} Want to Read ${savedBooksData.length === 1 ? 'book' : 'books'}:`
              : 'You have not saved any books to your Want To Read list!'}
          </h2>
          <CardGroup>
            {savedBooksData.map((book) => {
              return (
                <Card key={book.bookId}>
                  <Card.Img variant="top" src={book.image} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className='d-flex justify-content-between'>
                    <div>
                      <Button className='btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                        Remove
                      </Button>
                    </div>
                    <div>
                      <Button className='btn-success' onClick={() => handleDeleteBook(book.bookId)}>
                        I read this book
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              );
            })}
          </CardGroup>
        </Container>
      </>
    );
  };
  

  return (
    <div>
      <div>
        <h2 className='login-header'>
          Viewing {id ? `${user.username}'s` : 'your'} profile.
        </h2>
        {renderCurrentUserInfo()}
        {renderUserList()}
      </div>
      <div>
        {savedBooks()}
      </div>
    </div>
  );
};

export default Profile;
