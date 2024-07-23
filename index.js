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
        addDepartment(response)
        // addRole()
        // addEmployee()
        // quitProgram()
        console.log(response)
    })
}


function displayDepartments(arg1) {
    const tableName = 'department_agg'
    if(arg1.selection1 === "View All Departments") {
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
    if(arg1.selection1 === "View All Roles") {
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
    if(arg1.selection1 === "View All Employees") {
        pool.query(`SELECT * FROM ${tableName}`, (err, {rows}) => {
            if(err) {
                console.error(err)
            }
            console.table(rows)
            init()
        })
    }
}

function addDepartment(arg1){
    const tableName = 'department_agg'
    if(arg1.selection1 === "Add Department") {
        inquirer.prompt([
            {
            message: "What is the name of the department you want to add?",
            name: "addedDepartment",
            type: "input",
        }
    ]).then(
        // Debug why the prompt is being invoked
        pool.query(`INSERT INTO ${tableName} (name) VALUES ('${arg1.addedDepartment}')`, (err, {rows}) => {
            if(err){
                console.error(err)
            } else {
                console.log(arg1.addedDepartment)
                console.log("Department added!", rows)
            }
        }))
    }
}


function addRole(arg1){
    const tableName = 'role_agg'
    if(arg1.selection1 === "Add Role") {
        pool.query(`INSERT INTO ${tableName}`, (err) => {

        })
    }
}

function addEmployee(arg1){
    const tableName = 'employee_agg' 
    if(arg1.selection1 === "Add Employee") {
        pool.query(`INSERT INTO ${tableName}`, (err) => {

        })
    }
}

// Debug this
function quitProgram(arg1) {
    if(arg1.selection1 === "Exit Program") {
        exit(0)
        // process.exit("Program Exited", 0)
    }
}

init()