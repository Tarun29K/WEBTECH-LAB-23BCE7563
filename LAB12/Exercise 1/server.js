const express = require('express');
const app = express();
const PORT = 3000;

//middlewware for json parsing
app.use(express.json());

//db
let users = [
    { id: 1, name: 'Tarun' },
    { id: 2, name: 'Kumar' }
];

//GET
app.get('/api/users', (req, res) => {
    res.json(users);
});

//GET by id
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');
    res.json(user);
});

//POST
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

//PUT
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');

    user.name = req.body.name;
    res.json(user);
});

//DELETE
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found.');

    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
});

//server
app.listen(PORT, () => {
    console.log(`REST API running at http://localhost:${PORT}/api/users`);
});