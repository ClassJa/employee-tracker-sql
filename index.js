const inquirer = require('inquirer')
const { type } = require('os')
const { Pool } = require('pg') 
const { exit } = require('process')




const pool = new Pool(
    {
        user: '',
        password: '',
        host: 'localhost',
        database: 'departments_db'
    },
    console.log("Connected to the departments_db database: ")
)



pool.connect()

const DisplayDepartments = "View All Departments"
const DisplayRoles = "View All Roles"
const DisplayEmployees = "View All Employees"
const AddDepartment = "Add Department"
const AddRole = "Add Role"
const AddEmployee = "Add Employee"
const EndProgram =  "Exit Program"
const UpdateEmployee = "Update Employee Information"

const questions = [
        {
            message: "What would you like to do?",
            type: "list",
            name: "selection1",
            choices: [DisplayDepartments, DisplayRoles, DisplayEmployees, AddDepartment, AddRole, AddEmployee, UpdateEmployee, EndProgram]
        }
    ]

function init(){
    // asks main prompts continuously
    inquirer.prompt(questions).then((response) => {
        switch (response.selection1) {
            case DisplayDepartments:
                displayDepartments(response)
            break;
            case DisplayRoles:
                displayRoles(response)
            break;
            case DisplayEmployees:
                displayEmployees(response)
            break;
            case AddDepartment:
                 addNewDepartment()
            break;
            case AddRole:
                addNewRole()
            break;
            case AddEmployee:
                addNewEmployee()
            break;
            case UpdateEmployee:
                updateEmployeeInfo()
                break;
            case EndProgram:
                exitProgram()
                break;
        }
    })
}


function displayDepartments(arg1) {
    const tableName = 'department_agg'
        pool.query(`SELECT * FROM ${tableName}`, (err, {rows}) => {
            if (err) {
                console.error(err)
            }
            console.table(rows)
            init()
        })
    }


function displayRoles(arg1) {
    const tableName = 'role_agg'
    if(arg1.selection1 === DisplayRoles) {
        pool.query(`SELECT * FROM ${tableName}`, (err, {rows}) => {
            if(err) {
                console.error(err)
            } 
            console.table(rows)
            init()
        })
    }
}

function displayEmployees(arg1) {
    const tableName = 'employee_agg'
    if(arg1.selection1 === DisplayEmployees) {
        pool.query(`SELECT * FROM ${tableName}`, (err, {rows}) => {
            if(err) {
                console.error(err)
            }
            console.table(rows)
            init()
        })
    }
}

 function addNewDepartment(){
    const tableName = 'department_agg'
    const question = [
        {
            message: "What is the name of the department you want to add?",
            name: "addedDepartment"
        }
    ]

    inquirer.prompt(question)
    .then(({addedDepartment}) => {
        pool.query(`INSERT INTO ${tableName} (name) VALUES ('${addedDepartment}')`)
        .then(() => {
            console.log("Department added!")
            init()
        })
        })
    }
    

function addNewRole(){
    const tableName = 'role_agg'
    pool.query(`SELECT id AS value, name FROM department_agg`)
    .then(({rows}) => {
        console.log(rows)
    const question = [
        {
            message: "What is the name of the role you want to add?",
            name: "addedRole"
        },
        {
            message: "What is the salary of the role you want to add?",
            name: "addedSalary"
        },
        {
            message: "What is the department of the role you want to add?",
            name: "addedRoleDepartment",
            type: "list",
            choices: rows
            
        }
    ]
    inquirer.prompt(question)
    .then(({addedRole, addedSalary, addedRoleDepartment}) => {
        pool.query(`INSERT INTO ${tableName} (title, salary, department) VALUES ($1, $2, $3)`, [addedRole, addedSalary, addedRoleDepartment])
    })
    .then(() => {
        console.log("Role Added!")
        init()
    })
})
}


function addNewEmployee(){
    const tableName = 'employee_agg' 
    pool.query(`SELECT name AS value, id FROM department_agg`)
    .then(({rows}) => {
    console.log(rows)
    const question = [
        {
            message: "What is the first name of the employee you want to add?",
            name: "firstName"
        },
        {
            message: "What is the last name of the employee you want to add?",
            name: "lastName"
        },
        {
            message: "What is the role id of the employee you want to add?",
            name: "roleId"
        }
    ]
    inquirer.prompt(question)
    .then(({firstName, lastName, roleId}) => {
        pool.query(`INSERT INTO ${tableName} (first_name, last_name, role_id) VALUES ($1, $2, $3)`, [firstName, lastName, roleId])
    })
    .then(() => {
        console.log("Employee Added!")
        init()
    })
    }
)}

    function updateEmployeeInfo(){
        pool.query(`SELECT first_name, last_name, id FROM employee_agg`)
        .then(({rows}) => {
            const employeeList = rows.map(({first_name, last_name, id})  => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))
        const questions = [
            {
                message: "Which employee would you like to update the role for?",
                name: "updateEmployee", 
                type: "list", 
                choices: employeeList,
            }
        ]
        inquirer.prompt(questions)
        .then((employee) => {
            pool.query(`SELECT * FROM role_agg`)
            .then(({rows}) => {
                const rolesList = rows.map(({title, id})  => ({
                    name: title,
                    value: id
                }))
            const roleChange = [
                {
                    message: "What role would you like to change this employee to?",
                    name: "updatedRole", 
                    type: "list", 
                    choices: rolesList,
                }
            ]
            inquirer.prompt(roleChange)
            .then((roleIdChange) => {
                pool.query(`UPDATE employee_agg SET role_id = $2 WHERE id = $1`, [roleIdChange.updatedRole, employee.updateEmployee])
                console.log("Employee information updated")
                init()
            })
        })
        return employee
    })
})
}


function exitProgram() {
    process.exit(0)
}

init()