const { AuthenticationError } = require('@apollo/server');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUserPreferences: async (_, userId, favoriteGenre) => {
      let userPreferences = await UserPreferences.findOne({ userId });

      if(!userPreferences) {
          userPreferences = new UserPreferences({ userId, favoriteGenre });
      } else {
          userPreferences.favoriteGenre = favoriteGenre;
      }

      await userPreferences.save();
      return userPreferences;
    },

    saveBook: async (parent, { userId, book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { books: book } }, // need to add it to the "want to read list"
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('Not authenticated');
    },

    addToRead: async (parent, { userId, book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { books: book } }, // need this to add to "Already read" list
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('Not authenticated');
    },

    removeBook: async (parent, { book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { books: book } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not authenticated');
    },

  }
};

module.exports = resolvers;
