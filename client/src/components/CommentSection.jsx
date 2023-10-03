import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CommentSection = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    console.log('Comment submitted:', comment);
    setComment('');
  };

  return (
    <div>
      <Form onSubmit={handleCommentSubmit}>
        <Form.Control
          type="text"
          placeholder="Write your comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <Button type="submit" className="mt-2 search-btn">
          Post Comment
        </Button>
      </Form>
    </div>
  );
};

export default CommentSection;
