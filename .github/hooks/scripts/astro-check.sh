#!/usr/bin/env bash
# PostToolUse hook — runs `npx astro check` after source file edits.
#
# Receives a JSON payload on stdin describing the tool that just ran.
# Exits 2 (blocking) if type errors are found in modified src/ files.

set -uo pipefail

INPUT=$(cat)

# Extract the tool name from the hook payload
TOOL_NAME=$(printf '%s' "$INPUT" \
  | grep -o '"tool_name"[[:space:]]*:[[:space:]]*"[^"]*"' \
  | head -1 \
  | sed 's/.*:[[:space:]]*"\(.*\)"/\1/' \
  || true)

# Extract the primary filePath argument (covers create_file and replace_string_in_file)
FILE_PATH=$(printf '%s' "$INPUT" \
  | grep -o '"filePath"[[:space:]]*:[[:space:]]*"[^"]*"' \
  | head -1 \
  | sed 's/.*:[[:space:]]*"\(.*\)"/\1/' \
  || true)

# Only trigger for file-write tools
case "$TOOL_NAME" in
  create_file|replace_string_in_file|multi_replace_string_in_file)
    ;;
  *)
    exit 0
    ;;
esac

# Only trigger when a file inside src/ was modified
if [[ "$FILE_PATH" != src/* ]]; then
  exit 0
fi

# Run Astro type-check (errors only — skip warnings to stay fast)
CHECK_OUTPUT=$(npx astro check --minimumSeverity error 2>&1) || {
  printf '%s\n' "$CHECK_OUTPUT" >&2
  exit 2
}

exit 0
