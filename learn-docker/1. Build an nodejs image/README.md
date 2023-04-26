# This part create a simple express server that echo "hello world" on entering

In this folder
 - `index.js`: the actual server to be ran
 - `Dockerfile`: script to build the docker image
 - `.dockerignore`: script to ignore certain built file
 - `docker-compose.yml`: script to destroy & rebuild a container (or a group of container) 

### Commands to ran 


```
docker build -t some_repo/app:1.0 .
```

```
 docker-compose up --build
```

Sau khi truy cập vào localhost:5000 có thể thấy message

### Moral lessons

- Image are immutable. Must destroyed and rebuild everytime. 
- Highly changed script (code base) must be ran seperately from static ones (server, database)
- Need two docker-compose (one for development and one for production) => ***Lesson 2***