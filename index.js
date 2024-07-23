const inquirer = require('inquirer')
const { type } = require('os')
// const pg = require("postgres")
const { Pool } = require('pg') 
const { exit } = require('process')
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
// why won't this work?


pool.connect()

const allDepartments = "View All Departments"
const allRoles = "View All Roles"
const allEmployees = "View All Employees"
const addDepartment = "Add Department"
const addRole = "Add Role"
const addEmployee = "Add Employee"
const quitProgram =  "Exit Program"

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
        // add switch statement, running specififc functions on user input 
        displayDepartments(response)
        displayRoles(response)
        displayEmployees(response)
        addNewDepartment(response)
        addNewRole(response)
        addNewEmployee(response)
        exitProgram(response)
        console.log(response)
    })
}


function displayDepartments(arg1) {
    const tableName = 'department_agg'
    if(arg1.selection1 === allDepartments) {
        pool.query(`SELECT * FROM ${tableName}`, (err, {rows}) => {
            if (err) {
                console.error(err)
            }
            console.table(rows)
            init()
        })
    }
}

function displayRoles(arg1) {
    const tableName = 'role_agg'
    if(arg1.selection1 === allRoles) {
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
    if(arg1.selection1 === allEmployees) {
        pool.query(`SELECT * FROM ${tableName}`, (err, {rows}) => {
            if(err) {
                console.error(err)
            }
            console.table(rows)
            init()
        })
    }
}

function addNewDepartment(arg1){
    const tableName = 'department_agg'
    if(arg1.selection1 === addDepartment) {
        inquirer.prompt([
            {
            message: "What is the name of the department you want to add?",
            name: "addedDepartment",
            type: "input"
        }
    ]).then((response) => {
 // Debug why the prompt is being invoked
 pool.query(`INSERT INTO ${tableName} (name) VALUES ('${response}')`, (err, {rows, fields}) => {
    if(err){
        console.error(err)
    } else {
        console.table(rows)
        console.log(arg1.addedDepartment)
        console.log(response)
        console.log("Department added!", rows)
    }
})
})
}
}




function addNewRole(arg1){
    const tableName = 'role_agg'
    console.log(arg1)
    if(arg1 === addRole) {
        pool.query(`INSERT INTO ${tableName}`, (err) => {
        })
    }
}

function addNewEmployee(arg1){
    const tableName = 'employee_agg' 
    if(arg1 === addEmployee) {
        pool.query(`INSERT INTO ${tableName}`, (err) => {
        })
    }
}

// Debug this
function exitProgram(arg1) {
    if(arg1 === quitProgram) {
        exit(0)
        // process.exit("Program Exited", 0)
    }
}

init()