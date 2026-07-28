#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
source ./git_lib.sh

git_safe_commit "nabang1010 fix"
