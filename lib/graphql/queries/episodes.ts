/**
 * GraphQL Queries for Episodes
 */

import { gql } from '@apollo/client';

/**
 * Get paginated episodes with optional filtering
 */
export const GET_EPISODES = gql`
  query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
        characters {
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
 * Get a single episode by ID
 */
export const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
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
