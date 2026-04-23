const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/////Mandatory Part Finishes Here////////////

let users = [];

// CREATE user (POST)
app.post('/users', (req, res) => {
    const user = req.body;

  
    user.id = users.length + 1;
    users.push(user);

    res.status(201).json({
        message: "User added",
        data: user
    });
});

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // update fields
    user.name = updatedData.name || user.name;
    user.age = updatedData.age || user.age;
    user.email = updatedData.email || user.email;
    res.json({ message: "User updated", data: user });
});

// DELETE
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = users.splice(index, 1);

    res.json({ message: "User deleted", data: deletedUser });
});