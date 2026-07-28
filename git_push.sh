#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
source ./git_lib.sh

read -rp "Enter commit message: " commit_message
git_safe_commit "$commit_message"
