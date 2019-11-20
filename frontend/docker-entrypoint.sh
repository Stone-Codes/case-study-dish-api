#!/bin/sh
if [ "$1" = "start" ]
  then
    yarn start
elif [ "$1" = "test" ]
  then
    CI=true yarn test
fi