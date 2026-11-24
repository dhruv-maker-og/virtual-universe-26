# universe-notes

The note-taker from Section 1, trimmed to its data. `notes/keynote-highlights.json`
holds sample notes from the GitHub Universe '26 keynote.

From `universe-notes`, search highlight titles and summaries with:

```sh
npm run search -- security
```

Search is case-insensitive and uses literal substring matching. Each matching
highlight prints its title and summary in note order. Pass exactly one nonblank
argument; quote a phrase containing spaces. Missing or extra arguments print
usage and exit with an error. If nothing matches, it prints `No highlights found.`

No dependencies are required. Run the search tests with `npm test`.

It cannot export the notes yet. That makes it a good first issue for the
`issue-to-pr` skill in [Section 2](../02-github-copilot-latest-features/).
