// REQUIRE USERS CONTROLLER
const supplierController = require('../controllers/supplierController');



module.exports = (app) => {
    /**
     * GET ROUTES
     */
    app.get('/api/suppliers/:id', supplierController.findById);
    app.get('/api/suppliers/:id/products', supplierController.findSupplierWithProducts);
    /**
         * DELETE ROUTES
         */
    app.delete('/api/suppliers/:id', supplierController.delete);



}