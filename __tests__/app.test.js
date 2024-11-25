const endpointsJson = require("../endpoints.json")
const request = require('supertest')
const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
const topics = require("../db/data/test-data/topics")

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
    .then(() => {
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