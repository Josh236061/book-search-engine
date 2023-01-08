import {gql} from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $username: String!, 
    $email: String!, 
    $password: String!
    ) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
        bookCount
      }
    }
  }
`;


export const LOGIN_MUTATION = gql`
    mutation LoginMutation(
        $email: String!
        $password: String!
    ) {
        login(email: $email, password: $password) {
            token
            user {
              id
              username
              email
              bookCount
            }
        }
    }
`

export const SAVE_BOOK_MUTATION = gql`
    mutation SaveBookMutation(
      $bookId: String!
      $image: String!
      $title: String!
      $authors: [String!]
      $link: String
      $description: String
    ) {
      saveBook(bookId: $bookId, image: $image, title: $title, authors: $authors, description: $description, link: $link) {
        id
        username
        email
        bookCount
        savedBooks {
          bookId
        }
      }
    }
`

export const REMOVE_BOOK_MUTATION = gql`
    mutation RemoveBookMutation(
      $bookId: String!
    ) {
      removeBook(bookId: $bookId) {
        id
        username
        savedBooks {
          bookId
        }
      }
    }
`