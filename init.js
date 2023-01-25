import { copyFileSync, mkdirSync } from 'fs';

copyFileSync('.env.sample', '.env');

mkdirSync('tmp/pgdata', { recursive: true });
