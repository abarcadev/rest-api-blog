# Blog REST API

## Overview
17 Endpoints:
* url/api/login (POST)
* url/api/users (GET, POST)
* url/api/categories (GET, POST)
* url/api/tags (GET, POST)
* url/api/posts (GET, POST, PATCH, DELETE)
* url/api/comments (GET, POST, PATCH, DELETE)

## Technologies
* Express with TypeScript.
* MySQL database with TypeORM.
* MySQL Docker container.
* Token middleware with JWT (jsonwebtoken) for verify tokens.
* Validation middleware with Joi for validating user inputs (using my own NPM package).
* Validation env with env-var.
* Testing with Jest.

## Design patterns
* Module pattern
* Adapter pattern
* Dependency injection (DI)

## Getting started
1. Install the dependencies:
```
npm i
```
2. Clone the .env.template to .env file.
3. Run the project:
```
docker compose up -d
```
```
npm run dev
```
4. Check links section.

## Links (Google drive)
* [Run Blog DB scripts](https://drive.google.com/file/d/1A2XaKEqRcx5HlVmC82fYhmUFcpRUGvYY/view?usp=sharing)
* [ER Diagram](https://drive.google.com/file/d/1oLx6fZS_iRKJRi08q47CUGmzj6G5o5zZ/view?usp=sharing)
* [Postman collection](https://drive.google.com/file/d/1R5Bqtzul3u0WsiZwS81kZT3q7RYz5HtJ/view?usp=sharing)

## Test
1. Check tests folder.
2. Run:
```
npm run test
```