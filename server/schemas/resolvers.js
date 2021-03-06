const { AuthenticationError } = require('apollo-server-express');
const { User, Movies } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('movies');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('movies');
    },
    movies: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Movies.find(params);
    },
    movie: async (parent, { titleId }) => {
      return Movies.findOne({ _id: titleId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('movies');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
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
    // TODO **********************************
    addMovie: async (parent, { movieData }, context) => {
      if (context.user) {
        let updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { newMovie: movieData } },
          {new: true}
        );

        return updateUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeMovie: async (parent, { movieId }, context) => {
      if (context.user) {
        const movie = await Movies.findOneAndDelete({
          _id: movieId,
          director: context.user.username,// dont think we need this 
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { movie: movie._id } }
        );

        return movie;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
