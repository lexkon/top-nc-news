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
    .then(({body: {topics: {rows}}}) => {
      expect(rows.length).toBe(3)
      rows.forEach((topic) => {
        expect(topic).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String)
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
  test("404: returns error when no article exists", () => {
    return request(app)
      .get('/api/articles/9999999')
      .expect(404)
      .then(({body: { msg }}) => {
        expect(msg).toBe('article does not exist')
      })
  }),
  test('400: returns error when given an invalid id', () => {
    return request(app)
      .get('/api/articles/not-an-article')
      .expect(400)
      .then(({body: { msg }}) => {
        expect(msg).toBe('bad request')
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