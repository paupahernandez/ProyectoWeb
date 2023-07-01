module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Boards', [
    {
      id: 1,
      playerId: 1,
      gameId:1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      playerId: 2,
      gameId:1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Boards', null, {}),
};
