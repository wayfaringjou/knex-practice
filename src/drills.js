const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: 'postgresql://dunder_mifflin@localhost:5432/knex-practice',
});

function searchByProduceName(searchTerm) {
  knexInstance
    .select('name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then((result) => {
      console.log(result);
    });
}

searchByProduceName('pizza');

function paginateProducts(page) {
  const productsPerPage = 6;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select('name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then((result) => {
      console.log(result);
    });
}

paginateProducts(2);

function getItemsAfterDate(daysAgo) {
  knexInstance
    .select('name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where('date_added',
      '>',
      knexInstance.raw('now() - \'?? days\'::INTERVAL', daysAgo))
    .orderBy([{ column: 'date_added', order: 'ASC' }])
    .then((result) => {
      console.log(result);
    });
}

getItemsAfterDate(2);

function totalCostPerCategory() {
  knexInstance
    .select('category')
    .sum('price AS total')
    .from('shopping_list')
    .groupBy('category')
    .orderBy([
      { column: 'total', order: 'ASC' },
      { column: 'category', order: 'DESC' },
    ])
    .then((result) => {
      console.log(result);
    });
}

totalCostPerCategory();
