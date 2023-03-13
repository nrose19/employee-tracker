// const inquirer = require('inquirer');
import inquirer from 'inquirer';
// const db = require('./db/index');
import db from './db/index.js';
import 'console.table';
import connection from './db/connection.js';
import sql from 'mysql2';
import util from 'util';

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: ['View all Employees', 'View all Departments', 'View all Roles', 'Add Role', 'Add Department', 'Add Employee', 'Update Employee Role', 'Exit'],
        }
    ]).then(res => {
        let selection = res.selection;
        switch(selection){
            case 'View all Employees':
                viewEmployees();
            break;
            case 'View all Departments':
                viewDepartments();
            break;
            case 'View all Roles':
                viewRoles();
            break;
            case 'Add Department':
                addDepartment();
            break;
            case 'Add Role':
                addRole();
            break;
            case 'Add Employee':
                addEmployee();
            break;
            case 'Update Employee Role':
                updateEmployee();
            break;
            case "I'm Done":
                console.log("Thank you!");
                process.exit();
        }
    })
}

function viewEmployees(){
    db.getAllEmployees()
    .then(([rows]) => {
        let employees = rows
        console.table(employees)
    })
    .then(() => {
        mainMenu();
    })
}

function viewDepartments(){
    db.getAllDepartments()
    .then(([rows]) => {
        let department = rows
        console.table(department)
    })
    .then(() => {
        mainMenu();
    })
}

function viewRoles(){
    db.getAllRoles()
    .then(([rows]) => {
        let roles = rows
        console.table(roles)
    })
    .then(() => {
        mainMenu();
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the name of the new Department?',
        }
    ]).then((response) => {
        connection.query(`INSERT INTO department SET ?`,
        {
            name: response.newDept,
        },
        (err, res) => {
            if (err) throw err;
            console.log(response.newDept + " department added!");
            mainMenu();
        })
    })
};

function addRole(){
    db.getAllDepartments()
    .then(([rows]) => {
        let departments = rows
        let deptChoices = departments.map(({id, name}) => ({
            name: name,
            value: id,
        }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role you wish to add?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of this new role?',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does this role belong to?',
                choices: deptChoices,
            },
        ]).then(role => {
            db.addRole(role)
            .then(() => console.log(`Added ${role.title} to the database.`))
            .then(() => mainMenu())
        }) 
    })

    };

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter employee first name: ',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter employee last name: ',
        },
    ]).then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
        db.getAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({id, title}) => ({
                name: title,
                value: id,
            }))
            inquirer.prompt([
                {
                     type: 'list',
                     name: 'roleId',
                     message: "Enter employee's role: " ,
                     choices: roleChoices,
                },
            ])
            .then(res => {
                let roleId = res.roleId;
                db.getAllEmployees()
                .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({id, first_name, last_name}) => ({
                        name: `${first_name} ${last_name}`,
                        value: id,
                    }))
                    managerChoices.unshift({name: 'none', value: null })
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'managerId',
                        message: "Who is this employee's manager? " ,
                        choices: managerChoices,
                    },
                ])
                .then(res => {
                    let employee = {
                        manager_id: res.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName,
                    }
                    db.addEmployee(employee)
                })
                .then(() => console.log(`Added ${firstName} ${lastName} to the database.`))
                .then(() => mainMenu())
                })
            })
        })
    })
};

function updateEmployee() {
    db.getAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Which employees role do you wish to update?',
                choices: employeeChoices,
            },
        ])
        .then(res => {
            let employeeId = res.employeeId;
            db.getAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({id, title}) => ({
                    name: title,
                    value: id,
                }))
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Which role do you wish to assign this employee?',
                    choices: roleChoices,
                }
            ])
            .then(res => db.updateEmployeeRole(employeeId, res.roleId))
            .then(() => console.log(`Updated employees role`))
            .then(() => mainMenu())
            })
        })
    })
};


mainMenu();
