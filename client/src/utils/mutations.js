import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// export const SAVE_BOOK = gql`
//   mutation saveBook($authors: [String], $description: String!, $bookId: String!, $image: String, $title: String!, $userId: ID!) {
//     saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, title: $title, userId: $userId) {
//       _id
//       username
//       savedBooks {
//         authors
//         description
//         bookId
//         image
//         title
//       }
//     }
//   }
// `;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $book: String!) {
    saveBook(userId: $userId, book: $book) {
      _id
      name
      books
    }
  }
`;

export const READ_BOOK = gql`
  mutation readBook($authors: [String], $description: String!, $bookId: String!, $image: String, $title: String!, $userId: ID!) {
    readBook(authors: $authors, description: $description, bookId: $bookId, image: $image, title: $title, userId: $userId) {
      _id
      username
      readBooks {
        authors
        description
        bookId
        image
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        authors
        description
        bookId
        image
        title
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($content: String!) {
    createPost(content: $content) {
      id
      content
      time
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $content: String!) {
    createComment(postId: $postId, content: $content) {
      id
      content
      createdAt
    }
  }
`;
