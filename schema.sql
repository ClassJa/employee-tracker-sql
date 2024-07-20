DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;

\c departments_db;

CREATE TABLE department_agg (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role_agg (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department INTEGER NOT NULL,
    FOREIGN KEY (department)
    REFERENCES department_agg(id)
    ON DELETE SET NULL
);

CREATE TABLE employee_agg(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER DEFAULT NULL,
    -- Is this correct?
    FOREIGN KEY (role_id)
    REFERENCES role_agg(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee_agg(id)
    ON DELETE SET NULL
);