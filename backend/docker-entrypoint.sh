#!/bin/sh
if [ "$1" = "start" ]
  then
    python manage.py migrate
    python manage.py runserver 0.0.0.0:8000
elif [ "$1" = "test" ]
  then
    python manage.py test
fi

