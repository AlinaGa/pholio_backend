const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    filenumber: Number,
    
    date: { type: Date, default: Date.now },
    selected: { type: Boolean, default: false },
    // 
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;