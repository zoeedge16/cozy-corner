const typeDefs = ` #graphql
type User {
  _id: ID
  username: String
  email: String
  password: String
  savedBookCount: Int
  readBookCount: Int
  savedBooks: [Book]!
  readBooks: [Book]!
}

type Book {
    bookId: ID!
    authors: String
    description: String
    title: String
    image: String
    link: String
  }

type Auth {
  token: ID!
  user: User
}

type UserPreferences {
  _id: ID
  favoriteGenre: String
}

type ReadingPreferences{
    _id: ID
    booksAYear: Int
    daysAWeek: Int
    dayToRead: String
    hoursToRead: Int
    pagesToRead: Int
    chaptersToRead: Int
  }

  type Post {
    id: ID
    content: String!
    time: String!
  }

type Query {
  users: [User]
  user(id: ID!): User
  me: User
  userPreferences(userId: String!): UserPreferences
  readingPreferences(userId: String!): [ReadingPreferences]
}

type Mutation {
  addUser(email:String!, username:String!, password:String!): Auth
  login(email:String!, password:String!): Auth

  addUserPreferences(userId: String!, favoriteGenre: String!): UserPreferences
  saveBook(userId: ID!, book: String!): User
  addToRead(userId: ID!, book: String!): User
  createPost(content: String!): Post

  removeBook(book: String!): User
}
`;

module.exports = typeDefs;
