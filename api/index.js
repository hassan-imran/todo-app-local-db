const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const fs = require("fs");


// Read data from DB

let dbData;

fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    dbData = JSON.parse(data);
});


// Create a new task for the signed in User

app.post("/api/action/newTask", (req, res) => {
    const userId = req.body.userName;
    dbData.users[userId].todo.push(req.body.task);
    let resObj = {
        userName: userId,
        firstName: dbData.users[userId].firstName,
        lastName: dbData.users[userId].lastName,
        todo: [],
    };
    resObj.todo = [...dbData.users[userId].todo];
    // res.send(resObj);

    fs.writeFile('./db.json', JSON.stringify(dbData), () => {
        res.send(resObj);
    });
})


// Delete the task

app.post("/api/action/deleteTask", (req, res) => {
    const userId = req.body.userName;
    const toDelete = req.body.task;
    const todos = dbData.users[userId].todo;

    let resObj = {
        userName: userId,
        firstName: dbData.users[userId].firstName,
        lastName: dbData.users[userId].lastName,
        todo: [],
    };

    let exists = false;

    todos.forEach(item => {
        if (item == toDelete) {
            exists = true
        }
    });

    if ((toDelete) && (exists)) {
        resObj.todo = todos.filter(item => item !== toDelete);
        dbData.users[userId].todo = resObj.todo;

        fs.writeFile('./db.json', JSON.stringify(dbData), () => {
            res.send(resObj);
        });
    } else {
        res.status(400).send("Task does not exist!");
    }

})


// Add a new user

app.post("/api/action/newUser", (req, res) => {

    const newUserName = req.body.userName;

    if (!dbData.users[newUserName]) {
        const userObj = req.body;
        const newUsers = dbData.users;
        newUsers[userObj.userName] = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            pass: req.body.pass,
            todo: [],
        }

        res.send(newUsers);

        fs.writeFile('./db.json', JSON.stringify(dbData), () => {
            console.log("User added successfully");
        });
    }
    else if (dbData.users[newUserName]) {
        res.status(400).send({
            message: "User Name already exists!",
        });
    }
})


// Authenticate the login

app.post("/api/auth/login", (req, res) => {
    const userName = req.body.userName;
    const pass = req.body.pass;

    if (dbData.users[userName].pass === pass) {
        const token = {
            userName: req.body.userName,
            firstName: dbData.users[userName].firstName,
            lastName: dbData.users[userName].lastName,
            todo: dbData.users[userName].todo,
        }
        res.status(200).send({
            message: "User logged in!",
            token
        })
    } else {
        res.status(400).send({
            message: "Password or Username incorrect",
        })
    }
})

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});