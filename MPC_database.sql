create database MPC;
use MPC;
create table rols(
id int PRIMARY KEY NOT NULL,
rol varchar(50)
);
create table users(
id int PRIMARY KEY NOT NULL,
uName varchar(50),
lastname varchar(50),
userName varchar(50),
email varchar(50),
cell int,
uPassword varchar(50),
avatar varchar(30),
rolId int, 
FOREIGN KEY(rolId) REFERENCES rols(id)
);

create table numbersOfInstallments(
id int PRIMARY KEY NOT NULL,
numbersOfInstallment int
);

create table categories(
id int PRIMARY KEY NOT NULL,
categories varchar(50)
);

create table sections(
id int PRIMARY KEY NOT NULL,
sections varchar(50)
);

create table products(
id int PRIMARY KEY NOT NULL,
pName varchar(50),
description varchar(50),
duesId int,
price int,
img varchar(30),
visibility boolean,
stcok int,
stockMin int,
stcokMax int,
sectionId int,
categoryId int,
FOREIGN KEY(duesId) REFERENCES numbersOfInstallments(id),
FOREIGN KEY(sectionId) REFERENCES categories(id),
FOREIGN KEY(categoryId) REFERENCES sections(id)
);
