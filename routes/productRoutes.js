// REQUIRE USERS CONTROLLER
const productController = require('../controllers/productController');



module.exports = (app) => {
    /**
     * GET ROUTES
     */
    app.get('/api/product/search', productController.search);
    app.get('/api/product/:id', productController.findById);

    /**
         * POST ROUTES
         */

    app.post('/api/product', productController.create);

    /**
        * PUT ROUTES
        */
    app.put('/api/product/:id', productController.update);

}