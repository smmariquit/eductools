#!/usr/bin/env bash
# afterFileEdit hook: keep the "Last updated" date honest on content MDX.
#
# Whenever any agent edits a src/content/**/*.mdx file, this stamps the
# <Changelog updated="YYYY-MM-DD"> attribute to today's date. It only touches
# the date attribute; the changelog NOTE remains the agent's job (see
# .cursor/rules/mdx-changelog.mdc). Fails open and is idempotent (no write when
# the date is already today), so it cannot loop or block edits.
set -euo pipefail

input=$(cat)

# Resolve the edited file path from whichever key this Cursor build uses,
# falling back to scanning the payload for any content MDX path.
file=$(printf '%s' "$input" | jq -r '.file_path // .path // .filePath // .file // empty' 2>/dev/null || true)
if [ -z "$file" ]; then
  file=$(printf '%s' "$input" | jq -r '[.. | strings | select(test("src/content/.*\\.mdx$"))][0] // empty' 2>/dev/null || true)
fi

[ -z "$file" ] && exit 0

case "$file" in
  *src/content/*.mdx) ;;
  *) exit 0 ;;
esac

[ -f "$file" ] || exit 0

today=$(date +%F)

# Only rewrite when an updated="DATE" marker exists and isn't already today.
if grep -Eq 'updated="[0-9]{4}-[0-9]{2}-[0-9]{2}"' "$file" \
  && ! grep -q "updated=\"$today\"" "$file"; then
  sed -i -E "s/updated=\"[0-9]{4}-[0-9]{2}-[0-9]{2}\"/updated=\"$today\"/" "$file"
fi

exit 0
