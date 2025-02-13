// src/routes/reminders.js

const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

router.post('/', (req, res) => {
  const { title, description, date } = req.body;

  //save reminders
  db.collection('reminders')
    .add({
      title,
      description,
      date,
    })
    .then(() => {
      res.status(201).send({ message: 'reminder saved successfully!'});
    })
    .catch((error) => {
      res.status(500).send({ message: 'error saving reminder', error});
    
});
});

//fetch reminders
router.get('/', (req, res) => {
  db.collection('reminders')
  .get()
  .then((snapshot) => {
    if (snapshot.empty) {
      return res.status(404).send({ message: 'no reminders found!'});
    }
    const reminders =[];
    snapshot.forEach((doc) => reminders.push({ id: doc.id, ...doc.data() }));
    res.status(200).send(reminders);
  })
  .catch((error) =>{
    res.status(500).send({ message: 'error fetching reminders', error});
  });
});

module.exports = router;
