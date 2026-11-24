import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

function search(...args) {
  return spawnSync(process.execPath, [
    fileURLToPath(new URL('./search.js', import.meta.url)), ...args,
  ], { encoding: 'utf8' });
}

test('matches titles case-insensitively and prints only matching highlights', () => {
  const result = search('  SECURITY  ');
  assert.equal(result.status, 0);
  assert.equal(result.stdout,
    'Security review\nAsk Copilot to check agent-written code for vulnerabilities before it ships.\n');
});

test('matches summary text even when the title does not contain the word', () => {
  const result = search('screenshots');
  assert.equal(result.status, 0);
  assert.equal(result.stdout,
    'Media in issues from the CLI\nAttach screenshots and recordings when you create issues and pull requests.\n');
});

test('prints all matching highlights', () => {
  const result = search('review');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /^Stacked pull requests\n/);
  assert.match(result.stdout, /\n\nCopilot automations\n/);
  assert.match(result.stdout, /\n\nSecurity review\n/);
  assert.doesNotMatch(result.stdout, /Contribution controls/);
});

test('treats the query as literal text and reports no matches', () => {
  const result = search('.*');
  assert.equal(result.status, 0);
  assert.equal(result.stdout, 'No highlights found.\n');
});

test('rejects missing, blank, or extra arguments with usage and a nonzero exit', () => {
  for (const args of [[], ['   '], ['security', 'review']]) {
    const result = search(...args);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, 'Usage: npm run search -- <word>\n');
    assert.equal(result.stdout, '');
  }
});
