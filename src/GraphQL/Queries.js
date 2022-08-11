import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username

      comments {
        id
        username
        body
      }

      likes {
        id
        username
      }
    }
  }
`;
