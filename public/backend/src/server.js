// ./server.js
const express = require('express');
console.log(require.resolve('./firebase'));
const { db } = require('./firebase');
const bodyParser = require('body-parser');
const reminderRoutes = require('./routes/reminders');
const habitRoutes = require("./routes/habitRoutes");


const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) =>{
  res.send('Reminders API is working!');
});

app.use('/api/reminders', reminderRoutes); // Reminders Feature
app.use("/api/habits", habitRoutes); // Habit Feature


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
