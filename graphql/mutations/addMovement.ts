import { gql } from "@apollo/client";

export const ADD_MOVEMENT = gql`
mutation AddMovement($type: String!, $amount: Float!, $date: String!, $userId: Float!, $concept: String!) {
  addMovement(type: $type, amount: $amount, date: $date, userId: $userId, concept: $concept) {
    type
    amount
    date,
    userId,
    concept
  }
}
`;