---
description: 'Inspect staged git changes, generate a conventional commit message, confirm with the user, and commit. Ignores unstaged changes.'
agent: 'agent'
tools: ['execute/runInTerminal', 'vscode/askQuestions']
---

1. Use the `commit-message` skill to generate a commit message for the currently staged changes.
2. Show the proposed message to the user and ask them to confirm, edit, or abort.
3. Only after explicit approval, run `git commit -m "<approved message>"` and report the result.
