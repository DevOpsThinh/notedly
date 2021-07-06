/**
 * Topic: Back-end Learning path
 * Subject: noSQL - Graph DB: GraphQL - Nodejs - Apollo Server Express - Mongoose library
 * Student name: Nguyễn Trường Thịnh
 * Thu Duc College Of Technology
 *
 * Created At: 3/ 7/ 2021
 * Updated At: 4/ 7/ 2021: Importing third-party and utilities
 * Updated At: 6/ 7/ 2021: Adding the users context; User permissions; Toggling Note favorites
 *
 * Our mutations resolver
 */

///------------------------------------------------------------///
///               Third-party & Utilities                     ///
///----------------------------------------------------------///
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
// Appropriately assign cross-referencing MongoDB object IDs to our fields.
const mongoose = require("mongoose");

require("dotenv").config();

const gravatar = require("../util/gravatar");

///------------------------------------------------------------///
///               Mutations Resolver                          ///
///----------------------------------------------------------///
module.exports = {
  newNote: async (parent, args, { models, user }) => {
    // If there is no user on the context, throw an authentication error
    if (!user) {
      throw new AuthenticationError("You must be signed in to create a note!");
    }

    return await models.Note.create({
      content: args.content,
      // Reference the author's mongo id
      author: mongoose.Types.ObjectId(user.id),
    });
  },
  deleteNote: async (parent, { id }, { models, user }) => {
    // If not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError("You must be signed in to delete a note!");
    }
    // Find the note
    const note = await models.Note.findById(id);
    // If the note owner and current user don't match, throw an forbidden error
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to delete the note");
    }
    try {
      // If everything checks out, remove the note
      //await models.Note.findOneAndRemove({ _id: id});
      await note.remove();
      return true;
    } catch (err) {
      // If there's an error along the way, return false
      return false;
    }
  },
  updateNote: async (parent, { content, id }, { models, user }) => {
    // If not a user, throw an Authentication Error
    if (!user) {
      throw new AuthenticationError("You must be signed in to update a note!");
    }

    // Find the note
    const note = await models.Note.findById(id);
    // If the note owner and current user don't match, throw an forbidden error
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permissions to update the note");
    }
    // Update the note in the db and return the updated note.
    return await models.Note.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      }
    );
  },
  signUp: async (parent, { username, email, password }, { models }) => {
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
        password: hashed,
      });

      // Create and return the JWT
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);

      // if there's a problem creating the account, throw an error
      throw new Error("Error creating account!");
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      // Normalize email address
      email = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({
      $or: [{ email }, { username }],
    });

    // If no user is found, throw an authentication error
    if (!user) {
      throw new AuthenticationError("Error signing in!");
    }

    // If the password don't match, throw an authentication error
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError("Error signing in!");
    }

    // Create and return the JWT
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
  toggleFavorite: async (parent, { id }, { models, user }) => {
    // If no user context is passed, throw authentication error
    if (!user) {
      throw new AuthenticationError();
    }
    //  Check to see if the user has already favorited the note
    let noteCheck = await models.Note.findById(id);
    const hasUser = noteCheck.favoritedBy.indexOf(user.id);

    /**
     * If the user exists in the list
     * pull them from the list and reduce the favorite count by 1
     */
    if (hasUser >= 0) {
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: -1,
          },
        },
        {
          // Set new to true to return the updated document
          new: true,
        }
      );
    } else {
      /**
       * If the user doesn't exist in the list
       * add them to the list and increment the favorite count by 1
       */
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: 1,
          },
        },
        {
          new: true,
        }
      );
    }
  },
};
