const request = require('supertest');
const app = require('./server');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

describe('Server', () => {

  beforeEach(async() => {
    await database.seed.run();
  });

  describe('GET /products', () => {

    it('should return a status of 200 on a successful call', async () => {
      request(app).get('/api/products').then(res => expect(res.statusCode).toBe(200));
    });

    it('should return all the products in the database', async () => {
      const expectedProductName = await database('products').select().name;
      const res = await request(app).get('/api/products');
      const productName = res.body.name;
      expect(productName).toEqual(expectedProductName);
    });
  });

  describe('POST /products', () => {

    it('should return a status of 201 on a successful post', async () => {
      const newProduct = { name: 'New facewash' };
      const res = await request(app).post('/api/products').send(newProduct);
      await database('products').where('id', res.body.id).select();
      expect(res.staus).toBe(201);
    });

    describe('Successful Post /products', () => {

      it(`should post the new product's name to the database`, async () => {
        const newProduct = { name: 'New facewash' };
        const res = await request(app).post('/api/products').send(newProduct);
        const products = await database('products').where('id', res.body.id).select();
        const product = products[0];
        expect(product.name).toEqual(newProduct.name);
      });

      it(`should post the new product's imageLink to the database`, async () => {
        const newProduct = { imageLink: 'www.someimagelink.com' };
        const res = await request(app).post('/api/products').send(newProduct);
        const products = await database('products').where('id', res.body.id).select();
        const product = products[0];
        expect(product.imageLink).toEqual(newProduct.imageLink);
      });

      it(`should post the new product's ingredients to the database`, async () => {
        const newProduct = { ingredients: 'microplastics, citric acid, grapefruit' };
        const res = await request(app).post('/api/products').send(newProduct);
        const products = await database('products').where('id', res.body.id).select();
        const product = products[0];
        expect(product.ingredients).toEqual(newProduct.ingredients);
      });

      it(`should post the new product's containsMicroplastics to the database`, async () => {
        const newProduct = { containsMicroplastics: true };
        const res = await request(app).post('/api/products').send(newProduct);
        const products = await database('products').where('id', res.body.id).select();
        const product = products[0];
        expect(product.containsMicroplastics).toEqual(newProduct.containsMicroplastics);
      });

      it(`should post the new product's link to the database`, async () => {
        const newProduct = { link: 'www.somelink.com' };
        const res = await request(app).post('/api/products').send(newProduct);
        const products = await database('products').where('id', res.body.id).select();
        const product = products[0];
        expect(product.link).toEqual(newProduct.link);
      });

      it(`should post the new product's isbn to the database`, async () => {
        const newProduct = { isbn: '1' };
        const res = await request(app).post('/api/products').send(newProduct);
        const products = await database('products').where('id', res.body.id).select();
        const product = products[0];
        expect(product.isbn).toEqual(newProduct.isbn);
      });
    });
   
    describe('Unsuccessful Post /products', () => {

      it('should return a status of 422 on an unsuccessful post without name', async () => {
        const missingName = { imageLink: 'string', ingredients: 'string', containsMicroplastics: false, link: 'string', isbn: 'string'};
        const res = await request(app).post('/api/products').send(missingName);
        expect(res.status).toBe(422);
      });

      it('should return a descriptive error for unsuccessful posts without name', async () => {
        const missingName = { imageLink: 'string', ingredients: 'string', containsMicroplastics: false, link: 'string', isbn: 'string'};
        const res = await request(app).post('/api/products').send(missingName);
        expect(res.body).toEqual('Error posting, must include name');
      });

      it('should return a status of 422 on an unsuccessful post without imageLink', async () => {
        const missingImageLink = { brand: 'New facewash', ingredients: 'string', containsMicroplastics: false, link: 'string', isbn: 'string'};
        const res = await request(app).post('/api/products').send(missingImageLink);
        expect(res.status).toBe(422);
      });

      it('should return a descriptive error for unsuccessful posts without imageLink', async () => {
        const missingName = { imageLink: 'string', ingredients: 'string', containsMicroplastics: false, link: 'string', isbn: 'string'};
        const res = await request(app).post('/api/products').send(missingName);
        expect(res.body).toEqual('Error posting, must include imageLink');
      });

      it('should return a status of 422 on an unsuccessful post without ingredients', async () => {
        const missingIngredients = { brand: 'New facewash', imageLink: 'string', containsMicroplastics: false, link: 'string', isbn: 'string'};
        const res = await request(app).post('/api/products').send(missingIngredients);
        expect(res.status).toBe(422);
      });

      it('should return a descriptive error for unsuccessful posts without ingredients', async () => {
        const missingName = { imageLink: 'string', ingredients: 'string', containsMicroplastics: false, link: 'string', isbn: 'string'};
        const res = await request(app).post('/api/products').send(missingName);
        expect(res.body).toEqual('Error posting, must include ingredients');
      });

      it('should return a status of 422 on an unsuccessful post without containsMicroplastics', async () => {
        const missingContainsMicroplastics = { brand: 'New facewash', imageLink: 'string', ingredients: 'string', link: 'string', isbn: 'string'};
        const res = await request(app).post('/api/products').send(missingContainsMicroplastics);
        expect(res.status).toBe(422);
      });

      it('should return a descriptive error for unsuccessful posts without containsMicroplastics', async () => {
        const missingName = { imageLink: 'string', ingredients: 'string', containsMicroplastics: false, link: 'string', isbn: 'string'};
        const res = await request(app).post('/api/products').send(missingName);
        expect(res.body).toEqual('Error posting, must include containsMicroplastics');
      });

      it('should return a status of 422 on an unsuccessful post without link', async () => {
        const missingLink = { brand: 'New facewash', imageLink: 'string', ingredients: 'string', containsMicroplastics: false, isbn: 'string'};
        const res = await request(app).post('/api/products').send(missingLink);
        expect(res.status).toBe(422);
      });

      it('should return a descriptive error for unsuccessful posts without link', async () => {
        const missingName = { imageLink: 'string', ingredients: 'string', containsMicroplastics: false, link: 'string', isbn: 'string'};
        const res = await request(app).post('/api/products').send(missingName);
        expect(res.body).toEqual('Error posting, must include link');
      });

      it('should return a status of 422 on an unsuccessful post without isbn', async () => {
        const missingIsbn = { brand: 'New facewash', imageLink: 'string', ingredients: 'string', containsMicroplastics: false, link: 'string'};
        const res = await request(app).post('/api/products').send(missingIsbn);
        expect(res.status).toBe(422);
      });

      it('should return a descriptive error for unsuccessful posts without isbn', async () => {
        const missingName = { imageLink: 'string', ingredients: 'string', containsMicroplastics: false, link: 'string', isbn: 'string'};
        const res = await request(app).post('/api/products').send(missingName);
        expect(res.body).toEqual('Error posting, must include isbn');
      });
    });
  });
});