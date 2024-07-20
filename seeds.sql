INSERT INTO department_agg (id, name)
VALUES 
('Engineering');
('Finance');
('Legal');
('Sales');

INSERT INTO role_agg (id, title, salary, department)
VALUES
('Sales Lead', 100000, 'Sales');
('Salesperson', 80000, 'Sales');
('Lead Engineer', 150000, 'Engineering');
('Software Engineer', 120000, 'Engineering');
('Account Manager', 160000, 'Finance');
('Accountant', 125000, 'Finance');
('Legal Team Lead', 250000, 'Legal');
('Lawyer', 190000, 'Legal');

INSERT INTO employee_agg (id, first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', ??, ??)