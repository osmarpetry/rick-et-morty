import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: File; output: File; }
};

export const CacheControlScope = {
  Private: 'PRIVATE',
  Public: 'PUBLIC'
} as const;

export type CacheControlScope = typeof CacheControlScope[keyof typeof CacheControlScope];
export type Character = {
  readonly __typename: 'Character';
  /** Time at which the character was created in the database. */
  readonly created: Maybe<Scalars['String']['output']>;
  /** Episodes in which this character appeared. */
  readonly episode: ReadonlyArray<Maybe<Episode>>;
  /** The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
  readonly gender: Maybe<Scalars['String']['output']>;
  /** The id of the character. */
  readonly id: Maybe<Scalars['ID']['output']>;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  readonly image: Maybe<Scalars['String']['output']>;
  /** The character's last known location */
  readonly location: Maybe<Location>;
  /** The name of the character. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** The character's origin location */
  readonly origin: Maybe<Location>;
  /** The species of the character. */
  readonly species: Maybe<Scalars['String']['output']>;
  /** The status of the character ('Alive', 'Dead' or 'unknown'). */
  readonly status: Maybe<Scalars['String']['output']>;
  /** The type or subspecies of the character. */
  readonly type: Maybe<Scalars['String']['output']>;
};

export type Characters = {
  readonly __typename: 'Characters';
  readonly info: Maybe<Info>;
  readonly results: Maybe<ReadonlyArray<Maybe<Character>>>;
};

export type Episode = {
  readonly __typename: 'Episode';
  /** The air date of the episode. */
  readonly air_date: Maybe<Scalars['String']['output']>;
  /** List of characters who have been seen in the episode. */
  readonly characters: ReadonlyArray<Maybe<Character>>;
  /** Time at which the episode was created in the database. */
  readonly created: Maybe<Scalars['String']['output']>;
  /** The code of the episode. */
  readonly episode: Maybe<Scalars['String']['output']>;
  /** The id of the episode. */
  readonly id: Maybe<Scalars['ID']['output']>;
  /** The name of the episode. */
  readonly name: Maybe<Scalars['String']['output']>;
};

export type Episodes = {
  readonly __typename: 'Episodes';
  readonly info: Maybe<Info>;
  readonly results: Maybe<ReadonlyArray<Maybe<Episode>>>;
};

export type FilterCharacter = {
  readonly gender?: InputMaybe<Scalars['String']['input']>;
  readonly name?: InputMaybe<Scalars['String']['input']>;
  readonly species?: InputMaybe<Scalars['String']['input']>;
  readonly status?: InputMaybe<Scalars['String']['input']>;
  readonly type?: InputMaybe<Scalars['String']['input']>;
};

export type FilterEpisode = {
  readonly episode?: InputMaybe<Scalars['String']['input']>;
  readonly name?: InputMaybe<Scalars['String']['input']>;
};

export type FilterLocation = {
  readonly dimension?: InputMaybe<Scalars['String']['input']>;
  readonly name?: InputMaybe<Scalars['String']['input']>;
  readonly type?: InputMaybe<Scalars['String']['input']>;
};

export type Info = {
  readonly __typename: 'Info';
  /** The length of the response. */
  readonly count: Maybe<Scalars['Int']['output']>;
  /** Number of the next page (if it exists) */
  readonly next: Maybe<Scalars['Int']['output']>;
  /** The amount of pages. */
  readonly pages: Maybe<Scalars['Int']['output']>;
  /** Number of the previous page (if it exists) */
  readonly prev: Maybe<Scalars['Int']['output']>;
};

export type Location = {
  readonly __typename: 'Location';
  /** Time at which the location was created in the database. */
  readonly created: Maybe<Scalars['String']['output']>;
  /** The dimension in which the location is located. */
  readonly dimension: Maybe<Scalars['String']['output']>;
  /** The id of the location. */
  readonly id: Maybe<Scalars['ID']['output']>;
  /** The name of the location. */
  readonly name: Maybe<Scalars['String']['output']>;
  /** List of characters who have been last seen in the location. */
  readonly residents: ReadonlyArray<Maybe<Character>>;
  /** The type of the location. */
  readonly type: Maybe<Scalars['String']['output']>;
};

