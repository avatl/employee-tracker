var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "avalorusso",
    database: "employee_tracker"
});

connection.connect();
askQuestions();
function askQuestions() {
    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "Add employee",
            "Add department",
            "Add role",
            "Update employee role",
            "QUIT"
        ],
        name: "choice"
    }).then(answers => {

        console.log(answers.choice);
        switch (answers.choice) {

            case "View all employees":
                viewEmployees()
                break;

            case "View all departments":
                viewDepartments()
                break;

            case "View all roles":
                viewRole()
                break;

            case "Add employee":
                addEmployee()
                break;

            case "Add department":
                addDepartment()
                break;

            case "Add role":
                addRole()
                break;

            case "Update employee role":
                updateEmployeeRole();
                break;

            default:
                connection.end()
                break;
        }
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function viewRole() {
    connection.query("SELECT * FROM role", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function addEmployee() {
    inquirer.prompt([{
        message: "What is the employees first name?",
        type: "input",
        name: "firstName"
    },
    {
        message: "What is the employees last name?",
        type: "input",
        name: "lastName"
    },
    {
        message: "What is the employees role ID",
        type: "number",
        name: "roleId"
    },
    {
        message: "What is the employees manager's ID?",
        type: "number",
        name: "managerId"
    }
    ]).then(function (res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function (err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function addDepartment() {
    inquirer.prompt([{
        message: "What is the department that you want to add?",
        type: "input",
        name: "department"
    },]).then(function (res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function (err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            message: "Enter title:",
            type: "input",
            name: "title"
        }, {
            message: "Enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "Enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "Which employee would you like to update? (use first name only for now)",
            type: "input",
            name: "name"
        }, {
            message: "Enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })
}