const db = require('../config/config');


// OBJECT
const Product = {};
/**
 * @SELECT
 * BUSCAR  PRODUCTO
 */
Product.search = (nombre) => {

    nombre = '%' + nombre + '%' 

    const sql = `
        SELECT 
            P.productid,
            P.productName,
            P.quantityPerUnit,
            P.unitPrice,
            P.unitsinStock,
            P.unitsOnOrder,
            P.reorderLevel,
            P.discontinued,
            P.supplierid,
            S.companyName,
            S.contactName,
            S.contactTitle,
            S.address,
            S.city,
            S.region,
            S.postalCode,
            S.country,
            S.phone,
            S.fax,
            S.homePage,
            S.supplierid,
            C.categoryid,
            C.categoryName,
            C.description,
            C.picture
        FROM
            products AS P
        INNER JOIN
            suppliers AS S
        ON
            P.supplierID = S.supplierID 
        INNER JOIN
            categories AS C
        ON
            P.categoryID = C.categoryID

        WHERE
            P.productName
        ILIKE
            $1
    `
    return db.query(sql, [nombre]);
}
/**
 * @SELECT
 * OBTENER PRODUCTO POR ID DE PRODUCTO
 */
Product.findById = (id) => {
 
    const sql = `
        SELECT 
            P.productid,
            P.productName,
            P.quantityPerUnit,
            P.unitPrice,
            P.unitsinStock,
            P.unitsOnOrder,
            P.reorderLevel,
            P.discontinued,
            P.supplierid,
            S.companyName,
            S.contactName,
            S.contactTitle,
            S.address,
            S.city,
            S.region,
            S.postalCode,
            S.country,
            S.phone,
            S.fax,
            S.homePage,
            S.supplierid,
            C.categoryid,
            C.categoryName,
            C.description,
            C.picture
        FROM
            products AS P
        INNER JOIN
            suppliers AS S
        ON
            P.supplierID = S.supplierID 
        INNER JOIN
            categories AS C
        ON
            P.categoryID = C.categoryID
        
        WHERE
            p.productID =  $1
       
    `;
    return db.query(sql, [id]);
},

    /**
     * @CREATE
     * CREAR UN PRODUCTO NUEVO EN LA BASE DE DATOS
     */
    Product.create = (product) => {
        const query = ` 
    INSERT INTO 
        products(
            categoryid,
            discontinued,
            productname,
            quantityperunit,
            reorderlevel,
            supplierid,
            unitprice,
            unitsinstock,
            unitsonorder
        )
    VALUES 
        ($1, $2, LOWER($3), $4, $5, $6, $7, $8, $9) 
    `;
        return db.query(query, [
            product.categoryID,
            product.discontinued,
            product.productName,
            product.quantityPerUnit,
            product.reorderLevel,
            product.supplierID,
            product.unitPrice,
            product.unitsInStock,
            product.unitsOnOrder

        ])
    }

/**
 * @UPDATE
 * ACTUALIZAR UNA USUARIO  EN LA BASE DE DATOS
 */
Product.update = (id, product) => {
    console.log(id)
    const sql = `
            UPDATE
            products
                SET
                    categoryid      = $2, 
                    discontinued    = $3,
                    productname     = LOWER($4), 
                    quantityperunit = $5,
                    reorderlevel    = $6,
                    supplierid      = $7,
                    unitprice       = $8, 
                    unitsinstock    = $9,
                    unitsonorder    = $10
                WHERE 
                    productid       = $1
                `;
    return db.query(sql, [
        id,
        product.categoryID,
        product.discontinued,
        product.productName,
        product.quantityPerUnit,
        product.reorderLevel,
        product.supplierID,
        product.unitPrice,
        product.unitsInStock,
        product.unitsOnOrder

    ]);
}




module.exports = Product;