const mongoose = require('mongoose');
const { Schema } = mongoose;

const createInitialPerformance = () => {
  const performance = new Map();
  const coordinates = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 1; j <= 8; j++) {
      const coord = String.fromCharCode(65 + i) + j; // A1, A2, ..., H8
      coordinates.push(coord);
    }
  }

  coordinates.forEach(coord => {
    performance.set(coord, 0);
  });

  return performance;
};

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  correctAnswers: { type: Number, default: 0 },
  incorrectAnswers: { type: Number, default: 0 },
  performance: {
    type: Map,
    of: Number,
    default: createInitialPerformance
  }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
