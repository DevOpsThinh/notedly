
/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * Created At: 4/ 7/ 2021
 * 
 * Helper library: Gravatar utility
*/

/**
 * Take in an email and generate a Gravatar url
 * https://gravatar.com/site/implement/
*/

// Import the md5 package
const md5 = require('md5');
// Define the gravatar utility
const gravatar = (email) => {
    const hash = md5(email);
    return `https://www.gravatar.com/avatar/${hash}.jpg?d=identicon`;
};

module.exports = gravatar;