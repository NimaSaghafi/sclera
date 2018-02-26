
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
	}});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
