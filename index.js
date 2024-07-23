const inquirer = require('inquirer')
const { type } = require('os')
// const pg = require("postgres")
const { Pool } = require('pg') 
const { exit } = require('process')
// const pool = require('./config')
// const tables = require('')



const pool = new Pool(
    {
        user: '',
        password: '',
        host: 'localhost',
        database: 'departments_db'
    },
    console.log("Connected to the departments_db database: ")
    // , pool.database
)



pool.connect()

const DisplayDepartments = "View All Departments"
const DisplayRoles = "View All Roles"
const DisplayEmployees = "View All Employees"
const AddDepartment = "Add Department"
const AddRole = "Add Role"
const AddEmployee = "Add Employee"
const EndProgram =  "Exit Program"

const questions = [
        {
            message: "What would you like to do?",
            type: "list",
            name: "selection1",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Exit Program"]
        }
    ]
// have the quit be the default base case of the switch statements 

function init(){
    // asks main prompts continuously
    inquirer.prompt(questions).then((response) => {
        switch (response.action) {
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
            case EndProgram:
                exitProgram()
                break;
        }
        // add switch statement, running specififc functions on user input 
        // displayDepartments(response)
        // displayRoles(response)
        // displayEmployees(response)
        // addNewDepartment()
        // addNewRole()
        // addNewEmployee()
        // exitProgram()
        // console.log({response})
    })
}


function displayDepartments(arg1) {
    const tableName = 'department_agg'
    if(arg1.selection1 === DisplayDepartments) {
        pool.query(`SELECT * FROM ${tableName}`, (err, {rows}) => {
            if (err) {
                console.error(err)
            }
            console.table(rows)
            // init()
        })
    }
}

function displayRoles(arg1) {
    const tableName = 'role_agg'
    if(arg1.selection1 === DisplayRoles) {
        pool.query(`SELECT * FROM ${tableName}`, (err, {rows}) => {
            if(err) {
                console.error(err)
            } 
            console.table(rows)
            // init()
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
            // init()
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
            // init()
        })
        })
    }
    

function addNewRole(){
    const tableName = 'role_agg'
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
            name: "addedRoleDepartment"
        }
    ]
    inquirer.prompt(question)
    .then(({addedRole}) => {
        pool.query(`INSERT INTO ${tableName} (title, salary, department) VALUES ('${addedRole}, ')`)
    })
    .then(() => {
        console.log("Role Added!")
        // init()
    })
}

function addNewEmployee(){
    const tableName = 'employee_agg' 
    
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
    .then(({addedEmployee}) => {
        pool.query(`INSERT INTO ${tableName} (first_name, last_name, role_id) VALUES ('${addedEmployee.firstName}, ${addedEmployee.lastName}, ${addedEmployee.roleId}')`)
    })
    .then(() => {
        console.log("Employee Added!")
        // init()
    })
    }

// Debug this
function exitProgram(arg1) {
    if(arg1 === quitProgram) {
        exit(0)
        // process.exit("Program Exited", 0)
    }
}

init()