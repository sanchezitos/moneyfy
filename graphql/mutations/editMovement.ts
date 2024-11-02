import { gql } from "@apollo/client";

export const EDIT_MOVEMENT = gql`
mutation EditMovement($id: ID!, $concept: String!, $type: String!, $amount: Float!, $date: String!) {
  editMovement(id: $id, concept: $concept, type: $type, amount: $amount, date: $date) {
    id
    concept
    type
    amount
    date
  }
}
`;