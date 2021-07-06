/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Date: 3/ 7/ 2021
 * 
 * Connecting MongoDB to our App.
*/
// Require the mongoose library
const mongoose = require('mongoose');

module.exports = {
    connect: DB_HOST => {
        // 1. use the Mongo driver's updated URL string parser
        mongoose.set('useNewUrlParser', true);
        // 2. use findOneAndUpdate() in place of findAndModify()
        mongoose.set('useFindAndModify', false);
        // 3. use createAndUpdate() in place of ensureIndex()
        mongoose.set('useCreateIndex', true);
        // 4. use the new server discovery and monitoring engine
        mongoose.set('useUnifiedTopology', true);
        // 5. Connect to the DB
        mongoose.connect(DB_HOST);
        // 6. Log an error if we fail to connect
        mongoose.connection.on('error', err => {
            console.error(err);
            console.log(
                'MongoDB connection error. Please make sure MongoDB is running.'
            );
            process.exit();
        })
    },

    close: () => {
        mongoose.connection.close();
    }
};