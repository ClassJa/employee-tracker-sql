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
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee"]
        }
    ]


function init(questions){
    inquirer.prompt(questions)
}

init(questions)

function displayDepartments() {
    const tableName = 'department_agg'
    if(questions[0].choices === "View All Departments") {
        pool.query(`SELECT * FROM ${tableName}`, (err, {rows}) => {
            if (err) {
                console.error(err)
            }
            console.log({rows})
        })
        // Select * FROM department_agg
        // figure out how to get the table to be displayed
    }

}