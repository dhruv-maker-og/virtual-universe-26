import { readFile } from 'node:fs/promises';

const args = process.argv.slice(2);
if (args.length !== 1 || !args[0].trim()) {
  console.error('Usage: npm run search -- <word>');
  process.exitCode = 1;
} else {
  const word = args[0].trim().toLowerCase();
  const { highlights } = JSON.parse(
    await readFile(new URL('./notes/keynote-highlights.json', import.meta.url), 'utf8'),
  );
  const matches = highlights.filter(({ title, summary }) =>
    title.toLowerCase().includes(word) || summary.toLowerCase().includes(word),
  );

  console.log(matches.length
    ? matches.map(({ title, summary }) => `${title}\n${summary}`).join('\n\n')
    : 'No highlights found.');
}
