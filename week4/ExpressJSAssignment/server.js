const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// In-memory array to store users
let users = [];
let currentId = 1;

// GET /welcome
app.get('/welcome', (req, res) => {
    res.json({ message: 'Welcome to Express!' });
});

// GET /users - Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST /users - Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = { id: currentId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /users/:id - Update a user by ID
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
});

// DELETE /users/:id - Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

// Export the app object for testing
module.exports = app;

// Start the server only if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}