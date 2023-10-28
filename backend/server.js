const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Enable All CORS Requests
app.use(cors());

mongoose.connect('mongodb://localhost:27017/students_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollno: Number
});

const Student = mongoose.model('Student', studentSchema);

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/create-student', async (req, res) => {
  const { name, email, rollno } = req.body;
  const newStudent = new Student({ name, email, rollno });
  await newStudent.save();
  res.json(newStudent);
});

app.put('/update-student/:id', async (req, res) => {
  const { name, email, rollno } = req.body;
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, { name, email, rollno }, { new: true });
  res.json(updatedStudent);
});

app.delete('/delete-student/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
