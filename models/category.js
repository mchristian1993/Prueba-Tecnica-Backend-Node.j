const db = require('../config/config');


// OBJECT
const Category = {};
/**
 * @SELECT
 * Obtiene la información de una categoría, con sus productos asociados
 */
 Category.findById = (id, limit, offset) => {
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
            C.categoryID = $1
                   
        LIMIT
            $2
        OFFSET
            $3
       
    `
    return db.query(sql, [id,limit, offset]);
}



module.exports = Category;