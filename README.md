# Northcoders News API

A RESTful API built with **Node.js v22.5.1**, **Express**, and **PostgreSQL v14.12** for a community news site, similar to [Reddit](https://www.reddit.com). 
The API allows users to interact with articles, comments, topics, and users. 
Testing is handled with **Jest** and **Supertest**.

[**Currently live and hosted on Render**](https://top-nc-news.onrender.com/api)

## Features
- **GET /api**: Provides full API documentation in JSON
- **Database**:
  - Fully relational with PostgreSQL
  - Seeded test and development dbs for testing and local development


## API Endpoints

### General
- **GET /api**  
  Returns a list of all available endpoints

### Topics
- **GET /api/topics**  
  Fetch all topics

### Articles
- **GET /api/articles**  
  Fetch all articles
  - Supports optional queries:  
    - `sort_by` (e.g., created_at, votes)  
    - `order` (ASC/DESC)  
    - `topic` (filter by topic)  

- **GET /api/articles/:article_id**  
  Fetch a single article by ID

- **GET /api/articles/:article_id/comments**  
  Fetch comments for a specific article

- **POST /api/articles/:article_id/comments**  
  Add a comment to a specific article

- **PATCH /api/articles/:article_id**  
  Update an article (e.g. votes)

### Comments
- **DELETE /api/comments/:comment_id**  
  Delete a specific comment

### Users
- **GET /api/users**  
  Fetch all users


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
npm test app
```

--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
