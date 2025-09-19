/**
 * GraphQL Queries for Locations
 */

import { gql } from '@apollo/client';

/**
 * Get paginated locations with optional filtering
 */
export const GET_LOCATIONS = gql`
  query GetLocations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
        created
      }
    }
  }
`;

/**
 * Get a single location by ID
 */
export const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
        status
        species
        image
      }
      created
    }
  }
`;
