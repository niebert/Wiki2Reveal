#!/bin/sh
echo "------------------------"
echo "  Script: $0"
echo "------------------------"
msg="Bugfix of package"
if [ $# -eq 0 ]
  then
    echo "WARNING ($0): No arguments supplied - use default commit message"
    echo "Default Commit Message: '$msg'"
  else
    msg="$1"
    echo "Commit Message: '$msg'"
fi
git add *;
git commit -m "$msg"
git push
npm version patch
# npm publish
