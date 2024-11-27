# Northcoders News API

A RESTful API built with **Node.js**, **Express**, and **PostgreSQL** for a news community site, similar to [Reddit](https://www.reddit.com). The API allows users to interact with articles, comments, topics, and users. 
Testing is handled with **Jest** and **Supertest**.

## Features
- **GET /api**: Provides API endpoint documentation in JSON format.
- CRUD operations for:
  - Articles
  - Comments
  - Topics
  - Users
- **Database**:
  - Fully relational with PostgreSQL.
  - Seeded test and development datasets for consistent testing and local development.

## Getting Started
### Install Dependencies
```
npm install
```

### Set Up Environment
Create your own `.env` files for development and test environments:
- `.env.development`:
  ```
  PGDATABASE=YOUR_DEV_DB
  ```
- `.env.test`:
  ```
  PGDATABASE=YOUR_TEST_DB
  ```

### Seed the Database
```
npm run seed
```

### Run Tests
```
npm test
```

--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