export type Locations = {
  readonly __typename: 'Locations';
  readonly info: Maybe<Info>;
  readonly results: Maybe<ReadonlyArray<Maybe<Location>>>;
};

export type Query = {
  readonly __typename: 'Query';
  /** Get a specific character by ID */
  readonly character: Maybe<Character>;
  /** Get the list of all characters */
  readonly characters: Maybe<Characters>;
  /** Get a list of characters selected by ids */
  readonly charactersByIds: Maybe<ReadonlyArray<Maybe<Character>>>;
  /** Get a specific episode by ID */
  readonly episode: Maybe<Episode>;
  /** Get the list of all episodes */
  readonly episodes: Maybe<Episodes>;
  /** Get a list of episodes selected by ids */
  readonly episodesByIds: Maybe<ReadonlyArray<Maybe<Episode>>>;
  /** Get a specific locations by ID */
  readonly location: Maybe<Location>;
  /** Get the list of all locations */
  readonly locations: Maybe<Locations>;
  /** Get a list of locations selected by ids */
  readonly locationsByIds: Maybe<ReadonlyArray<Maybe<Location>>>;
};


export type QueryCharacterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<FilterCharacter>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCharactersByIdsArgs = {
  ids: ReadonlyArray<Scalars['ID']['input']>;
};


export type QueryEpisodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEpisodesArgs = {
  filter?: InputMaybe<FilterEpisode>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEpisodesByIdsArgs = {
  ids: ReadonlyArray<Scalars['ID']['input']>;
};


export type QueryLocationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLocationsArgs = {
  filter?: InputMaybe<FilterLocation>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLocationsByIdsArgs = {
  ids: ReadonlyArray<Scalars['ID']['input']>;
};

export type GetCharactersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<FilterCharacter>;
}>;


export type GetCharactersQuery = { readonly characters: { readonly __typename: 'Characters', readonly info: { readonly __typename: 'Info', readonly count: number | null, readonly pages: number | null, readonly next: number | null, readonly prev: number | null } | null, readonly results: ReadonlyArray<{ readonly __typename: 'Character', readonly id: string | null, readonly name: string | null, readonly status: string | null, readonly species: string | null, readonly type: string | null, readonly gender: string | null, readonly image: string | null, readonly created: string | null, readonly origin: { readonly __typename: 'Location', readonly id: string | null, readonly name: string | null, readonly type: string | null, readonly dimension: string | null } | null, readonly location: { readonly __typename: 'Location', readonly id: string | null, readonly name: string | null, readonly type: string | null, readonly dimension: string | null } | null, readonly episode: ReadonlyArray<{ readonly __typename: 'Episode', readonly id: string | null, readonly name: string | null, readonly episode: string | null, readonly air_date: string | null } | null> } | null> | null } | null };

export type GetCharacterQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCharacterQuery = { readonly character: { readonly __typename: 'Character', readonly id: string | null, readonly name: string | null, readonly status: string | null, readonly species: string | null, readonly type: string | null, readonly gender: string | null, readonly image: string | null, readonly created: string | null, readonly origin: { readonly __typename: 'Location', readonly id: string | null, readonly name: string | null, readonly type: string | null, readonly dimension: string | null, readonly residents: ReadonlyArray<{ readonly __typename: 'Character', readonly id: string | null, readonly name: string | null } | null> } | null, readonly location: { readonly __typename: 'Location', readonly id: string | null, readonly name: string | null, readonly type: string | null, readonly dimension: string | null, readonly residents: ReadonlyArray<{ readonly __typename: 'Character', readonly id: string | null, readonly name: string | null } | null> } | null, readonly episode: ReadonlyArray<{ readonly __typename: 'Episode', readonly id: string | null, readonly name: string | null, readonly episode: string | null, readonly air_date: string | null, readonly characters: ReadonlyArray<{ readonly __typename: 'Character', readonly id: string | null, readonly name: string | null } | null> } | null> } | null };

export type GetCharactersByIdsQueryVariables = Exact<{
  ids: ReadonlyArray<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type GetCharactersByIdsQuery = { readonly charactersByIds: ReadonlyArray<{ readonly __typename: 'Character', readonly id: string | null, readonly name: string | null, readonly status: string | null, readonly species: string | null, readonly type: string | null, readonly gender: string | null, readonly image: string | null, readonly created: string | null, readonly origin: { readonly __typename: 'Location', readonly id: string | null, readonly name: string | null } | null, readonly location: { readonly __typename: 'Location', readonly id: string | null, readonly name: string | null } | null } | null> | null };

export type SearchCharactersQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type SearchCharactersQuery = { readonly characters: { readonly __typename: 'Characters', readonly info: { readonly __typename: 'Info', readonly count: number | null, readonly pages: number | null } | null, readonly results: ReadonlyArray<{ readonly __typename: 'Character', readonly id: string | null, readonly name: string | null, readonly status: string | null, readonly species: string | null, readonly image: string | null } | null> | null } | null };

export type GetEpisodesQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<FilterEpisode>;
}>;


export type GetEpisodesQuery = { readonly episodes: { readonly __typename: 'Episodes', readonly info: { readonly __typename: 'Info', readonly count: number | null, readonly pages: number | null, readonly next: number | null, readonly prev: number | null } | null, readonly results: ReadonlyArray<{ readonly __typename: 'Episode', readonly id: string | null, readonly name: string | null, readonly air_date: string | null, readonly episode: string | null, readonly created: string | null, readonly characters: ReadonlyArray<{ readonly __typename: 'Character', readonly id: string | null, readonly name: string | null, readonly image: string | null } | null> } | null> | null } | null };

export type GetEpisodeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEpisodeQuery = { readonly episode: { readonly __typename: 'Episode', readonly id: string | null, readonly name: string | null, readonly air_date: string | null, readonly episode: string | null, readonly created: string | null, readonly characters: ReadonlyArray<{ readonly __typename: 'Character', readonly id: string | null, readonly name: string | null, readonly status: string | null, readonly species: string | null, readonly image: string | null } | null> } | null };

export type GetLocationsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<FilterLocation>;
}>;


