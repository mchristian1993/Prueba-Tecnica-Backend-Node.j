const Category = require('../models/category');



module.exports = {
    /**
      * @GET 
      * BUSCAR PRODUCTO
      */
    findById(req, res, next) {
        const page = req.query.page;
        const limit = req.query.pageSize;
        const id = req.params.id
        console.log('p', page, 'l', limit)
        startIndex = (page - 1) * limit
        endIndex = page * limit
        Category.findById(id, limit, startIndex)
            .then(data => {

                datas = data.rows
                let address = {}
                let product = {}
                let dataFin = []
                let products = []
                let insert = 0
                datas.forEach((data) => {
                    insert++

                    address = {
                        city: data.city,
                        country: data.country,
                        phone: data.phone,
                        postalCode: data.postalcode,
                        region: data.region,
                        street: data.address

                    }
                    product = {
                        discontinued: data.discontinued,
                        id: data.productid,
                        productname: data.productname,
                        quantityPerUnit: data.quantityperunit,
                        reorderLevel: data.reorderlevel,
                        unitPrice: data.unitprice,
                        unitsInStock: data.unitsinstock,
                        unitsOnOrder: data.unitsonorder,
                        supplier: {
                            companyName: data.companyname,
                            contactName: data.contactname,
                            contactTitle: data.contacttitle,
                            id: data.supplierid,
                            address: address
                        }
                    }

                    products.push(product)
            
                    if (insert == datas.length) {

                        dataFin = {
                           description: data.description,
                            id: data.categoryid,
                            name: data.categoryname,
                            picture: data.picture, 
                            products


                        }
                        console.log(dataFin)
                       return res.status(201).json(dataFin);

                    }

                })



            })
            .catch(err => {
                console.log(err)
                return res.status(501).json({
                    message: 'Error al obtener la categoria',
                    success: false,
                    err: err,
                });
            });

    },


}