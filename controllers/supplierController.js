const Supplier = require('../models/supplier');



module.exports = {
    /**
      * @GET 
      * Obtiene la información de un proveedor
      */
    findById(req, res, next) {
        const id = req.params.id
        Supplier.findById(id)
            .then(data => {

                data = data.rows[0]
                console.log(data)
                let address = {}
                let dataFin = {}

                address = {
                    city: data.city,
                    country: data.country,
                    phone: data.phone,
                    postalCode: data.postalcode,
                    region: data.region,
                    street: data.address

                }

                dataFin = {
                    id: data.supplierid,
                    companyName: data.companyname,
                    CompanyName: data.Companyname,
                    contactName: data.contactname,
                    contactTitle: data.contacttitle,
                    address

                }

               return res.status(201).json(dataFin);
            })
            .catch(err => {
                console.log(err)
                return res.status(501).json({
                    message: 'Error al obtener el proveedor',
                    success: false,
                    err: err,
                });
            });

    },
    /**
     * @GET 
     *Obtiene la información de un proveedor con sus productos
     */

    findSupplierWithProducts(req, res, next) {
        const id = req.params.id
        let insert = 0
        let address = {}
        let dataFin = {}
        let product = {}
        let products = []

        Supplier.findSupplierWithProducts(id)
            .then(data => {
                datas = data.rows
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

                        id: data.productid,
                        productname: data.productname,
                        categoryID: data.categoryid,
                        categoryName: data.categoryname,
                    }

                    products.push(product)

                    if (insert == datas.length) {

                        dataFin = {
                            id: data.supplierid,
                            companyName: data.companyname,
                            contactName: data.contactname,
                            contactName: data.contactname,
                            contactTitle: data.contacttitle,
                            address,
                            products

                        }

                      return  res.status(201).json(dataFin);

                    }

                })

            })
            .catch(err => {
                console.log(err)
                return res.status(501).json({
                    message: 'Error al obtener el proveedor',
                    success: false,
                    err: err,
                });
            });

    },
    /**
        * @DELETE
        * Permite eliminar un proveedor
        */

    delete(req, res, next) {
        const id = req.params.id
        Supplier.delete(id)
        .then(()=>{

            return res.status(201).json({
                message: 'Se elimino exitosamente',
                success: true
            })
        })
        .catch((err)=>{
            return res.status(501).json({
                message: 'Error al eliminar el provvedor',
                success: false,
                err: err,
            });

        })

    }

}