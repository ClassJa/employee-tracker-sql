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

CREATE TABLE employee_agg (
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


INSERT INTO department_agg (name)
VALUES ('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role_agg (id, title, salary, department)
VALUES
(1, 'Sales Lead', 100000, 4),
(2, 'Salesperson', 80000, 4),
(3, 'Lead Engineer', 150000, 1),
(4, 'Software Engineer', 120000, 1),
(5, 'Account Manager', 160000, 2),
(6, 'Accountant', 125000, 2),
(7, 'Legal Team Lead', 250000, 3),
(8, 'Lawyer', 190000, 3);

INSERT INTO employee_agg (first_name, last_name, role_id)
VALUES 
('John', 'Doe', 1),
('Mike', 'Chan', 2),
('Ashley', 'Rodriguez', 3),
('Kevin', 'Tupik', 4),
('Kunal', 'Singh', 5),
('Malia', 'Brown', 6),
('Sarah', 'Lourd', 7),
('Tom', 'Allen', 8);

-- , job_title, salary
