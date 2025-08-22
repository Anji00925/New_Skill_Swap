import express from 'express';
import Connection from '../models/Connection.js';

const router = express.Router();

// Send connection request
router.post('/request', async (req, res) => {
  const { requesterId, recipientId } = req.body;

  if (!requesterId || !recipientId) {
    return res.status(400).json({ message: 'Both requester and recipient are required.' });
  }

  try {
    const existing = await Connection.findOne({ requester: requesterId, recipient: recipientId });
    if (existing) {
      return res.status(400).json({ message: 'Request already sent.' });
    }

    const connection = new Connection({ requester: requesterId, recipient: recipientId });
    await connection.save();

    res.status(201).json({ message: 'Connection request sent.', connection });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept request
router.put('/accept/:id', async (req, res) => {
  try {
    const connection = await Connection.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted' },
      { new: true }
    );
    res.json({ message: 'Connection accepted.', connection });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject request
router.put('/reject/:id', async (req, res) => {
  try {
    const connection = await Connection.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.json({ message: 'Connection rejected.', connection });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all accepted connections for a user
router.get('/:userId', async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [
        { requester: req.params.userId, status: 'accepted' },
        { recipient: req.params.userId, status: 'accepted' }
      ]
    }).populate('requester recipient', 'username email');
    
    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
