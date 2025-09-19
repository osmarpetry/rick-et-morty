/**
 * Zod Schemas for Character Data Validation
 *
 * These schemas provide runtime validation and type safety
 * for data received from the Rick and Morty GraphQL API
 */

import { z } from 'zod';

/**
 * Character Status Enum
 */
export const CharacterStatusSchema = z.enum(['Alive', 'Dead', 'unknown']);

/**
 * Character Gender Enum
 */
export const CharacterGenderSchema = z.enum([
  'Female',
  'Male',
  'Genderless',
  'unknown',
]);

/**
 * Origin/Location Schema
 */
export const OriginLocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string().optional(),
  dimension: z.string().optional(),
});

/**
 * Episode Schema (simplified for character references)
 */
export const EpisodeReferenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  episode: z.string(),
  air_date: z.string().optional(),
});

/**
 * Character Schema
 */
export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Character name is required'),
  status: CharacterStatusSchema,
  species: z.string().min(1, 'Species is required'),
  type: z.string().optional(),
  gender: CharacterGenderSchema,
  origin: OriginLocationSchema,
  location: OriginLocationSchema,
  image: z.string().url('Invalid image URL'),
  episode: z.array(EpisodeReferenceSchema).optional(),
  created: z.string().optional(),
});

/**
 * Characters Info Schema (pagination info)
 */
export const CharactersInfoSchema = z.object({
  count: z.number().int().positive(),
  pages: z.number().int().positive(),
  next: z.number().int().positive().nullable(),
  prev: z.number().int().positive().nullable(),
});

/**
 * Characters Response Schema
 */
export const CharactersResponseSchema = z.object({
  info: CharactersInfoSchema,
  results: z.array(CharacterSchema),
});

/**
 * Character Filter Schema
 */
export const CharacterFilterSchema = z.object({
  name: z.string().optional(),
  status: CharacterStatusSchema.optional(),
  species: z.string().optional(),
  type: z.string().optional(),
  gender: CharacterGenderSchema.optional(),
});

/**
 * Search Parameters Schema
 */
export const CharacterSearchParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  filter: CharacterFilterSchema.optional(),
});

// Type exports
export type Character = z.infer<typeof CharacterSchema>;
export type CharacterStatus = z.infer<typeof CharacterStatusSchema>;
export type CharacterGender = z.infer<typeof CharacterGenderSchema>;
export type OriginLocation = z.infer<typeof OriginLocationSchema>;
export type EpisodeReference = z.infer<typeof EpisodeReferenceSchema>;
export type CharactersInfo = z.infer<typeof CharactersInfoSchema>;
export type CharactersResponse = z.infer<typeof CharactersResponseSchema>;
export type CharacterFilter = z.infer<typeof CharacterFilterSchema>;
export type CharacterSearchParams = z.infer<typeof CharacterSearchParamsSchema>;

/**
 * Validation helper functions
 */
export const validateCharacter = (data: unknown): Character => {
  return CharacterSchema.parse(data);
};

export const validateCharactersResponse = (
  data: unknown
): CharactersResponse => {
  return CharactersResponseSchema.parse(data);
};

export const validateCharacterFilter = (data: unknown): CharacterFilter => {
  return CharacterFilterSchema.parse(data);
};
