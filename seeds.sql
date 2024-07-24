INSERT INTO department_agg (name)
VALUES ('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role_agg (title, salary, department)
VALUES
('Sales Lead', 100000, 4),
('Salesperson', 80000, 4),
('Lead Engineer', 150000, 1),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3);

INSERT INTO employee_agg (first_name, last_name, role_id, title, salary, manager_id)
VALUES 
('John', 'Doe', 1, 'Sales Lead', 100000, 1),
('Mike', 'Chan', 2, 'Salesperson', 80000, 2),
('Ashley', 'Rodriguez', 3, 'Lead Engineer', 150000, 3),
('Kevin', 'Tupik', 4, 'Software Engineer', 120000, 4),
('Kunal', 'Singh', 5, 'Account Manager', 160000, 5),
('Malia', 'Brown', 6, 'Accountant', 125000, 6),
('Sarah', 'Lourd', 7, 'Legal Team Lead', 250000, 7),
('Tom', 'Allen', 8, 'Lawyer', 190000, 8);


