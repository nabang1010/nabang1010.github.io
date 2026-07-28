#!/usr/bin/env bash
# Shared helper for the git_*.sh scripts.
# Stages everything, shows what changed, and blocks the commit if the diff
# looks like it contains a secret. This is what should have caught the
# leaked Gitalk clientSecret before it ever hit _config.yml.

SECRET_PATTERN='client[_-]?secret|api[_-]?key|secret[_-]?key|password[[:space:]]*[:=]|BEGIN (RSA|OPENSSH|EC|PGP) PRIVATE KEY|AKIA[0-9A-Z]{16}'

git_safe_commit() {
    local message="$1"

    git add .
    echo "--- staged changes ---"
    git status --short

    if git diff --cached | grep -Eiq "$SECRET_PATTERN"; then
        echo ""
        echo "Possible secret found in staged changes. Commit aborted."
        echo "Review with: git diff --cached | grep -Ei '$SECRET_PATTERN'"
        git reset >/dev/null
        exit 1
    fi

    git commit -m "$message"
    git push
}