export type GetLocationsQuery = { readonly locations: { readonly __typename: 'Locations', readonly info: { readonly __typename: 'Info', readonly count: number | null, readonly pages: number | null, readonly next: number | null, readonly prev: number | null } | null, readonly results: ReadonlyArray<{ readonly __typename: 'Location', readonly id: string | null, readonly name: string | null, readonly type: string | null, readonly dimension: string | null, readonly created: string | null, readonly residents: ReadonlyArray<{ readonly __typename: 'Character', readonly id: string | null, readonly name: string | null, readonly image: string | null } | null> } | null> | null } | null };

export type GetLocationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetLocationQuery = { readonly location: { readonly __typename: 'Location', readonly id: string | null, readonly name: string | null, readonly type: string | null, readonly dimension: string | null, readonly created: string | null, readonly residents: ReadonlyArray<{ readonly __typename: 'Character', readonly id: string | null, readonly name: string | null, readonly status: string | null, readonly species: string | null, readonly image: string | null } | null> } | null };


export const GetCharactersDocument = gql`
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
 * __useGetCharactersQuery__
 *
 * To run a query within a React component, call `useGetCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharactersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetCharactersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCharactersQuery, GetCharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, options);
      }
export function useGetCharactersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCharactersQuery, GetCharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, options);
        }
export function useGetCharactersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCharactersQuery, GetCharactersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, options);
        }
