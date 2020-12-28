const knex = require('knex');
const ArticlesService = require('../src/articles-service');

describe('Articles service object', () => {
  let db;
  const testArticles = [
    {
      id: 1,
      date_published: new Date('2029-01-22T16:28:32.615Z'),
      title: 'First test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      date_published: new Date('2100-05-22T16:28:32.615Z'),
      title: 'Second test post!',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.',
    },
    {
      id: 3,
      date_published: new Date('1919-12-22T16:28:32.615Z'),
      title: 'Third test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.',
    },
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db('blogful_articles').truncate());

  afterEach(() => db('blogful_articles').truncate());

  after(() => db.destroy());

  context('Given \'blogful_articles\' has data', () => {
    before(() => db
      .into('blogful_articles')
      .insert(testArticles));

    it('getAllArticles() resolves all articles from \'blogful_articles\' table', () => ArticlesService.getAllArticles(db)
      .then((actual) => {
        expect(actual).to.eql(testArticles);
      }));
  });

  context('Given \'blogful_articles\' has no data', () => {
    it('getAllArticles() resolves an empty array', () => ArticlesService.getAllArticles(db)
      .then((actual) => {
        expect(actual).to.eql([]);
      }));
  });

  it('insertArticle() inserts an article and resolves the article with an \'id\'', () => {
    const newArticle = {
      title: 'Test new title',
      content: 'Test new content',
      date_published: new Date('2020-01-01T00:00:00.000Z'),
    };
    return ArticlesService.insertArticle(db, newArticle);
  });
});
