const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const passport      = require('passport');
const mongoose      = require('mongoose');
const config        = require('./config/database');

// Connect to DB
mongoose.connect(config.database);

// On Connect to DB
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', () => {
    console.log('Database Error ' + err);
});

const app      = express();

const users    = require('./routes/users');
const messages = require('./routes/messages');

// Port #
const port  = 3000;

// CORS
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(bodyParser.json());

// Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);
app.use('/messages', messages);

// Index Route
app.get('/', (req, res) => {
    res.send('Loading...');
});

// Start Server
// app.listen(port, () => {
//     console.log('Server started on port ' + port);
// });
const server = require('http').Server(app);
server.listen(port, () => {
    console.log('Server Started on port ' + port);
});

// Socket.io
const socketio = require('socket.io');
const io = socketio(server);
io.on('connection', (socket) => { 
    console.log('new connection');

    socket.on('disconnect',() => {});

    socket.on('add-message', (msg) => {
        io.emit('message', {type:'new-message', text: msg});
    });
});

