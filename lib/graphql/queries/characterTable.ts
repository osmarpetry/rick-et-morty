/**
 * GraphQL queries for the Character Table component
 * Includes queries for fetching characters with filtering, pagination, and sorting
 */

import { gql } from '../../../src/__generated__';

// Main query for character table with comprehensive filtering support
export const GET_CHARACTERS_TABLE = gql(`
  query GetCharactersTable($page: Int, $filter: FilterCharacter) {
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
          name
        }
        location {
          name
        }
        image
        episode {
          id
          name
        }
        created
      }
    }
  }
`);

// Query for getting unique values for filter dropdowns (if needed in the future)
export const GET_FILTER_OPTIONS = gql(`
  query GetFilterOptions {
    characters {
      results {
        status
        species
        gender
      }
    }
  }
`);

// Character search query for table (for autocomplete or advanced search)
export const SEARCH_CHARACTERS_TABLE = gql(`
  query SearchCharactersTable($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        image
        status
        species
      }
    }
  }
`);
