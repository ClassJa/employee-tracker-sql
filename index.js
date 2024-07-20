const inquirer = require('inquirer')

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