// // models/Skill.js
// import mongoose from 'mongoose';

// const skillSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, default: '' },
//   category: { type: String, default: '' },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // owner
//   isPublic: { type: Boolean, default: true } // if you want a public skillboard
// }, { timestamps: true });

// export default mongoose.model('Skill', skillSchema);

// import mongoose from 'mongoose';

// const skillSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, default: '' },
//   category: { type: String, default: '' },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   isPublic: { type: Boolean, default: true }
// }, { timestamps: true });

// export default mongoose.model('Skill', skillSchema);


// models/Skill.js
import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, default: '' }, // optional
  skill: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: String, default: '' },
  location: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);


