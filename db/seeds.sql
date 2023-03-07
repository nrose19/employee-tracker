USE employeeTracker_db;

INSERT INTO department(name)
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");


INSERT INTO roles(title, salary, department_id)
VALUES
    ("Salseperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Account Manager", 160000, 3),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);
    


INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
    ("Lily", "Campbell", 1, NULL),
    ("Nicole", "Cohen", 2, NULL),
    ("Josie", "VanTilburg", 3, 2),
    ("Emma", "Revelant", 4, NULL),
    ("Jeffery", "Willis", 5, 4),
    ("Niki", "Leshgold", 6, NULL),
    ("Judy", "Meddaugh", 7, 6),
    ("Claire", "Brunkow", 7, 6);