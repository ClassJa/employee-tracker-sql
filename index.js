const inquirer = require('inquirer')
// const pg = require("postgres")
const { Pool } = require('pg') 
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
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Quit"]
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
        console.log(response)
    })

}

init()

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
        // Select * FROM department_agg
        // figure out how to get the table to be displayed
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