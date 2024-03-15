set -e

git fetch origin dev:dev --depth=1
git branch dev -t origin/dev
