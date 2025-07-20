import { z } from 'zod';

/**
 * Environment variable schema definition
 * This schema defines the shape and validation rules for our environment variables
 */
const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url('API base URL must be a valid URL'),
  VITE_API_TIMEOUT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().min(1000, 'Timeout must be at least 1000ms'))
    .default('30000'),
});

/**
 * Type definition for our environment variables
 * This is inferred from the schema above
 */
type Env = z.infer<typeof envSchema>;

/**
 * Validates and parses environment variables
 * @throws {Error} If required environment variables are missing or invalid
 */
function validateEnv(): Env {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err: z.ZodIssue) => err.path.join('.')).join(', ');
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
}

/**
 * Validated environment variables
 * This object will throw an error if any required environment variables are missing
 */
export const env = validateEnv();
