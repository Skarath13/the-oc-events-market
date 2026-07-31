import { rm } from 'node:fs/promises';
import path from 'node:path';

const staleRedirect = path.join(process.cwd(), '.wrangler/deploy/config.json');
await rm(staleRedirect, { force: true });
