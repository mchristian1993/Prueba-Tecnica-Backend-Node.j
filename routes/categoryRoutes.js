// REQUIRE USERS CONTROLLER
const categoryController = require('../controllers/categoryController');



module.exports = (app) => {
    /**
     * GET ROUTES
     */
    /*  http://192.168.0.22:3000/api/category/1/products?page=1&pageSize=10 */
    app.get('/api/category/:id/products', categoryController.findById);

}