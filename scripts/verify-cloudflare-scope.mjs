import { readFile } from 'node:fs/promises';
import { URL } from 'node:url';

const expected = {
  accountId: '23f44eec8348248aa186c7511ed36e07',
  assetDirectory: './dist',
  assetWorkerRoutes: ['/videos/hero/*', '/videos/actual/*'],
  main: './src/worker.ts',
  workerName: 'the-oc-events-market',
  domains: ['theoceventsmarket.com', 'www.theoceventsmarket.com'],
};

const configSource = await readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8');
const config = JSON.parse(configSource.replace(/^\s*\/\/.*$/gm, '').replace(/,\s*([}\]])/g, '$1'));
const configuredDomains = (config.routes ?? [])
  .filter((route) => route.custom_domain === true)
  .map((route) => route.pattern)
  .sort();

const failures = [];
if (config.account_id !== expected.accountId) {
  failures.push(`account_id must be ${expected.accountId}`);
}
if (config.name !== expected.workerName) {
  failures.push(`Worker name must be ${expected.workerName}`);
}
if (config.main !== expected.main) {
  failures.push(`Worker entrypoint must be ${expected.main}`);
}
if (config.assets?.directory !== expected.assetDirectory) {
  failures.push(`static asset directory must be ${expected.assetDirectory}`);
}
if (
  JSON.stringify(config.assets?.run_worker_first ?? []) !==
  JSON.stringify(expected.assetWorkerRoutes)
) {
  failures.push(`Worker-first routes must be exactly ${expected.assetWorkerRoutes.join(', ')}`);
}
if (JSON.stringify(configuredDomains) !== JSON.stringify([...expected.domains].sort())) {
  failures.push(`custom domains must be exactly ${expected.domains.join(', ')}`);
}
if (process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_ACCOUNT_ID !== expected.accountId) {
  failures.push('CLOUDFLARE_ACCOUNT_ID points to the wrong Cloudflare account');
}

if (failures.length > 0) {
  console.error(`Cloudflare scope verification failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log('Cloudflare scope verified for The OC Events Market production account and domains.');
