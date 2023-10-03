import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK, CREATE_POST } from '../utils/mutations';
import CommentSection from '../components/CommentSection';
import { Col, Container, Row, Card, CardGroup, Button, Form } from 'react-bootstrap';
import avatar from '../images/profile-avatar.webp';

import Auth from '../utils/auth';


const PostSection = ({ handlePostContentChange, postContent, handlePostSubmit, posts }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentPostId, setCommentPostId] = useState(null);

  const handleToggleCommentBox = (postId) => {
    setShowCommentBox(!showCommentBox);
    setCommentPostId(postId);
  };

  return (
    <Container>
      <h2 className='login-header'>Create a Post:</h2>
      <Form>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Control
            as='textarea'
            rows={5}
            value={postContent}
            onChange={handlePostContentChange}
            placeholder='Write your post here...'
          />
        </Form.Group>
        <Button className="search-btn d-flex justify-content-start" onClick={handlePostSubmit}>Post</Button>
      </Form>

      <h2 className='login-header mt-4'>Posts:</h2>
      {posts.map((post, index) => (
        <Card key={index} className='post-container mb-3 d-flex justify-content-between'>
          <Card.Body>
            <div className="d-flex flex-column align-items-start">
              <Card.Text className='h4 mb-4'>{post.content}</Card.Text>
            </div>
            <Button
              className="search-btn d-flex justify-content-start ml-auto mt-3 mb-4"
              onClick={() => handleToggleCommentBox(post.id)}
            >
              Comment
            </Button>
            {showCommentBox && commentPostId === post.id && <CommentSection postId={commentPostId} />}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

const Profile = () => {
  const { userId } = useParams();

  console.log('Is logged in:', Auth.loggedIn());
  
  const { loading, data, error } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { userId: userId },
  });

  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);
  const [removeBookMutation] = useMutation(REMOVE_BOOK);
  const [createPostMutation] = useMutation(CREATE_POST);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || {};

  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const formatPostDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    return formattedDate;
  };
  const handlePostSubmit = async () => {
    try {
      const { data } = await createPostMutation({
        variables: { content: postContent },
      });
  
      if (data) {
        const newPost = data.createPost;
        newPost.formattedCreatedAt = formatPostDate(newPost.createdAt);
        newPost.comments = [];
        setPosts(prevPosts => [...prevPosts, newPost]);
        setPostContent('');
      }
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  if (error) console.log(error);

  const renderCurrentUserInfo = () => {
    if (userId) return null;

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

  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/me" />;
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log('User data:', user);

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
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
        />
      </div>
    </div>
  );  
};

export default Profile;
