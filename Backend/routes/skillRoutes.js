// import express from 'express';
// import Skill from '../models/Skill.js';

// const router = express.Router();


// router.post('/', async (req, res) => { 
//   try {
//     const { title, description, category, user, isPublic } = req.body;

//     if (!title || !user) {
//       return res.status(400).json({ message: 'Title and User ID are required' });
//     }

//     const newSkill = new Skill({ title, description, category, user, isPublic });
//     await newSkill.save();

//     res.status(201).json(newSkill);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get all skills
// router.get('/', async (req, res) => {
//   try {
//     const skills = await Skill.find().populate('user', 'name email');
//     res.json(skills);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;


// routes/skills.js
import express from 'express';
import Skill from '../models/Skill.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

// import authMiddleware from '../middleware/authMiddleware.js';
// import { protect } from './middleware/authMiddleware.js';



const router = express.Router();


router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, skill, description, tags, location, user } = req.body;

    if (!skill || !description || !user) {
      return res.status(400).json({ message: 'Skill, description, and user are required' });
    }

    const newSkill = new Skill({
      name: name || '', // default empty if not provided
      skill,
      description,
      tags,
      location,
      user
    });

    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().populate('user', 'name email');
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

