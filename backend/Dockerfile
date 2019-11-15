FROM python:3.7-alpine

RUN mkdir /app

WORKDIR /app

COPY /Pipfile /app/Pipfile
COPY /Pipfile.lock /app/Pipfile.lock

RUN pip install pipenv

RUN pipenv install --system --deploy --ignore-pipfile

COPY ./app /app