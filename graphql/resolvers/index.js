const boardsResolver = require('./boards');
const cardsResolver = require('./cards');

const rootResolver = {
    ...boardsResolver,
    ...cardsResolver
}

module.exports = rootResolver;