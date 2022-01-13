const { buildSchema } = require("graphql");

module.exports = buildSchema(`
	type Board {
		_id: ID!
		name: String!
		backlog: [Card]!
		todo: [Card]!
		inProgress: [Card]!
		done: [Card]!
	}
	type Card {
		_id: ID!
		title: String!
		description: String!
		type: String!
		color: String!
		board: String
	}
	input BoardInput {
		name: String!
	}
	input CardInput {
		title: String!
		description: String!
		type: String!
		color: String!
		board: String
	}
	type RootQuery {
		boards: [Board!]!
		board(id: ID!): Board!
		cards(boardId: ID!): [Card!]!
	}
	type RootMutation {
		createBoard(boardInput: BoardInput): Board
		createCard(cardInput: CardInput): Card
		updateCard(cardId: ID!, boardId: ID!, type: String, color: String): Card
	}
	schema {
		query: RootQuery
		mutation: RootMutation
	}
`);
