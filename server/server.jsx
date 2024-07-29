require('dotenv').config();
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const router = express.Router();

const Todo = require('./models/Todo');

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())


const JWT_SECRET = process.env.JWT_SECRET;

app.post('/register', async (req, res) => {
    console.log('Request body:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ error: error.message });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, JWT_SECRET)
            res.status(200).json({ message: 'Login successful', token })
        } else {
            res.status(401).json({ error: 'Invaild email or password' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })

    }
})


mongoose.connect('mongodb://127.0.0.1:27017/Todos')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Update route to use plural 'todos'
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to fetch completed todos (you need to implement the logic)
app.get('/todos/completed', async (req, res) => {
    try {
        const completedTodos = await Todo.find({ completed: true });
        res.json(completedTodos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post('/todos', async (req, res) => {
    const { title, description, dateTime, deadline } = req.body;

    if (!title || !description || !deadline) {
        return res.status(400).json({ error: 'Title, description, and deadline are required' });
    }

    try {
        const newTodo = new Todo({
            title,
            description,
            dateTime,
            deadline
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.delete('/completed-todos/:id', async (req, res) => {
    const { id } = req.params;

    // try {
    //     const todo = await Todo.findById(id);

    //     if (!todo) {
    //         return res.status(404).json({ error: 'Todo not found' });
    //     }

    //     if (!todo.completed) {
    //         return res.status(400).json({ error: 'Todo is not completed' });
    //     }

    //     await Todo.findByIdAndDelete(id);
    //     res.status(200).json({ message: 'Completed todo deleted successfully' });
    // } catch (error) {
    //     res.status(500).json({ error: 'Internal server error' });
    // }
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, dateTime, deadline, completed } = req.body;

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        if (title !== undefined) {
            todo.title = title;
        }
        if (description !== undefined) {
            todo.description = description;
        }
        if (dateTime !== undefined) {
            todo.dateTime = dateTime;
        }
        if (deadline !== undefined) {
            todo.deadline = deadline;
        }
        if (completed !== undefined) {
            todo.completed = completed;
            if (completed) {
                todo.completedOn = new Date();
            } else {
                todo.completedOn = null;
            }
        }

        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Route to update a todo
app.patch('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { updated} = req.body;
  
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(id, { updated }, { new: true });
      if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  



    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })