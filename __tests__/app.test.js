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
      .then(({ body: { topics } }) => {
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
      .then(({ body: { articles } }) => {
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
describe("GET /api/articles (sort, order, topic queries)", () => {
  describe("Query: sort_by", () => {
    test("200: responds with array of articles sorted by article_id, descending", () => {
      return request(app)
        .get('/api/articles?sort_by=article_id')
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles.length).not.toBe(0)
          expect(articles).toBeSortedBy('article_id', { descending: true })
        })
    }),
      test("200: responds with array of articles sorted by votes, descending", () => {
        return request(app)
          .get('/api/articles?sort_by=votes')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles.length).not.toBe(0)
            expect(articles).toBeSortedBy('votes', { descending: true })
          })
      }),
      test("400: responds with error when using invalid sort query", () => {
        return request(app)
          .get('/api/articles?sort_by=banana')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("invalid sort query")
          })
      }),
      test("400: responds with error when using invalid query", () => {
        return request(app)
          .get('/api/articles?banana=yellow')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("invalid query")
          })
      })
  })
  describe("Query: order", () => {
    test("200: responds with array of articles sorted by created_at, ascending", () => {
      return request(app)
        .get('/api/articles?order=ASC')
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles.length).not.toBe(0)
          expect(articles).toBeSortedBy('created_at', { descending: false })
        })
    }),
      test("400: responds with error for invalid order query", () => {
        return request(app)
          .get('/api/articles?order=potato')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("invalid sort order")
          })
      })
  })
  describe("Query: topic", () => {
    test("200: returns articles filtered by topic", () => {
      return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles.length).toBe(12)
          expect(articles).toBeSortedBy('created_at', { descending: true })
          articles.forEach((article) => {
            expect(article.topic).toBe('mitch')
          })
        })
    }),
      test("200: returns empty array for valid topic with no articles", () => {
        return request(app)
          .get('/api/articles?topic=paper')
          .expect(200)
          .then(({ body: { articles } }) => {
            expect(articles).toEqual([])
          })
      }),
      test("404: returns an error when topic does not exist", () => {
        return request(app)
          .get('/api/articles?topic=sausages')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("topic does not exist")
          })
      })
  })
  describe("Combinations of queries", () => {
    test("200: responds with array of articles sorted by author, ascending, & topic", () => {
      return request(app)
        .get('/api/articles?sort_by=author&order=ASC&topic=mitch')
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles.length).not.toBe(0)
          expect(articles).toBeSortedBy('author', { descending: false })
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
      article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
      comment_count: 2
    }
    return request(app)
      .get('/api/articles/3')
      .expect(200)
      .expect(({ body: { article } }) => {
        expect(article.comment_count).toBe(2)
        expect(article).toEqual(expectedArticle)
      })
  }),
    test('400: returns error when given an invalid article id', () => {
      return request(app)
        .get('/api/articles/not-an-article')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request')
        })
    }),
    test("404: returns error when no article exists", () => {
      return request(app)
        .get('/api/articles/9999999')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('article does not exist')
        })
    })
})
describe("GET /api/articles/:article_id/comments", () => {
  test("200: returns array of comment objects ordered by recency", () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body: { comments } }) => {
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
        .then(({ body: { comments } }) => {
          expect(comments).toEqual([])
          expect(comments.length).toBe(0)
        })
    }),
    test('400: returns error when given an invalid article_id', () => {
      return request(app)
        .get('/api/articles/not-an-article/comments')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request')
        })
    }),
    test("404: returns error when no article exists", () => {
      return request(app)
        .get('/api/articles/999999/comments')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("article does not exist")
        })
    })
})
describe("POST /api/articles/:article_id/comments", () => {
  test("201: successful comment on article", () => {
    const dataToSend = { username: "lurker", body: "literally the best post ever" }
    return request(app)
      .post('/api/articles/3/comments')
      .send(dataToSend)
      .expect(201)
      .then(({ body: { newComment } }) => {
        expect(newComment.author).toBe(dataToSend.username)
        expect(newComment.body).toBe(dataToSend.body)
      })
  }),
    test("400: error when no username present in request", () => {
      const dataToSend = { body: "literally the best post ever" }
      return request(app)
        .post('/api/articles/3/comments')
        .send(dataToSend)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request')
        })
    }),
    test("400: error when no comment body present in request", () => {
      const dataToSend = { username: "lurker" }
      return request(app)
        .post('/api/articles/3/comments')
        .send(dataToSend)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request')
        })
    }),
    test("400: error when username does not exist in db", () => {
      const dataToSend = { username: "anonbanana", body: "literally the best post ever" }
      return request(app)
        .post('/api/articles/3/comments')
        .send(dataToSend)
        .expect(400)
        .expect(({ body: { msg } }) => {
          expect(msg).toBe('bad request')
        })
    }),
    test('400: returns error when given an invalid article id', () => {
      const dataToSend = { username: "lurker", body: "literally the best post ever" }
      return request(app)
        .post('/api/articles/not-an-article/comments')
        .send(dataToSend)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request')
        })
    }),
    test("404: error when no article is found", () => {
      const dataToSend = { username: "lurker", body: "literally the best post ever" }
      return request(app)
        .post('/api/articles/999999/comments')
        .send(dataToSend)
        .expect(404)
        .then(({ body: { msg } }) => {
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
    const newVotes = { inc_votes: 34 }
    return request(app)
      .patch('/api/articles/3')
      .send(newVotes)
      .expect(200)
      .expect(({ body: { article } }) => {
        expect(article.votes).toBe(34)
        expect(article).toEqual(expectedArticle)
      })
  }),
    test("400: returns error when given invalid request data", () => {
      const newVotes = { inc_votes: 'banana' }
      return request(app)
        .patch('/api/articles/3')
        .send(newVotes)
        .expect(400)
        .expect(({ body: { msg } }) => {
          expect(msg).toBe('bad request')
        })
    })
  test('400: returns error when given an invalid article id', () => {
    const newVotes = { inc_votes: 34 }
    return request(app)
      .patch('/api/articles/not-an-article')
      .send(newVotes)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('bad request')
      })
  }),
    test("400: returns error when attempting to update data that doesn't exits ", () => {
      const dataToSend = { bananas: 34 }
      return request(app)
        .patch('/api/articles/3')
        .send(dataToSend)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('invalid request')
        })
    }),
    test("404: error if article doesn't exist", () => {
      const newVotes = { inc_votes: 34 }
      return request(app)
        .patch('/api/articles/999999')
        .send(newVotes)
        .expect(404)
        .then(({ body: { msg } }) => {
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
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request')
        })
    }),
    test("404: error for non-existent comment", () => {
      return request(app)
        .delete('/api/comments/99999')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('comment does not exist')
        })
    })
})
describe("PATCH /api/comments/:comment_id", () => {
  test("200: returns comment object with updated inc_votes property", () => {
    const expectedComment = {
      "comment_id": 16,
      "body": "This is a bad article name",
      "article_id": 6,
      "author": "butter_bridge",
      "votes": 35,
      "created_at": "2020-10-11T15:23:00.000Z"
    }
    const newVotes = { inc_votes: 34 }
    return request(app)
      .patch('/api/comments/16')
      .send(newVotes)
      .expect(200)
      .expect(({ body: { comment } }) => {
        expect(comment.votes).toBe(35)
        expect(comment).toEqual(expectedComment)
      })
  }),
    test("400: returns error when given invalid request data", () => {
      const newVotes = { inc_votes: 'banana' }
      return request(app)
        .patch('/api/comments/3')
        .send(newVotes)
        .expect(400)
        .expect(({ body: { msg } }) => {
          expect(msg).toBe('bad request')
        })
    }),
    test('400: returns error when given an invalid comment_id', () => {
      const newVotes = { inc_votes: 34 }
      return request(app)
        .patch('/api/comments/not-an-article')
        .send(newVotes)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request')
        })
    }),
    test("400: returns error when attempting to update data that doesn't exits ", () => {
      const dataToSend = { bananas: 34 }
      return request(app)
        .patch('/api/comments/16')
        .send(dataToSend)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('invalid request')
        })
    }),
    test("404: error if comment doesn't exist", () => {
      const newVotes = { inc_votes: 34 }
      return request(app)
        .patch('/api/comments/999999')
        .send(newVotes)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("comment does not exist")
        })
    })
})

describe("GET /api/users", () => {
  test("200: returns array of all users", () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({ body: { users } }) => {
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
describe("GET /api/users/:username", () => {
  test("200: returns valid user with username, avatar_url, name info", () => {
    const expectedUser = {
      username: 'butter_bridge',
      name: 'jonny',
      avatar_url:
        'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
    }
    return request(app)
      .get('/api/users/butter_bridge')
      .expect(200)
      .then(({ body: { user } }) => {
        expect(expectedUser).toEqual(user)
      })
  }),
    test("404: error when no user found", () => {
      return request(app)
        .get('/api/users/potatowaffle')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toEqual("user does not exist")
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