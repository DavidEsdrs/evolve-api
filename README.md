
# Instagram-clone

## How to run?

- Prerequisites:
    * [NodeJs](https://nodejs.org/en) installed, this project was made using `v18.13`, but using `NodeJs vesion >=v14` might run it properly;
    * [Docker](https://www.docker.com/) installed, it is needed to run the MySQL container wich the project uses;
    * [Postman](https://www.postman.com/downloads/), [Insomnia](https://insomnia.rest/download) or any other client that you want to consume the API;

- Clone this repository inside an empty folder:

```sh
git clone https://github.com/DavidEsdrs/instagram-clone.git .
```

- Install the packages with you prefered package manager:

```sh
yarn
OR
npm install
```

- Create a `.env` file in the root of the project:

```sh
touch .env
```

- Insert the following variables into it:

```sh
SERVER_PORT=4747
DATABASE_URL="mysql://user:password@localhost:3333/instaclone"
ACCESS_TOKEN_SECRET="secret"
ACCESS_TOKEN_LIFESPAN="7d"
FRONT_END_URL="http://localhost:3000"
```

> **Warning:** The DATABASE_URL is considering that you will run the docker container with mysql image in port 3333, if you change the port there, change the url here too.

> **Tip:** You can change any of these variables as you want. The ACCESS_TOKEN_LIFESPAN is relative time (7d for 7 days, 1m for 1 minute). The FRONT_END_URL is needed if you are consuming it from a front end. If you are just consuming it with postman, insomnia or curl, it is not necessary. SERVER_PORT is optional, default port is 4747

- Run the needed container (mysql):

```sh
docker compose up -d
```

> **Tip:** You can check if the container is running using the command `docker ps`, if a container named mysql is running, everything is set up

- Run the migrations in the database to set the tables:

```sh
npx prisma migrate dev
```

- Now, just run the project and consume it!:

```sh
yarn dev
OR
npm run dev
```

output if everything is ok:

```sh
running at port:4747
```

***

## Features

- Profile:
    * [TODO] Private or public:
        - When the profile is private the user need to accept new followers requests;
    * Bio;
    * Photos;
- Followers:
- [TODO] Direct:
- [TODO] Highlights:
- Feed:
    * List posts;
    * Comments;
    * Likes;
- Stories:
- Explore:
    * Tags;

### User

- [TODO] Profile pic;
- Name;
- Username;
- Bio;
-- Posts;
-- Number of followers;
-- Number of users that the user follows;

### Post

- Image;
- Description;
- Number of likes;
- [TODO] Views

### Comment

- Content;
- Likes;

### [TODO] Storie

- Image;

### [TODO] Direct

- Real-time chat;

### Tech

- MySQL;
- React Native;
- NodeJS;

[TODO] Improve this file
