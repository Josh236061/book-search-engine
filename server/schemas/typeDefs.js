const { gql } = require("apollo-server-express")

module.exports = gql`
  type Query {
    me: UserData
  }
  type Mutation {
    login(email: String!, password: String!): AuthType!
    signup(username: String!, email: String!, password: String!): AuthType!
    saveBook(bookId: String!,  title: String!, image: String!, authors: [String!], description: String, link: String): UserData!
    removeBook(bookId: String!): UserData!
  }

  type AuthType {
    token: String!
    user: UserData!
  }

  input Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type BookType {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type UserData {
    id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: String
    savedBooks: [BookType]
  }
`
