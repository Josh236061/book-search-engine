const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  Query: {
    me: (parent, args, context, info) => {
      if (!context.user) {
        return null
      }
      return context.user
    }
  },
  Mutation: {
    async signup (parent, args, context, info) {
      const user = await User.create(args);

      if (!user) {
        throw new Error('Something is wrong!');
      }

      const token = signToken(user);

      return {
        token,
        user,
      };
    },
    
    async login(parent, args, context, info){
      const user = await User.findOne({ email: args.email});
      if (!user) {
        throw new Error("Can't find this user");
      }
      console.log(args)
      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new Error('Wrong password!');
      }

      const token = signToken(user);

      return {
        token,
        user,
      }
    },

    async saveBook(parent, args, context, info) {
      const user = context.user;

      user.savedBooks.push(args);

      await user.save();

      return user
    },

    async removeBook(parent, args, context, info) {
      const user = context.user;
      console.log(args.bookId)

      user.savedBooks = user.savedBooks.filter((book) => book.bookId !== args.bookId);

      await user.save();

      return user;
    }
  },
}