#!/bin/bash
 
if [[ $VERCEL_GIT_COMMIT_REF == "master"  ]] ; then 
  echo "This is our master branch"
  npm run build 
else 
  echo "This is not our master branch"
  npm run build:staging
fi
