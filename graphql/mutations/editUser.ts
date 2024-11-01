import { gql } from "@apollo/client";

export const EDIT_USER = gql`
mutation EditUser($id: ID!, $name: String, $role: String) {
  editUser(id: $id, name: $name, role: $role) {
    id
    name
    role
  }
}
`;