import { gql } from "@apollo/client";

export const ADD_MOVEMENT = gql`
mutation AddMovement($type: String!, $amount: Float!, $date: String!, $userId: Float!) {
  addMovement(type: $type, amount: $amount, date: $date, userId: $userId) {
    type
    amount
    date,
    userId
  }
}
`;