// /src/routes/habitRoutes.js
const express = require('express');
const router = express.Router();
const { db } = require('../firebase'); // Import Firebase configuration

// Add a new habit
router.post('/', (req, res) => {
  const { userId, habitName, frequency, target } = req.body;

  // Save habit to the database
  db.collection('habits')
    .add({
      userId,
      habitName,
      frequency,
      target,
    })
    .then(() => {
      res.status(201).send({ message: 'Habit saved successfully!' });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error saving habit', error });
    });
});

// Fetch habits for a specific user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  // Get habits for a specific user
  db.collection('habits')
    .where('userId', '==', userId)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return res.status(404).send({ message: 'No habits found for this user!' });
      }
      const habits = [];
      snapshot.forEach((doc) => habits.push({ id: doc.id, ...doc.data() }));
      res.status(200).send(habits);
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error fetching habits', error });
    });
});
// Update habit progress
router.patch('/:habitId/progress', async (req, res) => {
    const { habitId } = req.params;
    const { progress } = req.body;
  
    try {
      const habitRef = db.collection('habits').doc(habitId);
      const habitDoc = await habitRef.get();
  
      if (!habitDoc.exists) {
        return res.status(404).json({ message: 'Habit not found' });
      }
  
      const habitData = habitDoc.data();
      const currentProgress = habitData.progress || 0;
      const target = habitData.target;
  
      // Prevent progress from exceeding the target
      if (currentProgress >= target) {
        return res.status(400).json({ message: 'You have already reached your target for this habit.' });
      }
  
      const newProgress = currentProgress + progress;
      
      // Ensure the progress does not exceed the target
      if (newProgress > target) {
        return res.status(400).json({ message: 'Progress cannot exceed the target.' });
      }
  
      // Update progress and completion status
      const completed = newProgress >= target;
      await habitRef.update({
        progress: newProgress,
        completed,
      });
  
      // Send a message if the habit is completed
      if (completed) {
        return res.json({ message: 'Congratulations, you’ve reached your target!' });
      }
  
      res.json({ message: 'Habit progress updated successfully!' });
  
    } catch (error) {
      res.status(500).json({ message: 'Error updating habit progress', error });
    }
  });
  
 /* router.patch('/:habitId/progress', (req, res) => {
  const { habitId } = req.params;
  const { progress } = req.body;

  // Update the progress of a specific habit
  db.collection('habits')
    .doc(habitId)
    .update({
      progress,
    })
    .then(() => {
      res.status(200).send({ message: 'Habit progress updated successfully!' });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error updating habit progress', error });
    });
}); */

// Delete a habit
router.delete('/:habitId', (req, res) => {
  const { habitId } = req.params;

  // Delete a habit from the database
  db.collection('habits')
    .doc(habitId)
    .delete()
    .then(() => {
      res.status(200).send({ message: 'Habit deleted successfully!' });
    })
    .catch((error) => {
      res.status(500).send({ message: 'Error deleting habit', error });
    });
});

module.exports = router;