export type GetCharactersQueryHookResult = ReturnType<typeof useGetCharactersQuery>;
export type GetCharactersLazyQueryHookResult = ReturnType<typeof useGetCharactersLazyQuery>;
export type GetCharactersSuspenseQueryHookResult = ReturnType<typeof useGetCharactersSuspenseQuery>;
export type GetCharactersQueryResult = ApolloReactCommon.QueryResult<GetCharactersQuery, GetCharactersQueryVariables>;
export const GetCharacterDocument = gql`
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
 * __useGetCharacterQuery__
 *
 * To run a query within a React component, call `useGetCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharacterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCharacterQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCharacterQuery, GetCharacterQueryVariables> & ({ variables: GetCharacterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCharacterQuery, GetCharacterQueryVariables>(GetCharacterDocument, options);
      }
export function useGetCharacterLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCharacterQuery, GetCharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCharacterQuery, GetCharacterQueryVariables>(GetCharacterDocument, options);
        }
export function useGetCharacterSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCharacterQuery, GetCharacterQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCharacterQuery, GetCharacterQueryVariables>(GetCharacterDocument, options);
        }
export type GetCharacterQueryHookResult = ReturnType<typeof useGetCharacterQuery>;
export type GetCharacterLazyQueryHookResult = ReturnType<typeof useGetCharacterLazyQuery>;
export type GetCharacterSuspenseQueryHookResult = ReturnType<typeof useGetCharacterSuspenseQuery>;
export type GetCharacterQueryResult = ApolloReactCommon.QueryResult<GetCharacterQuery, GetCharacterQueryVariables>;
export const GetCharactersByIdsDocument = gql`
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
 * __useGetCharactersByIdsQuery__
 *
 * To run a query within a React component, call `useGetCharactersByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharactersByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharactersByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetCharactersByIdsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCharactersByIdsQuery, GetCharactersByIdsQueryVariables> & ({ variables: GetCharactersByIdsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCharactersByIdsQuery, GetCharactersByIdsQueryVariables>(GetCharactersByIdsDocument, options);
      }
export function useGetCharactersByIdsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCharactersByIdsQuery, GetCharactersByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCharactersByIdsQuery, GetCharactersByIdsQueryVariables>(GetCharactersByIdsDocument, options);
        }
export function useGetCharactersByIdsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCharactersByIdsQuery, GetCharactersByIdsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCharactersByIdsQuery, GetCharactersByIdsQueryVariables>(GetCharactersByIdsDocument, options);
        }
export type GetCharactersByIdsQueryHookResult = ReturnType<typeof useGetCharactersByIdsQuery>;
export type GetCharactersByIdsLazyQueryHookResult = ReturnType<typeof useGetCharactersByIdsLazyQuery>;
export type GetCharactersByIdsSuspenseQueryHookResult = ReturnType<typeof useGetCharactersByIdsSuspenseQuery>;
export type GetCharactersByIdsQueryResult = ApolloReactCommon.QueryResult<GetCharactersByIdsQuery, GetCharactersByIdsQueryVariables>;
export const SearchCharactersDocument = gql`
    query SearchCharacters($name: String!) {
  characters(filter: {name: $name}) {
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

/**
 * __useSearchCharactersQuery__
 *
 * To run a query within a React component, call `useSearchCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCharactersQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSearchCharactersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SearchCharactersQuery, SearchCharactersQueryVariables> & ({ variables: SearchCharactersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SearchCharactersQuery, SearchCharactersQueryVariables>(SearchCharactersDocument, options);
      }
export function useSearchCharactersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchCharactersQuery, SearchCharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SearchCharactersQuery, SearchCharactersQueryVariables>(SearchCharactersDocument, options);
        }
export function useSearchCharactersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<SearchCharactersQuery, SearchCharactersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<SearchCharactersQuery, SearchCharactersQueryVariables>(SearchCharactersDocument, options);
        }
export type SearchCharactersQueryHookResult = ReturnType<typeof useSearchCharactersQuery>;
export type SearchCharactersLazyQueryHookResult = ReturnType<typeof useSearchCharactersLazyQuery>;
export type SearchCharactersSuspenseQueryHookResult = ReturnType<typeof useSearchCharactersSuspenseQuery>;
export type SearchCharactersQueryResult = ApolloReactCommon.QueryResult<SearchCharactersQuery, SearchCharactersQueryVariables>;
export const GetEpisodesDocument = gql`
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
 * __useGetEpisodesQuery__
 *
 * To run a query within a React component, call `useGetEpisodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEpisodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEpisodesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetEpisodesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEpisodesQuery, GetEpisodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetEpisodesQuery, GetEpisodesQueryVariables>(GetEpisodesDocument, options);
      }
