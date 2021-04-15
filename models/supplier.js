const db = require('../config/config');


// OBJECT
const Supplier = {};
/**
 * @SELECT
 *Obtiene la información de un proveedor
 */
Supplier.findById = (id) => {
    console.log('D',id)
    const sql = `
        SELECT 
        
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
            S.supplierid
        FROM
            suppliers AS S
        WHERE 
            S.supplierid = $1
                   
    
       
    `
    return db.query(sql, [id]);
}



/**
 * @SELECT
 *Obtiene la información de un proveedor con sus productos
 */
 Supplier.findSupplierWithProducts = (id) => {
    const sql = `
        SELECT 
            P.productid,
            P.productName,
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
            C.categoryName
        
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
            S.supplierid = $1
     
    `
    return db.query(sql, [id]);
},
/**
 * @DELETE
 * Permite eliminar un proveedor
 */
 Supplier.delete = (id) => {
    const sql = ` 
    DELETE
        FROM 
            suppliers
    WHERE 
        supplierid = $1
    `;
    return db.query(sql, [id]);

}

module.exports = Supplier;