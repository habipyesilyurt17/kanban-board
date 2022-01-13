const Card = require("../../models/card");
const Board = require("../../models/board");

module.exports = {
  cards: async (args, req) => {
    try {
      const cards = await Card.find({board: args.boardId});
      return cards.map((card) => {
        return { ...card._doc };
      });
    } catch (error) {
      throw error;
    }
  },
  createCard: async (args, req) => {
    const card = new Card({
      title: args.cardInput.title,
      description: args.cardInput.description,
      type: args.cardInput.type,
      color: args.cardInput.color,
      board: args.cardInput.board,
    });
    try {
      const result = await card.save();
      const prop = card.type;
      await Board.updateOne({ _id: card.board }, { $push: { [prop]: card } });
      return { ...result._doc };
    } catch (error) {
      throw error;
    }
  },
  updateCard: async (args, req) => {
    try {
      const card = await Card.findByIdAndUpdate(
        args.cardId,
        { type: args.type, color: args.color },
        { new: true }
      );

      let type = args.type;
      let whichBoardListt = "";
      switch (type) {
        case "backlog":
          whichBoardListt = "backlog";
          break;
        case "todo":
          whichBoardListt = "todo";
          break;
        case "inProgress":
          whichBoardListt = "inProgress";
          break;
        case "done":
          whichBoardListt = "done";
          break;
        default:
          break;
      }
      let cardsArray = await Board.findById(args.boardId);
      let cardIndex = cardsArray[`${whichBoardListt}`].findIndex(
        (element) => element._id.toString() === args.cardId
      );

      let filter1 = `${whichBoardListt}._id`;
      let filter2 = `${whichBoardListt}.${cardIndex}.color`;

      await Board.findByIdAndUpdate(
        { _id: args.boardId, [filter1]: args.cardId },
        { [filter2]: args.color },
        { new: true }
      );

      if (!card) {
        throw new Error(`Couldn\’t find card with id ${args.cardId}`);
      }
      return { ...card._doc };
    } catch (error) {
      throw error;
    }
  },
};
