const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', PORT);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(app.get('port'), () => {
    console.log(`🧼App is running at localhost:${app.get('port')}🧼`);
});

app.get('/api/products', (request, response) => {
  database('projects').select()
  .then(projects => {
    response.status(200).json(projects);
  })
  .catch(error => {
    response.status(500).json({error});
  });
});

app.get('/api/products/:id', (request, response) => {
  database('products').where('id', request.params.id).select()
  .then(product => {
    if (product.length) response.status(200).json(product);
    else response.status(404).json({error: `Could not find product with id ${id}`});
  })
  .catch(error => response.status(500).json({error}));
});

app.post('/api/products', (request, response) => {
  const product = request.body;
  for (const requiredParam of ['name',
  'imageLink',
  'ingredients',
  'containsMicroplastics',
  'link',
  'isbn']) {
    if (!product[requiredParam]) {
      return response.status(422).send(`Error posting, must include ${requiredParam}`);
    }
  }
  database('products').insert(product, 'id').then(product => {
    response.status(201).json({id: product[0]});
  });
});

module.exports = app;