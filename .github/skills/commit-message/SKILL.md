---
name: commit-message
description: 'Inspect staged git changes and generate a conventional commit message. Use when you want to commit staged changes, need a commit message for the current diff, or are asked to generate/write a commit message. Triggered by: "commit", "staged changes", "git commit", "commit message".'
argument-hint: 'Optional: extra context or scope hint (e.g. "feat: projects page")'
---

# Commit Message Generator

Inspects **only** the staged git diff and produces a single conventional commit message. Unstaged changes are ignored entirely.

## Procedure

1. Run `git diff --staged` to retrieve the staged diff. Do NOT run `git diff` (unstaged).
2. If the output is empty, stop and inform the user there are no staged changes.
3. Analyse the diff:
   - Write a concise imperative-mood subject line (≤72 chars).
   - If the change is non-trivial, add a short body (blank line after subject) explaining _what_ changed and _why_ — not _how_.
4. Output the generated message in this format:

   ```
   <subject>

   [optional body]
   ```

## Conventions

- Subject line: imperative mood, no trailing period, sentence case.
- Body: wrap at 72 chars, explain motivation not mechanics.
- Never include unstaged or untracked files in the analysis.
- Do not run `git add` — staging is the user's responsibility.
