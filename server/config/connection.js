const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Locally', {
    
});

module.exports = mongoose.connection;
