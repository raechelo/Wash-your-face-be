const data = require('../data');

exports.seed = knex => {
  return knex('products').del()
  .then(() => {
    knex('products').insert({
      name: data.name,
      ingredients: data.ingredients,
      imageLink: data.imageLink,
      containsMicroplastics: data.containsMicroplastics,
      isbn: data.isbn,
      link: data.link
    });
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
}
