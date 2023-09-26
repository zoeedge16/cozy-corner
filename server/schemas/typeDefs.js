const gql = require('graphql-tag')

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: String
}

type Auth {
  token: ID!
  user: User
}

type UserPreferences {
  _id: ID
  favoriteGenre: String
}

type Query {
  users: [User]
  user(id: ID!): User
  me: User
  userPreferences(userId: String!): UserPreferences
}

type Mutation {
  addUser(email:String!, username:String!, password:String!): Auth
  login(email:String!, password:String!): Auth
  addUserPreference(userId: String!, favoriteGenre: String!): UserPreferences
}
`;

module.exports = typeDefs;
