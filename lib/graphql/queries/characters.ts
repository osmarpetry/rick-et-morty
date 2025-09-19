/**
 * GraphQL Queries for Characters
 *
 * These queries will be used by GraphQL Code Generator to create TypeScript types
 */

import { gql } from '@apollo/client';

/**
 * Get paginated characters with optional filtering
 */
export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
          type
          dimension
        }
        location {
          id
          name
          type
          dimension
        }
        image
        episode {
          id
          name
          episode
          air_date
        }
        created
      }
    }
  }
`;

/**
 * Get a single character by ID
 */
export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        type
        dimension
        residents {
          id
          name
        }
      }
      location {
        id
        name
        type
        dimension
        residents {
          id
          name
        }
      }
      image
      episode {
        id
        name
        episode
        air_date
        characters {
          id
          name
        }
      }
      created
    }
  }
`;

/**
 * Get multiple characters by IDs
 */
export const GET_CHARACTERS_BY_IDS = gql`
  query GetCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
      image
      created
    }
  }
`;

/**
 * Search characters by name (for autocomplete/search functionality)
 */
export const SEARCH_CHARACTERS = gql`
  query SearchCharacters($name: String!) {
    characters(filter: { name: $name }) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;
