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

const app   = express();

const users = require('./routes/users');

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

// Index Route
app.get('/', (req, res) => {
    res.send('todo');
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
