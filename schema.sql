DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;

\c departments_db;

CREATE TABLE department_agg (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role_agg (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(30),
    salary DECIMAL,
    department INTEGER,
    FOREIGN KEY (department)
    REFERENCES department_agg(id)
    ON DELETE SET NULL
);

CREATE TABLE employee_agg(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role_agg(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee_agg(id)
    ON DELETE SET NULL
);