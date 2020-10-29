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
initialQuestions();

async function initialQuestions() {

    let question = new Promise((resolve, reject) => {
        resolve(inquirer
            .prompt([
                {
                    name: "membersChoice",
                    type: "list",
                    message: "What would you like to do?",
                    choices: [
                        "View All Employees",
                        "View Team by Department",
                        "View Team by Manager",
                        "Add Employee",
                        "Remove Employee",
                        "Update Employee Role",
                        "Update Employee Manager"]
                }
            ])
        )
    });

    var answer = await question;
    if (answer.membersChoice === "View All Employees") {
        var query = "SELECT * FROM employee";
        connection.query(query, function (err, res) {
            if (err) throw err;
        })
    }

    if (answer.membersChoice === "View All By Department") {
        var query = "SELECT * FROM department";
        connection.query(query, function (err, res) {
            if (err) throw err;
        })
    }

    else if (answer.membersChoice === "View All By Manager") {
        var query = "SELECT * FROM employee";
        connection.query(query, function (err, res) {
            if (err) throw err;
        })
    }

    else if (answer.memberChoice === "Add Employee") {
        var query = "SELECT * FROM employee";
        connection.query(query, function (err, res) {
            if (err) throw err;
        })
    }
    
    else if (answer.memberChoice === "Add Employee") {
            let addEmployeeQ = new Promise((resolve, reject) => {
                resolve(inquirer.prompt([
                    {
                        name: "firstName",
                        type: "input",
                        message: "What is the first name of the employee you would like to add",
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "What is the last name of the employee you would like to add",
                    },
                    {
                        name: "employeeID",
                        type: "input",
                        message: "What is the employee ID for the employee you would like to add",
                    },
                    {
                        name: "employeeRoleID",
                        type: "input",
                        message: "What is the role ID for the employee you would like to add",
                    },
                    {
                        name: "employeeManagerID",
                        type: "input",
                        message: "What is the ID of the manager for the employee you would like to add",
                    },
                ])
                )
            });
            var addAnswer = await addEmployeeQ;
            connection.query(
                `INSERT INTO employee SET last_name = '${addAnswer.addEmployee}'`
            )
            // add a ? to this await ^
    
        }
    }
    if (answer.memberChoice === "Remove Employee") {
        let removeEmployeeQ = new Promise((resolve, reject) => {
            resolve(inquirer.prompt([
                {
                    name: "removeEmployee",
                    type: "input",
                    message: "Please type the last name of the employee you would like to remove",
                }
            ])
            )
        });
        var removeAnswer = await removeEmployeeQ;
        connection.query(
            `DELETE FROM employee WHERE last_name = '${removeAnswer.removeEmployee}'`
        )
        // add a ? to this await ^

    }
