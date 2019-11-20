FROM python:3.7-alpine

RUN mkdir /app

WORKDIR /app

COPY /Pipfile /app/Pipfile
COPY /Pipfile.lock /app/Pipfile.lock

RUN pip install pipenv

RUN pipenv install --system --deploy --ignore-pipfile

COPY ./app /app

COPY /docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["start"]