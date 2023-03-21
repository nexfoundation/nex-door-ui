#!/bin/bash
 
if [[ $VERCEL_GIT_COMMIT_REF == "master"  ]] ; then 
  echo "This is our master branch"
  vue-cli-service build 
else 
  echo "This is not our master branch"
  vue-cli-service build --mode staging
fi