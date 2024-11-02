import { gql } from "@apollo/client";

export const GET_MOVEMENTS = gql`
  query GetMovements {
    movements {
      id
      type
      amount
      date
      user {
        id
        name
      }
      concept
    }
  }
`;