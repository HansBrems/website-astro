# `.github/` — AI Customization Layer

This folder contains the GitHub Copilot Chat customization layer for this project. It is not part of the site build — it only affects how AI assistants behave when working in this repository.

| Path                      | Purpose                                                                                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `copilot-instructions.md` | Always-loaded entry point. Contains the project overview, hard constraints, and links to detailed docs. Copilot reads this file automatically in every session.  |
| `docs/`                   | Long-form technical reference. Files here are linked from the entry point and read on demand.                                                                    |
| `instructions/`           | File-scoped instruction files. VS Code Copilot injects each file automatically when the open file matches its `applyTo` glob.                                    |
| `prompts/`                | Reusable prompt files. Invokable from Copilot Chat by typing `/` followed by the prompt name (e.g. `/add-project`).                                              |
| `skills/`                 | Agent skill files. VS Code Copilot Chat loads these on demand when a request matches the skill's description; the agent reads the SKILL.md to get the procedure. |
| `hooks/`                  | Experimental post-edit hooks. Currently inert — kept for future use.                                                                                             |
