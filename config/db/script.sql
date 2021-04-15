DROP TABLE IF EXISTS suppliers CASCADE;

CREATE TABLE suppliers (
    supplierid bigserial NOT NULL PRIMARY KEY,
    companyname character varying(40) NOT NULL,
    contactname character varying(30) NOT NULL,
    contacttitle character varying(30),
    address character varying(60),
    city character varying(15),
    region character varying(15),
    postalcode character varying(10),
    country character varying(15),
    phone character varying(24),
    fax character varying(24),
    homepage text
);

DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
    categoryid bigserial NOT NULL PRIMARY KEY,
    categoryname character varying(15) NOT NULL,
    description text,
    picture oid
);

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
    productid bigserial NOT NULL PRIMARY KEY,
    productname character varying(40),
    supplierid integer NOT NULL,
    categoryid integer NOT NULL,
    quantityperunit character varying(20),
    unitprice double precision,
    unitsinstock smallint,
    unitsonorder smallint,
    reorderlevel smallint,
    discontinued boolean,
    FOREIGN KEY(supplierid) REFERENCES suppliers(supplierid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(categoryid) REFERENCES categories(categoryid) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS employees CASCADE;

CREATE TABLE employees (
    employeeid bigserial NOT NULL PRIMARY KEY,
    lastname character varying(20) NOT NULL,
    fistname character varying(10) NOT NULL,
    title character varying(30) NOT NULL,
    titleofcourtesy character varying(25),
    brithdate timestamp(0) null,
    hiredate timestamp(0) null,
    address character varying(60),
    city character varying(15),
    region character varying(15),
    postalcode character varying(10),
    homephone character varying(24),
    extension character varying(4),
    photo oid,
    notes text,
    reportsto integer NOT NULL,
    photopath character varying(255),
    FOREIGN KEY(reportsto) REFERENCES employees(employeeid) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS region CASCADE;

CREATE TABLE region (
    regionid bigint NOT NULL PRIMARY KEY,
    regiondescription character varying(50) NOT NULL
);

DROP TABLE IF EXISTS territories CASCADE;

CREATE TABLE territories (
    territoryid bigint NOT NULL PRIMARY KEY,
    territorydescription character varying(50) NOT NULL,
    regionid integer NOT NULL,
    FOREIGN KEY(regionid) REFERENCES region(regionid) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS employeeterritories CASCADE;

CREATE TABLE employeeterritories (
    employeeid integer NOT NULL,
    territoryid integer NOT NULL,
    PRIMARY KEY(employeeid, territoryid),
    FOREIGN KEY(employeeid) REFERENCES employees(employeeid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(territoryid) REFERENCES territories(territoryid) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS customerdemographics CASCADE;

CREATE TABLE customerdemographics (
    customertypeid character varying(10) NOT NULL PRIMARY KEY,
    customerdesc character varying(40) NOT NULL
);

DROP TABLE IF EXISTS customers CASCADE;

CREATE TABLE customers (
    customerid character varying(5) NOT NULL PRIMARY KEY,
    companyname character varying(40) NOT NULL,
    contactname character varying(30) NOT NULL,
    contacttitle character varying(30) NOT NULL,
    address character varying(60),
    city character varying(15),
    region character varying(15),
    postalcode character varying(10),
    country character varying(15),
    photo character varying(24),
    fax character varying(24)
);

DROP TABLE IF EXISTS customercustomerdemo CASCADE;

CREATE TABLE customercustomerdemo (
    customerid character varying(5) NOT NULL,
    customertypeid character varying(10) NOT NULL,
    PRIMARY KEY(customerid, customertypeid),
    FOREIGN KEY(customerid) REFERENCES customers(customerid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(customertypeid) REFERENCES customerdemographics(customertypeid) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS shippers CASCADE;

CREATE TABLE shippers (
    shipperid bigint NOT NULL PRIMARY KEY,
    companyname character varying(40) NOT NULL,
    phone character varying(24)
);

DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
    orderid bigserial NOT NULL PRIMARY KEY,
    customerid character varying(5) NOT NULL,
    employeeid integer NOT NULL,
    orderdate timestamp(0) null,
    requireddate timestamp(0) null,
    shippeddate timestamp(0) null,
    shipvia integer,
    freight double precision,
    shipname character varying(40),
    shipaddress character varying(60),
    shipcity character varying(15),
    shipregion character varying(15),
    shippostalode character varying(10) NOT NULL,
    shipcountry character varying(15) NOT NULL,
    FOREIGN KEY(customerid) REFERENCES customers(customerid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(employeeid) REFERENCES employees(employeeid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(shipvia) REFERENCES shippers(shipperid) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS orderdetails CASCADE;

CREATE TABLE orderdetails (
    orderid integer NOT NULL,
    productid integer NOT NULL,
    unitprice double precision NOT NULL,
    quantity smallint,
    discout double precision,
    PRIMARY KEY(orderid, productid),
    FOREIGN KEY(productid) REFERENCES products(productid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(orderid) REFERENCES orders(orderid) ON UPDATE CASCADE ON DELETE CASCADE
);