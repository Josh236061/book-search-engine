import {gql} from '@apollo/client';

export const GET_ME = gql`
    query GetMe {
        me {
            email
            bookCount
            username
            savedBooks {
                authors
                description
                title
                bookId
            }
        }
    }
`