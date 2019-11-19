# case-study dish API

## CI result
[![Build Status](https://travis-ci.org/Stone-Codes/case-study-dish-api.svg?branch=master)](https://travis-ci.org/Stone-Codes/case-study-dish-api)

## The compose files
There are different compose files for production developing and testing
The base compose file needs to be extended with the test or dev compose file (see Running the app section)


# Running the app
## Runing the app in production mode

To run the app just start it via the docker-compose.yml
```bash
docker-compose up
```

## Running unit tests for the app

To run the test for either the frontend or the backend you can use:

- Backend
```bash
docker-compose -f docker-compose.yml -f docker-compose.test.yml run backend
```
- Frontend
```bash
docker-compose -f docker-compose.yml -f docker-compose.test.yml run frontend
```

## Running the app in development mode
To run this app in development mode in docker simply use this command:
```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```