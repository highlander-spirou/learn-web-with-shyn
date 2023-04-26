# Read different docker-compose files, and working with mongodb - mongo-express

To create and read different compose files, using the command 

```
docker-compose -f composes/some-composes.yml up --build
```

*Assume that all -compose.yml locate in ***composes*** folder*

This example works with express server, mongodb and mongo-express as database administrator. The mongodb and mongo-express will be deployed coupled in both dev and prod, while the express server is kept seperately in development 

## Directory explain
- composes
    - dev.yml: contains script to build the docker compose of mongo-express and mongodb
    - mongo-init.sh: automation file that triggers everytime the docker container runs. it will create a new table `MONGO_INITDB_DATABASE`, and create a first collection with one document

- app: this is the express server
- .env: environment variables

## Explain `dev.yml` file

```yml
version: "3"

volumes:
  mongodbdata:
    name: mongodbdata
    driver: local

services:
  mongodb:
    image: mongo
    ports:
      - "27017:27017"
    restart: always
    environment:
      - MONGO_INITDB_DATABASE=${MONGO_INITDB_DATABASE}
      - MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}
    env_file: [../.env] # copy the .env file to the .env file of the container, to work with mongo-init.sh
    volumes: 
      # sync the volume calls mongodbdata to the /data/db of the mongodb container
      # (the /data/db dir holds the actual data of mongodb)
      - mongodbdata:/data/db

      # syntax to mount the file to the container directory
      # <local dir>:<container_dir>:<optional access (example `ro`- read-only)>
      - ./mongo-init.sh:/docker-entrypoint-initdb.d/mongo-init.sh:ro
    
  mongo-express:
    image: mongo-express
    restart: always
    # specify that the mongo-express should ran after the mongodb has start 
    depends_on: 
      - mongodb
    ports:
      - "8081:8081"
    environment:
      - ME_CONFIG_BASICAUTH_USERNAME=mongo-user
      - ME_CONFIG_BASICAUTH_PASSWORD=mongo-password
      - ME_CONFIG_MONGODB_SERVER=mongodb
      - ME_CONFIG_MONGODB_ENABLE_ADMIN=true
      - ME_CONFIG_MONGODB_ADMINUSERNAME=${MONGO_INITDB_ROOT_USERNAME}
      - ME_CONFIG_MONGODB_ADMINPASSWORD=${MONGO_INITDB_ROOT_PASSWORD}
      # new version of mongo-express requires we construct the the URL
      # with the @mongodb is the name of the mongodb service
      - ME_CONFIG_MONGODB_URL=mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017
```

## `mongoose` configuration warning

Because we access different database then what we use to authenticate, must add the queryParams `?authSource=admin`

```ts
const mongo_uri = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_INITDB_DATABASE}?authSource=admin`

```

## Development mode

In development mode, run the following commands:

1. Build the server

```
docker-compose --env-file=.env -f composes/dev.yml up --build -d
```

2. Run express server
```
npm start
```