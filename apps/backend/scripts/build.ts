import path from 'path';

import { config } from 'dotenv';
import { build, type BuildOptions, type Platform } from 'esbuild';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';

// Load environment variables from both packages
const getDefinedEnvVariables = (envFile: string): { [key: string]: string } | undefined => {
  const envPath = path.resolve(process.cwd(), envFile);
  const result = config({ path: envPath });
  if (result.error) {
    console.error(`Could not load environment from ${envPath}: ${result.error.message}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(`Loaded environment from ${envPath}`);
  }

  if (result.parsed === undefined) {
    return;
  }

  return mapValues(
    mapKeys(result.parsed, (_, key) => `process.env.${key}`),
    (value) => `"${value}"`
  );
};

// Get stage from command line arguments
const args = process.argv.slice(2);
const stageArg = args.find((arg) => arg.startsWith('--stage='));

const stage = stageArg?.split('=')[1];

if (stage === undefined || !['staging', 'production'].includes(stage)) {
  throw new Error('Invalid stage. Must be one of: staging, production');
}

const envFile = `.env.${stage}`;

// Common esbuild options
const commonOptions: BuildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node' as Platform,
  target: 'node20',
  outfile: 'dist/index.js',
  sourcemap: true,
  minify: stage === 'production',
  define: getDefinedEnvVariables(envFile),
};

// Run esbuild with environment-specific options
build(commonOptions).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
