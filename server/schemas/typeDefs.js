const gql = require('graphql-tag');

const typeDefs = gql` #graphql
type User {
  _id: ID
  username: String
  email: String
  password: String
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
    booksAYear: Number
    daysAWeek: Number
    dayToRead: Text
    hoursToRead: Number
    pagesToRead: Number
    chaptersToRead: Number
  }

type Query {
  users: [User]
  user(id: ID!): User
  me: User
  userPreferences(userId: String!): UserPreferences
  readingPreferences(userId: String!): ReadingPreferences
}

type Mutation {
  addUser(email:String!, username:String!, password:String!): Auth
  login(email:String!, password:String!): Auth

  addUserPreference(userId: String!, favoriteGenre: String!): UserPreferences
  saveBook(profileId: ID!, book: String!): User
  addToRead(profileId: ID!, book: String!): User

  removeBook(book: String!): User
}
`;

module.exports = typeDefs;
