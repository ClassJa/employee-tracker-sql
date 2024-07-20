DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;

\c departments_db;

CREATE TABLE department_agg (
    id SERIAL,
    name VARCHAR(30) PRIMARY KEY
);

CREATE TABLE role_agg (
    id SERIAL, 
    title VARCHAR(30) PRIMARY KEY,
    salary DECIMAL,
    department INTEGER 
);

CREATE TABLE employee_agg(
    id SERIAL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (manager_id)
    REFERENCES employee_agg(id)
);