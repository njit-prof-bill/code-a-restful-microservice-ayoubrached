const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
const users = [];

app.param('id', function(req, res, next, id) {
    const user = users.find(u => u.id == id);
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    req.user = user;
    next();
  });

app.post('/users', (req, res) => {
    const user = {
        "name": req.body.name,
        "email": req.body.email,
        "id": Math.floor(Math.random() * 100)
    };
    users.push(user);
    console.log(user);
    res.status(201).send(user);
});

app.put('/users/:id', (req, res) => {
    const user = req.user;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.send(user);
});

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id == req.user.id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
    }
    res.status(204).send();
});

app.get('/users/:id', (req, res) => {
    res.send(req.user);
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}


module.exports = app; // Export the app for testing