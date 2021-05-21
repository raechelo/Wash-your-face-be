const data = require('../data');

const createProduct = (knex, product) => {
  return knex('products').insert({
    name: product.name,
    ingredients: product.ingredients,
    imageLink: product.imageLink,
    containsMicroplastics: product.containsMicroplastics,
    isbn: product.isbn,
    link: product.link
  }, 'id');
}

exports.seed = knex => {
  return knex('products').del()
  .then(() => {
    data.forEach(product => createProduct(knex, product));
  })
  .catch(error => console.log(`Error sending data: ${error}`));
}
