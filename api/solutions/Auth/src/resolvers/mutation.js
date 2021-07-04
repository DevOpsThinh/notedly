/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 * 
 * Created At: 3/ 7/ 2021
 * Updated At: 4/ 7/ 2021: Importing third-party and utilities
 * 
 * Our mutations resolver
*/

///------------------------------------------------------------///
///               Third-party & Utilities                     ///
///----------------------------------------------------------///
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const gravatar = require('../util/gravatar');

///------------------------------------------------------------///
///               Mutations Resolver                          ///
///----------------------------------------------------------///
module.exports = {
    newNote: async (parent, args, {models}) => {
        return await models.Note.create({
            content: args.content,
            author: 'Truong Thinh'
        });
    },
    deleteNote: async (parent, {id}, {models}) => {
        try {
            await models.Note.findOneAndRemove({ _id: id});
            return true;
        } catch (err) {
            return false;
        }
    },
    updateNote: async (parent, {content, id}, {models}) => {
        return await models.Note.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        );
    },
    signUp: async (parent, {username, email, password}, {models}) => {
        // Normalize email address
        email = email.trim().toLowerCase();
        // Hash the password
        const hashed = await bcrypt.hash(password, 10);
        // Create the gravatar url
        const avatar = gravatar(email);

        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            });

            // Create and return the JWT
            return jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        } catch (err) {
            console.log(err);

            // if there's a problem creating the account, throw an error
            throw new Error('Error creating account!');
        }
    },
    signIn: async (parent, {username, email, password}, {models}) => {
        if (email) {
            // Normalize email address
            email = email.trim().toLowerCase();
        }

        const user = await models.User.findOne({
            $or: [{email}, {username}]
        });

        // If no user is found, throw an authentication error
        if (!user) {
            throw new AuthenticationError('Error signing in!');
        }

        // If the password don't match, throw an authentication error
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('Error signing in!');
        }

        // Create and return the JWT
        return jwt.sign({id: user._id}, process.env.JWT_SECRET);
    },
}