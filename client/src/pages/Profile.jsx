import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK, CREATE_POST } from '../utils/mutations';
import UserList from '../components/UserList';
import { Col, Container, Row, Card, CardGroup, Button, Form } from 'react-bootstrap';
import avatar from '../images/profile-avatar.webp';

const PostSection = ({ 
  handlePostContentChange, 
  postContent, 
  handlePostSubmit, 
}) => {
  return (
    <div>
      <h2 className='login-header'>Create a Post:</h2>
      <Form>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Post Content</Form.Label>
          <Form.Control
            as='textarea'
            rows={5}
            value={postContent}
            onChange={handlePostContentChange}
            placeholder='Write your post here...'
          />
        </Form.Group>
        <Button variant='primary' onClick={handlePostSubmit}>
          Post
        </Button>
      </Form>

      <h2 className='login-header'>Posts:</h2>
      {postsArray.map((post, index) => (
        <div key={index} className='post'>
          <p>{post.content}</p>
          <p>Posted at: {post.time}</p>
        </div>
      ))}
    </div>
  );
};

const Profile = () => {
  const { id } = useParams();

  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);
  const [removeBookMutation] = useMutation(REMOVE_BOOK);
  const [createPostMutation] = useMutation(CREATE_POST);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || {};

  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState('');
  const [textareaContent, setTextareaContent] = useState('');

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handlePostSubmit = async () => {
    try {
      const { data } = await createPostMutation({
        variables: { content: postContent },
      });

      if (data) {
        const newPost = data.createPost;
        setPosts([...posts, newPost]);
        setPostContent('');
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  const handleTextareaChange = (event) => {
    setTextareaContent(event.target.value);
  };

  if (error) console.log(error);

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
    const savedBooksData = userData.savedBooks || [];

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
              ? `Viewing ${savedBooksData.length} Want to Read ${
                  savedBooksData.length === 1 ? 'book' : 'books'
                }:`
              : 'You have not saved any books to your Want To Read list!'}
          </h2>
          <CardGroup>
            {savedBooksData.map((book) => {
              return (
                <Card key={book.bookId}>
                  <Card.Img variant='top' src={book.image} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className='d-flex justify-content-between'>
                    <div>
                      <Button
                        className='btn-danger'
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
                        Remove
                      </Button>
                    </div>
                    <div>
                      <Button
                        className='btn-success'
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
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

  const readBooks = () => {
    if (loading) {
      return <h2>LOADING...</h2>;
    }

    const userData = data?.me || {};
    const readBooksData = userData.readBooks || [];

    return (
      <>
        <div>
          <Container>
            <h2 className='login-header'>Books I've Read:</h2>
          </Container>
        </div>
        <Container className='profile-container'>
          <h2 className='pt-5'>
            {readBooksData.length
              ? `Viewing ${readBooksData.length} Read ${
                  readBooksData.length === 1 ? 'book' : 'books'
                }:`
              : 'You have not read any books!'}
          </h2>
          <CardGroup>
            {readBooksData.map((book) => {
              return (
                <Card key={book.bookId}>
                  <Card.Img variant='top' src={book.image} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className='d-flex justify-content-between'>
                    <div>
                      <Button
                        className='btn-danger'
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
                        Remove
                      </Button>
                    </div>
                    <div>
                      <Button
                        className='btn-success'
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
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
          Viewing {id ? `${user.username}'s` : 'your'} Profile.
        </h2>
        {renderCurrentUserInfo()}
        {renderUserList()}
      </div>
      <div>
        {savedBooks()}
      </div>
      <div>
        {readBooks()}
      </div>
      <div>
        <PostSection
          handlePostContentChange={handlePostContentChange}
          postContent={postContent}
          handlePostSubmit={handlePostSubmit}
          posts={posts}
          handleTextareaChange={handleTextareaChange}
          textareaContent={textareaContent}
        />
      </div>
    </div>
  );
};

export default Profile;
