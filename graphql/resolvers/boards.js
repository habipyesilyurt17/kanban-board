const Board = require("../../models/board");

module.exports = {
  boards: async () => {
    try {
      const boards = await Board.find();
      return boards.map((board) => {
        return { ...board._doc };
      });
    } catch (error) {
      throw error;
    }
  },
  board: async (args, req) => {
    try {
      const board = await Board.findById(args.id);
      return { ...board._doc };
    } catch (error) {
      throw error;
    }
  },
  createBoard: async (args, req) => {
    const board = new Board({
      name: args.boardInput.name,
      backlog: [],
      todo: [],
      inProgress: [],
      done: [],
    });
    try {
      const result = await board.save();
      return { ...result._doc };
    } catch (error) {
      throw error;
    }
  },
};
