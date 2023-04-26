# Make server development in docker feasible with vscode

This project is based on the instruction of *https://www.youtube.com/watch?v=Av8ezg-2GWc*

## 1. Setup build file

Với nodejs có thể dùng swc, esbuild ... Với python, bước build có thể là compile .pyc, .pyx file, run migration ....

Nói chung, mục đích của setup build là xây dựng 1 container chạy chính xác theo qui trình của production, thay vì phân chia thành dev và prod branch. 

### VD: xây dựng build với `swc`

```
npm i -D @swc/cli @swc/core
```

- Setup `.swcrc` file

```
{
    "env": {
        "targets": {
            "node": 18
        }
    },
    "jsc": {
        "parser": {
            "syntax": "typescript"
        }
    },
    "module": {
        "type": "commonjs"
    },
    "sourceMaps": "inline"
}
```

- Setup `package.json`

```json
"scripts": {
    "build": "rm -rf dist && swc ./src -d dist",
    #? remove `dist` folder if exist and build new one with swc
    "start": "node dist/index.js",
    "start:docker": "npm run build && npm run start" 
    #? ta tạo ra 2 seperate script: 
    # npm start dùng cho general purpose (Dockerfile)
    # npm run start:docker dùng explicitly cho docker-compose command
}
```

## 2. Dockerfile & docker-compose.yml

Dockerfile phải đc keep exactly like production, vì nó chính là image ta bỏ lên production

Setup .dockerignore

```
node_modules
dist
#? change `dist` folder thành output folder tùy ý
```

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "npm", "start" ]
```

Trong khi docker compose có thể có 1 vài sự khác biệt, vì ta có thể thay đổi việc đọc file compose (bài 2) đc

```yml
version: '3'

services:
  server:
    build: .
    #? using the Dockerfile in the "." directory, build the image
    ports:
      - "8080:8080"
      - "9229:9229"
    volumes:
      - .:/app
      #? map the current directory "." to the "/app" directory in docker (app chính là WORKDIR trong Dockerfile)
      - /app/node_modules
      #? map docker's node_modules seperately
    command: npm run start:docker

```

Sau đó chạy lệnh

```
docker-compose up
```

## 3. `docker-compose up` mỗi khi save file

Extension `Trigger Task on Save` của vscode giúp ta có thể trigger docker-compose up mỗi khi save file (như nodemon)

- tạo `.vscode` directory và `tasks.json`

```
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "monitor backend",
            "type": "shell",
            "command": "docker compose restart server",
            "presentation": {
                "reveal": "never",
            }
        }
    ]
}
```

- tạo settings.json

```
{
    "triggerTaskOnSave.tasks": {
        "monitor server": ["src/**/*"]
    }
}
```

Vậy là setup xong hết server development in docker


## 4. Multi root problem with .vscode

Khi ta mở 1 big project, ta ko thể nào xài `trigger task on save` đc. Lúc này, xài `nodemon` monitor package từ npm

```
npm install -D nodemon
```

Tạo nodemon.json

```
{
    "watch": ["src"],
    "ext": ".ts, .js, .tsx, .jsx, .css, .html, .scss",
    "exec": "docker-compose restart server"
}
```

Modify package.json

```
"watch": "nodemon"
```