export function useGetEpisodesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEpisodesQuery, GetEpisodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetEpisodesQuery, GetEpisodesQueryVariables>(GetEpisodesDocument, options);
        }
export function useGetEpisodesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetEpisodesQuery, GetEpisodesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetEpisodesQuery, GetEpisodesQueryVariables>(GetEpisodesDocument, options);
        }
export type GetEpisodesQueryHookResult = ReturnType<typeof useGetEpisodesQuery>;
export type GetEpisodesLazyQueryHookResult = ReturnType<typeof useGetEpisodesLazyQuery>;
export type GetEpisodesSuspenseQueryHookResult = ReturnType<typeof useGetEpisodesSuspenseQuery>;
export type GetEpisodesQueryResult = ApolloReactCommon.QueryResult<GetEpisodesQuery, GetEpisodesQueryVariables>;
export const GetEpisodeDocument = gql`
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

/**
 * __useGetEpisodeQuery__
 *
 * To run a query within a React component, call `useGetEpisodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEpisodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEpisodeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEpisodeQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetEpisodeQuery, GetEpisodeQueryVariables> & ({ variables: GetEpisodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetEpisodeQuery, GetEpisodeQueryVariables>(GetEpisodeDocument, options);
      }
export function useGetEpisodeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEpisodeQuery, GetEpisodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetEpisodeQuery, GetEpisodeQueryVariables>(GetEpisodeDocument, options);
        }
export function useGetEpisodeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetEpisodeQuery, GetEpisodeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetEpisodeQuery, GetEpisodeQueryVariables>(GetEpisodeDocument, options);
        }
export type GetEpisodeQueryHookResult = ReturnType<typeof useGetEpisodeQuery>;
export type GetEpisodeLazyQueryHookResult = ReturnType<typeof useGetEpisodeLazyQuery>;
export type GetEpisodeSuspenseQueryHookResult = ReturnType<typeof useGetEpisodeSuspenseQuery>;
export type GetEpisodeQueryResult = ApolloReactCommon.QueryResult<GetEpisodeQuery, GetEpisodeQueryVariables>;
export const GetLocationsDocument = gql`
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
 * __useGetLocationsQuery__
 *
 * To run a query within a React component, call `useGetLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetLocationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, options);
      }
export function useGetLocationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, options);
        }
export function useGetLocationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, options);
        }
export type GetLocationsQueryHookResult = ReturnType<typeof useGetLocationsQuery>;
export type GetLocationsLazyQueryHookResult = ReturnType<typeof useGetLocationsLazyQuery>;
export type GetLocationsSuspenseQueryHookResult = ReturnType<typeof useGetLocationsSuspenseQuery>;
export type GetLocationsQueryResult = ApolloReactCommon.QueryResult<GetLocationsQuery, GetLocationsQueryVariables>;
export const GetLocationDocument = gql`
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

/**
 * __useGetLocationQuery__
 *
 * To run a query within a React component, call `useGetLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLocationQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetLocationQuery, GetLocationQueryVariables> & ({ variables: GetLocationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetLocationQuery, GetLocationQueryVariables>(GetLocationDocument, options);
      }
export function useGetLocationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLocationQuery, GetLocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetLocationQuery, GetLocationQueryVariables>(GetLocationDocument, options);
        }
export function useGetLocationSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetLocationQuery, GetLocationQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetLocationQuery, GetLocationQueryVariables>(GetLocationDocument, options);
        }
export type GetLocationQueryHookResult = ReturnType<typeof useGetLocationQuery>;
export type GetLocationLazyQueryHookResult = ReturnType<typeof useGetLocationLazyQuery>;
export type GetLocationSuspenseQueryHookResult = ReturnType<typeof useGetLocationSuspenseQuery>;
export type GetLocationQueryResult = ApolloReactCommon.QueryResult<GetLocationQuery, GetLocationQueryVariables>;