const endpointsJson = require("../endpoints.json")
const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')

beforeEach(() => seed(data))
afterAll(() => db.end())

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson)
      })
  })
})
describe("GET /api/topics", () => {
  test("200: returns an array of topic objects each with properties of 'slug' and 'description'", () => {
    return request(app)
    .get('/api/topics')
    .expect(200)
    .then(({body: {topics}}) => {
      expect(topics.length).toBe(3)
      topics.forEach((topic) => {
        expect(topic).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String)
        })
      })
    })
  })
})
describe("GET /api/articles", () => {
  test("200: returns an array of article objects with descending sort by created_at, with properties author, title, article_id, topic, created_at, votes, article_img_url, comment_count", () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({body: { articles } }) => {
      expect(articles.length).not.toBe(0)
      expect(articles).toBeSortedBy('created_at', { descending: true })
      articles.forEach((article) => {
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
          comment_count: expect.any(Number)
        })
      })
    })
  })
})
describe("GET /api/articles/:article_id", () => {
  test("200: returns article by id with correct properties", () => {
    const expectedArticle = {
      article_id: 3,
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: '2020-11-03T09:12:00.000Z',
      votes: 0,
      article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
    }
    return request(app)
    .get('/api/articles/3')
    .expect(200)
    .expect(({body: { article }}) => {
      expect(article).toEqual(expectedArticle)
    })
  }),
  test('400: returns error when given an invalid article id', () => {
    return request(app)
      .get('/api/articles/not-an-article')
      .expect(400)
      .then(({body: { msg }}) => {
        expect(msg).toBe('bad request')
      })
  }),
  test("404: returns error when no article exists", () => {
    return request(app)
      .get('/api/articles/9999999')
      .expect(404)
      .then(({body: { msg }}) => {
        expect(msg).toBe('article does not exist')
      })
  })
})
describe("GET /api/articles/:article_id/comments", () => {
  test("200: returns array of comment objects ordered by recency", () => {
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then(({body: {comments}}) => {
      expect(comments.length).toBe(11)
      expect(comments).toBeSortedBy('created_at', { descending: true })
      comments.forEach((comment) => {
        expect(comment.article_id).toBe(1)
        expect(comment).toMatchObject({
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          comment_id: expect.any(Number),
        })
      })
    })
  }),
  test("200: returns empty array when article has no comments", () => {
    return request(app)
    .get('/api/articles/2/comments')
    .expect(200)
    .then(({body: {comments}}) => {
      expect(comments).toEqual([])
      expect(comments.length).toBe(0)
    })
  }),
  test('400: returns error when given an invalid article_id', () => {
    return request(app)
      .get('/api/articles/not-an-article/comments')
      .expect(400)
      .then(({body: { msg }}) => {
        expect(msg).toBe('bad request')
      })
  }),
  test("404: returns error when no article exists", () => {
    return request(app)
    .get('/api/articles/999999/comments')
    .expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe("article does not exist")
    })
  })
})
describe("POST /api/articles/:article_id/comments", () => {
  test("201: successful comment on article", () => {
    const dataToSend = {username: "lurker", body: "literally the best post ever"}
    return request(app)
    .post('/api/articles/3/comments')
    .send(dataToSend)
    .expect(201)
    .then(({body: { newComment }}) => {
      expect(newComment.author).toBe(dataToSend.username)
      expect(newComment.body).toBe(dataToSend.body)
    })
  }),
  test("400: error when no username present in request", () => {
    const dataToSend = {body: "literally the best post ever"}
    return request(app)
    .post('/api/articles/3/comments')
    .send(dataToSend)
    .expect(400)
    .then(({body: { msg }}) => {
        expect(msg).toBe('bad request')
    })
  }),
  test("400: error when no comment body present in request", () => {
    const dataToSend = {username: "lurker"}
    return request(app)
    .post('/api/articles/3/comments')
    .send(dataToSend)
    .expect(400)
    .then(({body: { msg }}) => {
        expect(msg).toBe('bad request')
    })
  }),
  test("400: error when username does not exist in db", () => {
    const dataToSend = {username: "anonbanana", body: "literally the best post ever"}
    return request(app)
      .post('/api/articles/3/comments')
      .send(dataToSend)
      .expect(400)
      .expect(({body: { msg }}) => {
        expect(msg).toBe('bad request')
    })
  }),
  test('400: returns error when given an invalid article id', () => {
    const dataToSend = {username: "lurker", body: "literally the best post ever"}
    return request(app)
      .post('/api/articles/not-an-article/comments')
      .send(dataToSend)
      .expect(400)
      .then(({body: { msg }}) => {
        expect(msg).toBe('bad request')
      })
  }),
  test("404: error when no article is found", () => {
    const dataToSend = {username: "lurker", body: "literally the best post ever"}
    return request(app)
    .post('/api/articles/999999/comments')
    .send(dataToSend)
    .expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe("article does not exist")
    })
  })
})
describe("PATCH /api/articles/:article_id", () => {
  test("200: returns article object with updated inc_votes property", () => {
    const expectedArticle = {
      article_id: 3,
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: '2020-11-03T09:12:00.000Z',
      votes: 34,
      article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
    }
    const newVotes = {inc_votes: 34}
    return request(app)
    .patch('/api/articles/3')
    .send(newVotes)
    .expect(200)
    .expect(({body: { article }}) => {
      expect(article.votes).toBe(34)
      expect(article).toEqual(expectedArticle)
    }) 
  }),
  test("400: returns error when given invalid request data", () => {
    const newVotes = {inc_votes: 'banana'}
    return request(app)
    .patch('/api/articles/3')
    .send(newVotes)
    .expect(400)
    .expect(({body: { msg }}) => {
      expect(msg).toBe('bad request')
    }) 
  })
  test('400: returns error when given an invalid article id', () => {
    const newVotes = {inc_votes: 34}
    return request(app)
      .patch('/api/articles/not-an-article')
      .send(newVotes)
      .expect(400)
      .then(({body: { msg }}) => {
        expect(msg).toBe('bad request')
      })
  }),
  test("404: error if article doesn't exist", () => {
    const newVotes = {inc_votes: 34}
    return request(app)
    .patch('/api/articles/999999')
    .send(newVotes)
    .expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe("article does not exist")
    })
  })
})
describe("DELETE /api/comments/:comment_id", () => {
  test("204: response when comment successfully deleted", () => {
    return request(app)
    .delete('/api/comments/7')
    .expect(204)
  }),
  test("400: error for invalid comment_id", () => {
    return request(app)
    .delete('/api/comments/banana')
    .expect(400)
    .then(({body: { msg }}) => {
      expect(msg).toBe('bad request')
    })
  }),
  test("404: error for non-existent comment", () => {
    return request(app)
    .delete('/api/comments/99999')
    .expect(404)
    .then(({body: { msg }}) => {
      expect(msg).toBe('comment does not exist')
    })
  })
})
describe("GET /api/users", () => {
  test("200: returns array of all users", () => {
    return request(app)
    .get('/api/users')
    .expect(200)
    .then(({body: {users}}) => {
      expect(users.length).toBe(4)
      users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String)
        })
      })
    })
  })
})


describe("Error handling", () => {
  test("404: error when attempting to access a non-existent endpoint", () => {
    return request(app)
    .get("/api/banana")
    .expect(404)
    .then(({ body: { msg } }) => {
      expect(msg).toBe('not an endpoint')
    })
  })
})