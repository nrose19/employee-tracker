// const connection = require('./connection');
import connection from './connection.js';

class DB {
    constructor(connection){
        this.connection = connection
    };
    getAllEmployees(){
        return this.connection.promise().query(
            "SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.name as department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager from employees left join roles on employees.role_id = roles.id left join department on roles.department_id = department.id left join employees manager on manager.id = employees.manager_id;"
        )
    };
    addEmployee(employee){
        return this.connection.promise().query(
            "INSERT INTO employees SET ?", employee
        )
    };
    updateEmployeeRole(employeeId, roleId){
        return this.connection.promise().query(
            "UPDATE employees SET role_id = ? WHERE id = ?", [roleId, employeeId]
        )
    };
    getAllDepartments(){
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        )
    };
    getAllRoles(){
        return this.connection.promise().query(
            "SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles left join department ON roles.department_id = department.id;"
        )
    };
}

export default new DB(connection);