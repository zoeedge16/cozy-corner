const { AuthenticationError } = require('@apollo/server');
const { User, UserPreferences, ReadingPreferences } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => User.find(),
    user: async (_, { id }) => User.findOne({ _id: id }),
    me: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    userPreferences: async (_, { userId }) => UserPreferences.find({ userId }),
    readingPreferences: async (_, { userId }) => ReadingPreferences.find({ userId })
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
    addUserPreferences: async (_, { userId, favoriteGenre }) => {
      let userPreferences = await UserPreferences.findOne({ userId });

      if (!userPreferences) {
        userPreferences = new UserPreferences({ userId, favoriteGenre });
      } else {
        userPreferences.favoriteGenre = favoriteGenre;
      }

      await userPreferences.save();
      return userPreferences;
    },

    saveBook: async (_, { userId, book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('Not authenticated');
    },

    addToRead: async (_, { userId, book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedBooks: book }, $addToSet: { readBooks: book } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('Not authenticated');
    },

    createPost: async (_, { content }, context) => {
      if (context.user) {
        const { userId } = context;
        const time = new Date().toISOString();
        const newPost = { id: userId, content, time };
        return newPost;
      }
      throw new AuthenticationError('Not authenticated');
    }, 

    removeBook: async (_, { book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: book } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not authenticated');
    }
  }
};

module.exports = resolvers;
