// routes/admin.js
const express = require('express');
const Student = require('../models/student');
const authAdmin = require('../middleware/authadmin');
const router = express.Router();

// Protected admin route
router.get('/students', authAdmin, async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new student
router.post('/students', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        enrolledCourses: req.body.enrolledCourses || []
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit a student
router.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        student.name = req.body.name || student.name;
        student.email = req.body.email || student.email;
        student.age = req.body.age || student.age;

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a student
router.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        await student.deleteOne();
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
