// const inquirer = require('inquirer');
import inquirer from 'inquirer';
// const db = require('./db/index');
import db from './db/index.js';
import consoleTable from 'console.table';

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
            case 'Add Departmnet':
                addDepartment();
            break;
            case 'Add Role':
                addRole();
            break;
            case 'Add Employee':
                addEmployee();
            break;
            case 'Update Employee':
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
        consoleTable(employees)
    })
    .then(() => {
        mainMenu();
    })
}

function viewDepartments(){
    db.getAllDepartments()
    .then(([rows]) => {
        let department = rows
        consoleTable(department)
    })
    .then(() => {
        mainMenu();
    })
}

function viewRoles(){
    db.getAllRoles()
    .then(([rows]) => {
        let roles = rows
        consoleTable(roles)
    })
    .then(() => {
        mainMenu();
    })
}

function addDepartment(){
    db.addDepartment()
    .inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new Department?',
            name: 'addDepartment'
        }
    ])
    .then(() => {
        mainMenu();
    })
}


mainMenu();
