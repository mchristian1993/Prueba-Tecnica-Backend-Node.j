const Product = require('../models/product');



module.exports = {
    /**
      * @GET 
      * BUSCAR PRODUCTO
      */
    search(req, res, next) {
        const nombre = req.query.nombre;
console.log(nombre)
        Product.search(nombre)
            .then(data => {

                datas = data.rows
                let category = {}
                let dataEnd = []
                let address = {}

                let insert = 0
                datas.forEach((data) => {
                    insert++
                    category = {
                        description: data.description,
                        id: data.categoryid,
                        name: data.categoryname,
                        picture: data.picture

                    }

                    address = {
                        city: data.city,
                        country: data.country,
                        phone: data.phone,
                        postalCode: data.postalcode,
                        region: data.region,
                        street: data.address

                    }

                    dataEnd.push({
                        discontinued: data.discontinued,
                        id: data.productid,
                        productname: data.productname,
                        quantityPerUnit: data.quantityperunit,
                        reorderLevel: data.reorderlevel,
                        unitPrice: data.unitprice,
                        unitsInStock: data.unitsinstock,
                        unitsOnOrder: data.unitsonorder,
                        category: category,
                        supplier: {
                            companyName: data.companyname,
                            contactName: data.contactname,
                            contactTitle: data.contacttitle,
                            id: data.supplierid,
                            address: address
                        }

                    })

                    if (insert == datas.length) {
console.log(dataEnd)
                      return  res.status(201).json(dataEnd);

                    }

                })



            })
            .catch(err => {
        console.log(err)
                return res.status(501).json({
                    message: 'No se pudo obtener el producto',
                    success: false,
                    err: err,
                });
            });

    },
    /**
     * @GET 
     * OBTENER  PRODUCTO POR ID DE PRODUCTO
     */
    findById(req, res, next) {
        const id = req.params.id;
        Product.findById(id)
            .then(data => {
                data = data.rows[0]
                let category = {}
                let dataEnd = []
                let address = {}

                category = {
                    description: data.description,
                    id: data.categoryid,
                    name: data.categoryname,
                    picture: data.picture

                }

                address = {
                    city: data.city,
                    country: data.country,
                    phone: data.phone,
                    postalCode: data.postalcode,
                    region: data.region,
                    street: data.address

                }

                dataEnd.push({
                    discontinued: data.discontinued,
                    id: data.productid,
                    productname: data.productname,
                    quantityPerUnit: data.quantityperunit,
                    reorderLevel: data.reorderlevel,
                    unitPrice: data.unitprice,
                    unitsInStock: data.unitsinstock,
                    unitsOnOrder: data.unitsonorder,
                    category: category,
                    supplier: {
                        companyName: data.companyname,
                        contactName: data.contactname,
                        contactTitle: data.contacttitle,
                        id: data.supplierid,
                        address: address
                    }

                })

            

                return res.status(201).json(dataEnd[0]);
            })
            .catch(err => {
            console.log(err)
                return res.status(501).json({
                    message: 'No se pudo obtener el producto',
                    success: false,
                    err: err,
                });
            });

    },
    /**
       * @POST
       * CREAR NUEVO PRODUCTO
       */
    create(req, res, next) {
        const product = req.body;
        Product.create(product)
            .then(() => {
                res.status(201).json({
                    message: 'El producto se creo con exito',
                    success: true,

                });
            })
            .catch(err => {
               console.log(err)
                return res.status(501).json({
                    message: 'Error al crear el producto',
                    success: false,
                    err: err,
                });
            });

    },
    /**
    * @PUT
    * ACTUALIZAR UN PRODUCTO EN LA BASE DE DATOS
    */
    async update(req, res, next) {
        const id = req.params.id;
        const product = req.body;

        productUpdate = await Product.update(id, product)
            .catch(err => {
                console.log(err)
                return res.status(501).json({
                    message: 'Error al actualizar el producto',
                    success: false,
                    err: err,
                })
            });

        if (productUpdate) {
            return res.status(201).json({
                message: 'La actualizacion se realizo exitosamente',
                success: true
            })

        }



    },
}