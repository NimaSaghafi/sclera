
const mongoose = require('mongoose');
const config   = require("../config/database");

// Message Schema
const ChatMessageSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	}}, { capped: { size:250000 } });

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
