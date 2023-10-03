import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

import { CREATE_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState('');

  const [addComment, { error }] = useMutation(CREATE_COMMENT);

  const handleCommentChange = (event) => {
    setComment(event.target.value);  // Update the comment state on input change
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {

      const postId = commentPostId;
      const content = comment; 

      const data = await addComment({
        variables: { postId, comment: content },  
      });

      setComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <Form onSubmit={handleCommentSubmit}>
          <Form.Control
            type="text"
            placeholder="Write your comment..."
            value={comment}
            onChange={handleCommentChange}  // Use handleCommentChange for onChange
          />
          <Button type="submit" className="mt-2 search-btn d-flex justify-content-start">
            Post Comment
          </Button>
        </Form>
      ) : (
        <p>
          You need to be logged in to endorse skills. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentSection;
