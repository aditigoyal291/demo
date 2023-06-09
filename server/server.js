require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

let users = [
    {
        id: '47c49246-6d3f-48d7-bce4-cdff4ff33899',
        name: 'John',
        email: 'john@example.com'
    },
    {
        id: 'a554bfb2-9a63-4261-af6b-c941b7b9a556',
        name: 'Ken',
        email: 'ken@example.com'
    },
]

app.get('/', (req, res)=> {
    console.log(path.join(__dirname, 'index.html'))
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/getAll', (req, res) => {
    res.json(users);
})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const user = users.filter(user => user.id === id);
    res.json(user)
})

app.post('/create', (req, res) => {
    const newUser = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email
    }
    users.push(newUser);
    console.log(users);
    res.sendStatus(201);
})

app.delete('/:id', function (req, res) {
    const id = req.params.id;
    const newUsers = users.filter(user => user.id !== id);
    users = newUsers;
    res.json(users);
});

app.patch('/:id', (req, res) => {
    const id = req.params.id;
    const newUsers = users.filter(user => user.id !== id);
    let updateUser = users.filter(user => user.id === id);
    updateUser = updateUser[0];

    console.log(updateUser);
    if('name' in req.body){
        console.log('name has to be updated');
        updateUser.name = req.body.name;
        
    }
    if('email' in req.body){
        console.log('email has to be updated')
        updateUser.email = req.body.email;
    }
    newUsers.push(updateUser);
    users = newUsers;
    console.log('updated user');
})


const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`server is running at ${port}`));